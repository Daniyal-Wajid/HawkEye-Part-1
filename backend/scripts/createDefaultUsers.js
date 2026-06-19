// scripts/createDefaultUsers.js
<<<<<<< HEAD
// Run once to create default admin and discipline incharge users (Supabase)
// From backend folder: node scripts/createDefaultUsers.js

import bcrypt from "bcryptjs";
import dotenv from "dotenv";
import { createClient } from "@supabase/supabase-js";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
dotenv.config({ path: path.join(__dirname, "..", ".env") });

const supabase = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_SERVICE_ROLE_KEY);

async function createDefaultUsers() {
  try {
    console.log("Using Supabase:", process.env.SUPABASE_URL ? "configured" : "missing env");

    const defaults = [
      { email: "admin@school.com", password: "admin123", role: "admin", name: "Admin User" },
      { email: "discipline@school.com", password: "incharge123", role: "discipline_incharge", name: "Discipline Incharge" },
    ];

    for (const u of defaults) {
      const { data: existing } = await supabase.from("users").select("id").eq("email", u.email).maybeSingle();
      if (existing) {
        console.log(`ℹ️  ${u.email} already exists`);
        continue;
      }
      const hashed = await bcrypt.hash(u.password, 10);
      const { error } = await supabase.from("users").insert({
        email: u.email,
        password: hashed,
        role: u.role,
        name: u.name,
      });
      if (error) throw error;
      console.log(`✅ Created: ${u.email} / ${u.password}`);
=======
// Run this script once to create default admin and teacher users
// node scripts/createDefaultUsers.js

import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import dotenv from "dotenv";
import User from "../models/User.js";

dotenv.config();

async function createDefaultUsers() {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("Connected to MongoDB");

    // Create default admin
    const adminEmail = "admin@school.com";
    const adminExists = await User.findOne({ email: adminEmail });
    if (!adminExists) {
      const adminPassword = await bcrypt.hash("admin123", 10);
      await User.create({
        email: adminEmail,
        password: adminPassword,
        role: "admin",
        name: "Admin User",
      });
      console.log("✅ Admin user created:");
      console.log("   Email: admin@school.com");
      console.log("   Password: admin123");
    } else {
      console.log("ℹ️  Admin user already exists");
    }

    // Create default teacher
    const teacherEmail = "teacher@school.com";
    const teacherExists = await User.findOne({ email: teacherEmail });
    if (!teacherExists) {
      const teacherPassword = await bcrypt.hash("teacher123", 10);
      await User.create({
        email: teacherEmail,
        password: teacherPassword,
        role: "teacher",
        name: "Teacher User",
      });
      console.log("✅ Teacher user created:");
      console.log("   Email: teacher@school.com");
      console.log("   Password: teacher123");
    } else {
      console.log("ℹ️  Teacher user already exists");
>>>>>>> a044002ed30c4560c21643524cf71c40799ff22b
    }

    console.log("\n✅ Default users setup complete!");
    process.exit(0);
  } catch (err) {
    console.error("Error:", err);
    process.exit(1);
  }
}

createDefaultUsers();

