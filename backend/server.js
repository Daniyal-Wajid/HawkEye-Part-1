// server.js
import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import multer from "multer";
import dotenv from "dotenv";
import axios from "axios";
import fs from "fs";
import path from "path";
import ffmpeg from "fluent-ffmpeg";
import ffmpegPath from "ffmpeg-static";
import FormData from "form-data";
import jwt from "jsonwebtoken";

import Student from "./models/Student.js";
import User from "./models/User.js";
import bcrypt from "bcryptjs";

dotenv.config();

const app = express();
app.use(cors());
// Increase JSON body parser limit to handle large image data (base64 encoded images can be large)
app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ limit: "10mb", extended: true }));

const PROCESS_ID = Math.random().toString(36).substring(7).toUpperCase();
console.log(`[System] Initializing HawkEye Server (Process ID: ${PROCESS_ID})`);

// Global Request Logger for diagnostics
app.use((req, res, next) => {
  if (req.path === "/api/recognition/live") {
    console.log(`[Incoming] ${req.method} ${req.path} (${(req.headers['content-length'] / 1024).toFixed(1)} KB)`);
  } else {
    console.log(`[Incoming] ${req.method} ${req.path}`);
  }
  next();
});

// Test Endpoint with Process ID verification
app.get("/api/test", (req, res) => {
  res.json({
    message: "HawkEye Server is active",
    processId: PROCESS_ID,
    version: "1.2.0",
    time: new Date().toISOString()
  });
});

// Simple Health Check for Recognition
app.get("/api/recognition/health", (req, res) => {
  res.json({ status: "ok", endpoint: "/api/recognition/live", ready: true });
});

/* -------------------- FFmpeg Setup -------------------- */
ffmpeg.setFfmpegPath(ffmpegPath);

/* -------------------- Ensure folders exist -------------------- */
["uploads", "frames"].forEach((dir) => {
  if (!fs.existsSync(dir)) fs.mkdirSync(dir);
});

/* -------------------- MongoDB Connection -------------------- */
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.error("Mongo error:", err));

/* -------------------- Multer Setup -------------------- */
const storage = multer.diskStorage({
  destination: "uploads/",
  filename: (req, file, cb) => {
    cb(null, Date.now() + ".webm");
  },
});

const upload = multer({ storage });

/* -------------------- Convert video to mp4 -------------------- */
function convertToMp4(inputPath) {
  return new Promise((resolve, reject) => {
    // Generate output path by replacing extension with .mp4
    const ext = path.extname(inputPath);
    const outputPath = inputPath.replace(ext, ".mp4");

    console.log(`Converting video: ${inputPath} → ${outputPath}`);

    ffmpeg(inputPath)
      .videoCodec("libx264")
      .audioCodec("aac")
      .output(outputPath)
      .on("start", (commandLine) => {
        console.log(`FFmpeg command: ${commandLine}`);
      })
      .on("progress", (progress) => {
        if (progress.percent) {
          console.log(`Conversion progress: ${Math.round(progress.percent)}%`);
        }
      })
      .on("end", () => {
        console.log(`✅ Video converted successfully: ${outputPath}`);
        resolve(outputPath);
      })
      .on("error", (err) => {
        console.error(`❌ Video conversion error:`, err.message);
        reject(err);
      })
      .run();
  });
}

/* -------------------- Extract ~65 Frames -------------------- */
function extractFrames(videoPath, studentId, targetFrames = 65) {
  return new Promise((resolve, reject) => {
    const framesDir = path.resolve("frames", studentId);
    fs.mkdirSync(framesDir, { recursive: true });

    // ~10s video → 6–7 fps = ~65 frames
    const fps = targetFrames / 10;

    ffmpeg(videoPath)
      .outputOptions(["-vf", `fps=${fps}`])
      .output(path.join(framesDir, "%03d.jpg"))
      .on("end", () => {
        console.log(`✅ Extracted frames for ${studentId}`);
        resolve(framesDir);
      })
      .on("error", reject)
      .run();
  });
}

/* -------------------- Authentication Middleware -------------------- */
const authenticate = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader) {
      return res.status(401).json({ error: "No authorization header" });
    }

    const token = authHeader.split(" ")[1];
    if (!token) {
      return res.status(401).json({ error: "No token provided" });
    }

    // Verify JWT token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    if (!decoded) {
      return res.status(401).json({ error: "Invalid token" });
    }

    const user = await User.findById(decoded.id).populate("studentId");
    if (!user) {
      return res.status(401).json({ error: "User not found" });
    }

    req.user = user;
    next();
  } catch (err) {
    console.error("Authentication error:", err);
    // Handle specific JWT errors
    if (err.name === "TokenExpiredError") {
      return res.status(401).json({ error: "Token expired" });
    }
    if (err.name === "JsonWebTokenError") {
      return res.status(401).json({ error: "Invalid token" });
    }
    return res
      .status(401)
      .json({ error: "Authentication failed", details: err.message });
  }
};

/* -------------------- Login -------------------- */
app.post("/api/auth/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email }).populate("studentId");
    if (!user || !(await bcrypt.compare(password, user.password))) {
      return res.status(401).json({ error: "Invalid credentials" });
    }
    const userObj = user.toObject();
    delete userObj.password;

    // Generate JWT token
    const token = jwt.sign(
      { id: user._id, email: user.email, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: "7d" },
    );

    res.json({ user: userObj, token });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

/* -------------------- Student Routes -------------------- */
app.get("/api/students", authenticate, async (req, res) => {
  try {
    if (req.user.role !== "admin") {
      return res.status(403).json({ error: "Access denied" });
    }
    const students = await Student.find();
    res.json(students);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.get("/api/students/profile", authenticate, async (req, res) => {
  try {
    if (req.user.role !== "student") {
      return res.status(403).json({ error: "Access denied" });
    }
    const student = await Student.findById(req.user.studentId);
    if (!student) {
      return res.status(404).json({ error: "Student profile not found" });
    }
    res.json({ user: req.user, student });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

/* -------------------- Register Student (Self-registration only, no auth required) -------------------- */
app.post("/api/students/register", upload.single("video"), async (req, res) => {
  try {
    const { name, rollNumber, email, password, confirmPassword } = req.body;

    if (!name || !rollNumber || !email || !password || !confirmPassword) {
      return res.status(400).json({ error: "All fields required" });
    }

    if (password !== confirmPassword) {
      return res.status(400).json({ error: "Passwords do not match" });
    }

    if (password.length < 6) {
      return res
        .status(400)
        .json({ error: "Password must be at least 6 characters" });
    }

    if (!req.file) {
      return res.status(400).json({ error: "Video is required" });
    }

    // Check if student already exists
    const existingStudent = await Student.findOne({ email });
    if (existingStudent) {
      // Clean up uploaded file
      if (fs.existsSync(req.file.path)) {
        fs.unlinkSync(req.file.path);
      }
      return res
        .status(400)
        .json({ error: "Student with this email already registered" });
    }

    // Check if roll number already exists
    const existingRollNumber = await Student.findOne({ rollNumber });
    if (existingRollNumber) {
      // Clean up uploaded file
      if (fs.existsSync(req.file.path)) {
        fs.unlinkSync(req.file.path);
      }
      return res
        .status(400)
        .json({ error: "Student with this roll number already exists" });
    }

    // Check if user account already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      // Clean up uploaded file
      if (fs.existsSync(req.file.path)) {
        fs.unlinkSync(req.file.path);
      }
      return res.status(400).json({ error: "User account already exists" });
    }

    let mp4Path;
    const originalExt = path.extname(req.file.originalname).toLowerCase();
    const uploadedPath = req.file.path;
    const uploadedExt = path.extname(uploadedPath).toLowerCase();

    // 1️⃣ Convert video to mp4 if needed (handles .webm, .mp4, .mov, .avi, etc.)
    if (uploadedExt === ".mp4" && originalExt === ".mp4") {
      // Already mp4, use as-is
      mp4Path = uploadedPath;
      console.log(`✅ Video is already MP4 format: ${mp4Path}`);
    } else {
      // Convert to mp4 using ffmpeg (handles any video format)
      console.log(`🔄 Converting video from ${uploadedExt} to .mp4...`);
      mp4Path = await convertToMp4(uploadedPath);
      // Clean up original file after conversion
      if (uploadedPath !== mp4Path && fs.existsSync(uploadedPath)) {
        try {
          fs.unlinkSync(uploadedPath);
          console.log(`🗑️ Removed original file: ${uploadedPath}`);
        } catch (cleanupErr) {
          console.warn(
            `⚠️ Could not remove original file: ${cleanupErr.message}`,
          );
        }
      }
    }

    // 2️⃣ Save student
    const student = await Student.create({
      name,
      rollNumber,
      email,
      videoPath: mp4Path,
    });

    // 3️⃣ Create user account for student
    const hashedPassword = await bcrypt.hash(password, 10);
    await User.create({
      email,
      password: hashedPassword,
      role: "student",
      name,
      studentId: student._id,
    });

    // 4️⃣ Extract frames (approximately 65 frames from 10-second video)
    const framesDir = await extractFrames(mp4Path, student._id.toString());

    // 5️⃣ Send ABSOLUTE path to AI server for training
    // Training can take a long time (processing 65 frames with YOLOv8-face + ArcFace)
    // Set timeout to 5 minutes (300000ms) - training is async, so this won't block the response
    axios
      .post(
        "http://127.0.0.1:8000/train",
        {
          studentId: student._id.toString(),
          framesDir: framesDir,
        },
        {
          timeout: 300000, // 5 minutes timeout for training (YOLOv8-face + ArcFace can be slow)
        },
      )
      .then(() => {
        console.log(
          `✅ AI training completed for student: ${student.name} (${student._id})`,
        );
      })
      .catch((err) => {
        if (err.code === "ECONNABORTED" || err.message.includes("timeout")) {
          console.error(
            `⚠️ AI training timed out for student ${student._id} - training may still be in progress`,
          );
        } else {
          console.error(
            `⚠️ AI training failed for student ${student._id}:`,
            err.message,
          );
        }
      });

    res.status(201).json({
      message: "Student registered successfully. AI training started.",
      student: {
        _id: student._id,
        name: student.name,
        rollNumber: student.rollNumber,
        email: student.email,
      },
    });
  } catch (err) {
    console.error("Student registration error:", err);

    // Clean up uploaded file on error
    if (req.file && fs.existsSync(req.file.path)) {
      try {
        fs.unlinkSync(req.file.path);
      } catch (cleanupErr) {
        console.error("Error cleaning up file:", cleanupErr);
      }
    }

    res
      .status(500)
      .json({ error: err.message || "Failed to register student" });
  }
});


/* -------------------- Recognition -------------------- */

/* -------------------- Recognition -------------------- */
app.post("/api/recognition/live", authenticate, async (req, res) => {
  const { imageBase64 } = req.body;
  if (!imageBase64) {
    console.log("[Backend] ⚠ Received recognize-live request with no image data");
    return res.status(400).json({ error: "Image required" });
  }

  console.log(`[Backend] 📡 Processing live recognition request (Image Size: ${Math.round(imageBase64.length / 1024)} KB)`);

  try {
    // base64 → buffer
    const buffer = Buffer.from(
      imageBase64.replace(/^data:image\/\w+;base64,/, ""),
      "base64",
    );

    const formData = new FormData();
    formData.append("frame", buffer, {
      filename: "frame.jpg",
      contentType: "image/jpeg",
    });

    // Send to Flask AI
    console.log("[Backend] 🤖 Calling AI Server...");
    const aiRes = await axios.post(
      "http://127.0.0.1:8000/recognize-live",
      formData,
      {
        headers: formData.getHeaders(),
        timeout: 5000, // Reduced from 30s to be more responsive for live view
      },
    );

    console.log(`[Backend] ✅ AI Server responded with ${aiRes.data.count || 0} detections`);

    const aiResults = aiRes.data.results || [];
    const processedRecognitions = [];
    const allDetectedFaces = [];

    for (const resItem of aiResults) {
      const { student_id, confidence, bbox, recognized } = resItem;
      const faceBox = { x: bbox[0], y: bbox[1], w: bbox[2], h: bbox[3] };

      allDetectedFaces.push(faceBox);

      if (recognized && student_id) {
        try {
          const student = await Student.findById(student_id);
          if (student) {
            processedRecognitions.push({
              student,
              confidence,
              faceBox,
              recognized: true,
            });
            console.log(
              `✓ Batch Recognized: ${student.name} (${student_id}) at ${(confidence * 100).toFixed(1)}%`,
            );
          } else {
            console.warn(`[Backend] ⚠ AI recognized ID ${student_id} but Student not found in DB`);
          }
        } catch (dbErr) {
          console.error(`Error fetching student ${student_id}:`, dbErr.message);
        }
      }
    }

    res.json({
      recognized: processedRecognitions.length > 0,
      recognitions: processedRecognitions,
      faces: allDetectedFaces,
      count: aiResults.length,
    });
  } catch (err) {
    console.error("Recognition error:", err.message);
    if (err.code === "ECONNREFUSED") {
      return res.status(500).json({
        error: "AI server not running.",
        recognized: false,
        faces: [],
        errorType: "connection_refused",
      });
    }

    if (err.code === "ECONNABORTED" || err.message.includes("timeout")) {
      return res.status(504).json({
        error: "Recognition timeout",
        recognized: false,
        faces: [],
        errorType: "timeout",
      });
    }

    res.status(500).json({
      error: "Recognition failed",
      recognized: false,
      faces: [],
    });
  }
});

app.post("/api/recognition/single", authenticate, async (req, res) => {
  try {
    const { imageBase64 } = req.body;
    if (!imageBase64) return res.status(400).json({ error: "Image required" });

    const buffer = Buffer.from(imageBase64.replace(/^data:image\/\w+;base64,/, ""), "base64");
    const formData = new FormData();
    formData.append("frame", buffer, { filename: "frame.jpg", contentType: "image/jpeg" });

    const aiRes = await axios.post("http://127.0.0.1:8000/recognize-live", formData, {
      headers: formData.getHeaders(),
      timeout: 30000,
    });

    const results = aiRes.data.results || [];
    if (results.length === 0) return res.json({ recognized: false, faces: [] });

    const bestRec = results
      .filter((r) => r.recognized)
      .sort((a, b) => (b.confidence || 0) - (a.confidence || 0))[0];

    if (bestRec) {
      const student = await Student.findById(bestRec.student_id);
      return res.json({
        recognized: true,
        student: student || { _id: bestRec.student_id, name: "Unknown" },
        confidence: bestRec.confidence,
        faceBox: { x: bestRec.bbox[0], y: bestRec.bbox[1], w: bestRec.bbox[2], h: bestRec.bbox[3] },
        faces: results.map((r) => ({ x: r.bbox[0], y: r.bbox[1], w: r.bbox[2], h: r.bbox[3] })),
      });
    }

    res.json({
      recognized: false,
      faces: results.map((r) => ({ x: r.bbox[0], y: r.bbox[1], w: r.bbox[2], h: r.bbox[3] })),
    });
  } catch (err) {
    res.status(500).json({ error: "Recognition failed", details: err.message });
  }
});

/* -------------------- Error Handling Middleware -------------------- */
// Catch-all error handler - always return JSON
app.use((err, req, res, next) => {
  console.error("Unhandled error:", err);
  res.status(err.status || 500).json({
    error: err.message || "Internal server error",
    details: process.env.NODE_ENV === "development" ? err.stack : undefined,
  });
});

// 404 handler - always return JSON
app.use((req, res) => {
  res.status(404).json({ error: `Route not found: ${req.method} ${req.path}` });
});

/* -------------------- Server -------------------- */
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`✅ Server running on port ${PORT}`);
  console.log(`📋 Available routes:`);
  console.log(`   POST /api/auth/login`);
  console.log(`   POST /api/students/register (Image registration)`);
  console.log(`   POST /api/recognition/live`);
  console.log(`   POST /api/recognition/single`);
});
