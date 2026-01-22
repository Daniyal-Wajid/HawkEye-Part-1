import { useState } from "react";
import Topbar from "../../components/Topbar";
import CameraStats from "../../components/CameraStats";
import CamerasGrid from "../../components/CamerasGrid";
import LiveRecognitionPanel from "../../components/LiveRecognitionPanel";
import { Maximize2, Camera } from "lucide-react";

export default function Cameras() {
  const [showLivePanel, setShowLivePanel] = useState(false);

  return (
    <>
      <Topbar />

      <div className="p-6 space-y-6">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold">Cameras Management</h1>
            <p className="text-slate-500">Manage surveillance and facial recognition</p>
          </div>

          <div className="flex gap-4">
            <button
              onClick={() => setShowLivePanel(!showLivePanel)}
              className="flex items-center gap-2 bg-slate-100 text-slate-800 px-5 py-2.5 rounded-xl font-bold hover:bg-blue-600 hover:text-white transition-all shadow-lg shadow-slate-200"
            >
              <Maximize2 size={18} />
              {showLivePanel ? "Close AI View" : "Internal Camera AI"}
            </button>
            <button className="flex items-center gap-2 bg-blue-600 text-white px-5 py-2.5 rounded-xl font-bold hover:bg-blue-700 transition-all shadow-lg shadow-blue-200">
              <Camera size={18} />
              Add IP Camera
            </button>
          </div>
        </div>

        {showLivePanel && (
          <div className="h-[600px] animate-in zoom-in-95 duration-300">
            <LiveRecognitionPanel onClose={() => setShowLivePanel(false)} />
          </div>
        )}

        <CameraStats />
        <CamerasGrid />
      </div>
    </>
  );
}
