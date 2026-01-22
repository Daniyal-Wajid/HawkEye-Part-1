import { useState, useRef, useEffect } from "react";
import { Camera, X, Shield, Activity, RefreshCw } from "lucide-react";

export default function LiveRecognitionPanel({ onClose }) {
    const videoRef = useRef(null);
    const imgRef = useRef(null); // For IP Cam
    const canvasRef = useRef(null);

    const [sourceType, setSourceType] = useState('webcam'); // 'webcam' | 'ip'
    const [ipUrl, setIpUrl] = useState("http://192.168.1.5:8080/video"); // Default placeholder
    const [isActive, setIsActive] = useState(false);

    const [isSyncing, setIsSyncing] = useState(false);
    const [recognitions, setRecognitions] = useState([]);
    const [faces, setFaces] = useState([]);
    const [error, setError] = useState("");
    const [stats, setStats] = useState({ count: 0, lastCheck: null });

    const streamRef = useRef(null);
    const intervalRef = useRef(null);

    useEffect(() => {
        // Auto-start webcam if selected
        if (sourceType === 'webcam') {
            startCamera();
        }
        verifyBackend();
        return () => {
            stopRecognition();
            stopCamera();
        };
    }, []);

    // Stop camera when switching modes
    useEffect(() => {
        stopRecognition();
        stopCamera();
        setIsActive(false);
        setError("");

        // Slight delay to allow DOM to update refs
        if (sourceType === 'webcam') {
            setTimeout(startCamera, 100);
        }
    }, [sourceType]);

    const verifyBackend = async () => {
        try {
            const res = await fetch("http://localhost:5000/api/test");
            const data = await res.json();
            console.log(`[System] Connected to Backend Process: ${data.processId}`);
        } catch (err) {
            console.error("[System] Could not verify backend connection.");
        }
    };

    const startCamera = async () => {
        if (sourceType === 'ip') {
            if (!ipUrl) {
                setError("Please enter a valid IP URL");
                return;
            }
            setIsActive(true);
            return;
        }

        try {
            const stream = await navigator.mediaDevices.getUserMedia({
                video: { width: 1280, height: 720 },
                audio: false
            });
            if (videoRef.current) {
                videoRef.current.srcObject = stream;
            }
            streamRef.current = stream;
            setIsActive(true);
            console.log("[Camera] Streaming active");
        } catch (err) {
            console.error("[Camera] Access failed:", err);
            setError("Webcam access denied. Please check permissions.");
        }
    };

    const stopCamera = () => {
        if (streamRef.current) {
            streamRef.current.getTracks().forEach(track => track.stop());
            streamRef.current = null;
        }
        if (videoRef.current) {
            videoRef.current.srcObject = null;
        }
        // For IP cam, just setting isActive false hides the img
    };

    const startRecognition = () => {
        if (intervalRef.current) return;
        setIsSyncing(true);
        console.log("[Detection] Initializing AI Analysis loop...");

        intervalRef.current = setInterval(async () => {
            // Determine source
            let source = null;
            let width = 0;
            let height = 0;

            if (sourceType === 'webcam' && videoRef.current) {
                source = videoRef.current;
                width = source.videoWidth;
                height = source.videoHeight;
            } else if (sourceType === 'ip' && imgRef.current) {
                source = imgRef.current;
                width = source.naturalWidth;
                height = source.naturalHeight;
            }

            if (!source || !isActive || width === 0 || height === 0) {
                // console.debug("Waiting for source dimensions...");
                return;
            }

            const canvas = document.createElement("canvas");
            canvas.width = width;
            canvas.height = height;
            const ctx = canvas.getContext("2d");
            ctx.drawImage(source, 0, 0, width, height);

            const base64Image = canvas.toDataURL("image/jpeg", 0.7);

            try {
                const token = localStorage.getItem("token");
                const res = await fetch("http://localhost:5000/api/recognition/live", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        "Authorization": `Bearer ${token}`
                    },
                    body: JSON.stringify({ imageBase64: base64Image })
                });

                const data = await res.json();
                if (res.ok) {
                    if (data.count > 0) {
                        console.log(`[Detection] Found ${data.count} faces, ${data.recognitions?.length || 0} recognized`, data.faces);
                    }
                    setRecognitions(data.recognitions || []);
                    setFaces(data.faces || []);
                    setStats({
                        count: data.count || 0,
                        lastCheck: new Date().toLocaleTimeString()
                    });
                }
            } catch (err) {
                console.error("[Detection] Sync failed:", err);
            }
        }, 1000);
    };

    const stopRecognition = () => {
        if (intervalRef.current) {
            clearInterval(intervalRef.current);
            intervalRef.current = null;
        }
        setIsSyncing(false);
        setRecognitions([]);
        setFaces([]);
        console.log("[Detection] AI Analysis loop stopped.");
    };

    // Draw bounding boxes on the overlay canvas
    useEffect(() => {
        const isWebcam = sourceType === 'webcam' && videoRef.current;
        const isIp = sourceType === 'ip' && imgRef.current;

        if ((!isWebcam && !isIp) || !canvasRef.current) return;

        const source = isWebcam ? videoRef.current : imgRef.current;
        const ctx = canvasRef.current.getContext("2d");

        const render = () => {
            if (!ctx || !source) return;

            // Dimensions logic
            const srcW = isWebcam ? source.videoWidth : source.naturalWidth;
            const srcH = isWebcam ? source.videoHeight : source.naturalHeight;
            const clientW = source.clientWidth;
            const clientH = source.clientHeight;

            if (srcW === 0 || srcH === 0) {
                requestAnimationFrame(render);
                return;
            }

            // Update canvas size to match displayed video
            canvasRef.current.width = clientW;
            canvasRef.current.height = clientH;

            ctx.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);

            const scaleX = clientW / srcW;
            const scaleY = clientH / srcH;

            // Draw all detected faces (dashed boxes for potential strangers)
            ctx.setLineDash([5, 5]);
            ctx.lineWidth = 2;

            faces.forEach(face => {
                // Find if this face is recognized
                const isRecognized = recognitions.some(r =>
                    Math.abs(r.faceBox.x - face.x) < 10 &&
                    Math.abs(r.faceBox.y - face.y) < 10
                );

                if (!isRecognized) {
                    const isValid = face.w > 0 && face.h > 0;
                    if (isValid) {
                        ctx.strokeStyle = "#94a3b8"; // slate-400
                        ctx.strokeRect(face.x * scaleX, face.y * scaleY, face.w * scaleX, face.h * scaleY);

                        // Small "Unknown" tag
                        ctx.fillStyle = "#475569"; // slate-600
                        ctx.font = "bold 9px Inter, sans-serif";
                        ctx.fillText("UNKNOWN", (face.x * scaleX) + 4, (face.y * scaleY) + 12);
                    }
                }
            });

            // Debug overlay count
            if (faces.length > 0 || recognitions.length > 0) {
                // console.debug(`[Render] Drawing ${faces.length} faces, ${recognitions.length} recognized`);
            }

            // Draw recognized students (solid blue boxes with premium labels)
            ctx.setLineDash([]);
            ctx.lineWidth = 3;
            recognitions.forEach(rec => {
                const box = rec.faceBox;
                const color = "#3b82f6"; // blue-500

                ctx.strokeStyle = color;
                ctx.strokeRect(box.x * scaleX, box.y * scaleY, box.w * scaleX, box.h * scaleY);

                // Premium Label Design
                const text = rec.student.name.toUpperCase();
                const confText = `${Math.round(rec.confidence * 100)}% MATCH`;

                ctx.font = "bold 11px Inter, sans-serif";
                const textWidth = ctx.measureText(text).width;
                const panelWidth = Math.max(textWidth, 80) + 10;

                // Label Background
                ctx.fillStyle = color;
                ctx.fillRect(box.x * scaleX, (box.y * scaleY) - 35, panelWidth, 35);

                // Label Text (Name)
                ctx.fillStyle = "white";
                ctx.fillText(text, (box.x * scaleX) + 6, (box.y * scaleY) - 20);

                // Label Text (Confidence)
                ctx.fillStyle = "rgba(255,255,255,0.7)";
                ctx.font = "bold 9px Inter, sans-serif";
                ctx.fillText(confText, (box.x * scaleX) + 6, (box.y * scaleY) - 8);
            });

            requestAnimationFrame(render);
        };

        const animId = requestAnimationFrame(render);
        return () => cancelAnimationFrame(animId);
    }, [recognitions, faces]);

    return (
        <div className="bg-slate-900 rounded-[2.5rem] overflow-hidden shadow-2xl border border-white/10 flex flex-col md:flex-row h-full min-h-[500px]">
            {/* Video Stream Area */}
            <div className="flex-1 relative bg-black min-h-[300px] flex items-center justify-center">
                {sourceType === 'webcam' ? (
                    <video
                        ref={videoRef}
                        autoPlay
                        muted
                        playsInline
                        className="w-full h-full object-cover opacity-80"
                    />
                ) : (
                    <img
                        ref={imgRef}
                        src={isActive ? ipUrl : ""}
                        crossOrigin="anonymous"
                        alt="IP Feed"
                        className="w-full h-full object-contain opacity-80"
                        onError={() => {
                            if (isActive) setError("Failed to load IP Camera stream. Check URL.");
                        }}
                    />
                )}

                <canvas
                    ref={canvasRef}
                    className="absolute inset-0 pointer-events-none w-full h-full"
                />

                {!isActive && !error && (
                    <div className="absolute inset-0 flex flex-col items-center justify-center text-slate-500">
                        <Camera size={48} className="mb-4 opacity-50" />
                        <p>Camera Off</p>
                    </div>
                )}

                {error && (
                    <div className="absolute inset-0 flex items-center justify-center p-8 text-center bg-slate-900/90 z-20">
                        <p className="text-red-400 font-bold">{error}</p>
                    </div>
                )}

                {/* Live Indicator */}
                <div className="absolute top-6 left-6 flex items-center gap-2 bg-black/40 backdrop-blur-md px-3 py-1.5 rounded-full border border-white/20 z-10">
                    <div className={`w-2 h-2 rounded-full ${isSyncing ? 'bg-red-500 animate-pulse' : 'bg-slate-500'}`} />
                    <span className="text-[10px] uppercase font-black tracking-widest text-white">
                        {isSyncing ? 'Live Analysis' : 'Standby'}
                    </span>
                    <span className="text-[10px] uppercase font-bold text-slate-400 border-l border-white/20 pl-2 ml-1">
                        {sourceType === 'webcam' ? 'WEBCAM' : 'IP CAM'}
                    </span>
                </div>
            </div>

            {/* Control Panel */}
            <div className="w-full md:w-80 p-8 flex flex-col justify-between bg-slate-900 border-l border-white/10">
                <div className="space-y-8">
                    <div className="flex justify-between items-start">
                        <div>
                            <h2 className="text-2xl font-black text-white italic tracking-tighter">Hawk<span className="text-blue-500">Eye</span></h2>
                            <p className="text-slate-400 text-sm font-semibold mt-1">Real-time Recognition</p>
                        </div>
                        <button onClick={onClose} className="p-2 hover:bg-white/10 rounded-xl transition-colors text-slate-400">
                            <X size={20} />
                        </button>
                    </div>

                    <div className="space-y-4">
                        {/* Source Switcher */}
                        <div className="flex bg-slate-800 p-1 rounded-xl">
                            <button
                                onClick={() => setSourceType('webcam')}
                                className={`flex-1 flex items-center justify-center gap-2 py-2.5 rounded-lg text-sm font-bold transition-all ${sourceType === 'webcam' ? 'bg-blue-600 text-white shadow-lg' : 'text-slate-400 hover:text-white'}`}
                            >
                                <Camera size={16} />
                                Webcam
                            </button>
                            <button
                                onClick={() => setSourceType('ip')}
                                className={`flex-1 flex items-center justify-center gap-2 py-2.5 rounded-lg text-sm font-bold transition-all ${sourceType === 'ip' ? 'bg-blue-600 text-white shadow-lg' : 'text-slate-400 hover:text-white'}`}
                            >
                                <Activity size={16} />
                                IP Camera
                            </button>
                        </div>

                        {sourceType === 'ip' && (
                            <div className="bg-slate-800 p-3 rounded-xl border border-slate-700">
                                <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-2 block">Camera URL</label>
                                <div className="flex gap-2">
                                    <input
                                        value={ipUrl}
                                        onChange={(e) => setIpUrl(e.target.value)}
                                        className="w-full bg-slate-900 border border-slate-700 text-white text-xs p-2 rounded-lg focus:border-blue-500 outline-none"
                                        placeholder="http://192.168.x.x/video"
                                    />
                                    <button
                                        onClick={() => setIsActive(true)}
                                        className="bg-blue-600 hover:bg-blue-500 text-white p-2 rounded-lg"
                                    >
                                        <RefreshCw size={14} />
                                    </button>
                                </div>
                            </div>
                        )}

                        <div className="bg-white/5 rounded-2xl p-4 border border-white/5">
                            <div className="flex items-center gap-3 text-slate-400 mb-2">
                                <Activity size={16} />
                                <span className="text-[10px] font-bold uppercase tracking-wider">Analysis Status</span>
                            </div>
                            <p className="text-white font-bold">{isSyncing ? "Detecting Faces..." : "Camera Active"}</p>
                        </div>

                        <div className="bg-white/5 rounded-2xl p-4 border border-white/5">
                            <div className="flex items-center gap-3 text-slate-400 mb-2">
                                <Shield size={16} />
                                <span className="text-[10px] font-bold uppercase tracking-wider">Match Found</span>
                            </div>
                            <p className="text-white font-bold">{recognitions.length} Subject(s)</p>
                        </div>
                    </div>

                    {recognitions.length > 0 && (
                        <div className="space-y-2">
                            <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest ml-1">Detected Subjects</p>
                            <div className="space-y-2 max-h-40 overflow-y-auto custom-scrollbar">
                                {recognitions.map((rec, i) => (
                                    <div key={i} className="flex items-center gap-3 bg-blue-500/10 border border-blue-500/20 p-3 rounded-xl">
                                        <div className="w-8 h-8 rounded-lg bg-blue-600 flex items-center justify-center text-white font-bold text-xs capitalize">
                                            {rec.student.name[0]}
                                        </div>
                                        <div>
                                            <p className="text-xs font-bold text-white leading-none">{rec.student.name}</p>
                                            <p className="text-[10px] text-blue-400 font-bold mt-1">{Math.round(rec.confidence * 100)}% Match</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}
                </div>

                <div className="space-y-4 mt-8">
                    {!isSyncing ? (
                        <button
                            onClick={startRecognition}
                            className="w-full bg-blue-600 hover:bg-blue-500 text-white py-4 rounded-2xl font-black text-sm uppercase tracking-widest transition-all shadow-lg shadow-blue-500/20"
                        >
                            Initialize AI
                        </button>
                    ) : (
                        <button
                            onClick={stopRecognition}
                            className="w-full bg-red-600/20 hover:bg-red-600/30 text-red-500 py-4 rounded-2xl font-black text-sm uppercase tracking-widest transition-all border border-red-500/20"
                        >
                            Stop Syncing
                        </button>
                    )}

                    <p className="text-[10px] text-center text-slate-600 font-bold uppercase">
                        Last sync: {stats.lastCheck || "Never"}
                    </p>
                </div>
            </div>
        </div>
    );
}
