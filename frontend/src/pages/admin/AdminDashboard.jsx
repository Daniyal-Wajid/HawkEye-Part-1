<<<<<<< HEAD
import { useState, useEffect, useCallback } from "react";
import Topbar from "../../components/Topbar";
import StatCard from "../../components/StatCard";
import ViolationsTable from "../../components/ViolationsTableFull";
import { AlertTriangle, Clock, Camera, Receipt } from "lucide-react";
import { apiGet } from "../../lib/api";

const POLL_INTERVAL = 30000;

export default function AdminDashboard() {
  const [summary, setSummary] = useState(null);

  const fetchSummary = useCallback(async () => {
    try {
      const data = await apiGet("/api/analytics/summary");
      setSummary(data);
    } catch (err) {
      console.error("[Dashboard] Failed to load summary:", err.message);
    }
  }, []);

  useEffect(() => {
    fetchSummary();
    const interval = setInterval(fetchSummary, POLL_INTERVAL);
    return () => clearInterval(interval);
  }, [fetchSummary]);

=======
import Topbar from "../../components/Topbar";
import StatCard from "../../components/StatCard";
import ViolationsTable from "../../components/ViolationsTableFull";
import { AlertTriangle, Clock, Camera } from "lucide-react";

export default function AdminDashboard() {
>>>>>>> a044002ed30c4560c21643524cf71c40799ff22b
  return (
    <>
      <Topbar />

      <div className="p-6 space-y-6">
        <div>
          <h1 className="text-2xl font-bold">Dashboard</h1>
<<<<<<< HEAD
          <p className="text-slate-500">Welcome back, Admin</p>
=======
          <p className="text-slate-500">Welcome back, John Admin</p>
>>>>>>> a044002ed30c4560c21643524cf71c40799ff22b
        </div>

        <div className="grid grid-cols-4 gap-6">
          <StatCard
<<<<<<< HEAD
            title="Today's Camera Violations"
            value={summary ? String(summary.todayViolations) : "—"}
=======
            title="Today's Violations"
            value="1"
>>>>>>> a044002ed30c4560c21643524cf71c40799ff22b
            icon={<AlertTriangle />}
            color="bg-blue-100 text-blue-600"
          />
          <StatCard
<<<<<<< HEAD
            title="Unverified (camera)"
            value={summary ? String(summary.unverifiedViolations) : "—"}
=======
            title="Unverified"
            value="18"
>>>>>>> a044002ed30c4560c21643524cf71c40799ff22b
            icon={<Clock />}
            color="bg-orange-100 text-orange-600"
          />
          <StatCard
<<<<<<< HEAD
            title="High-severity (camera)"
            value={summary ? String(summary.highSeverityViolations) : "—"}
=======
            title="High Severity Alerts"
            value="0"
>>>>>>> a044002ed30c4560c21643524cf71c40799ff22b
            icon={<AlertTriangle />}
            color="bg-red-100 text-red-600"
          />
          <StatCard
            title="Active Cameras"
<<<<<<< HEAD
            value={summary ? `${summary.activeCameras}/${summary.totalCameras}` : "—"}
=======
            value="4/5"
>>>>>>> a044002ed30c4560c21643524cf71c40799ff22b
            icon={<Camera />}
            color="bg-green-100 text-green-600"
          />
        </div>

<<<<<<< HEAD
        {summary && (
          <div className="grid grid-cols-4 gap-6">
            <StatCard
              title="Total Fines Issued"
              value={String(summary.totalFines)}
              icon={<Receipt />}
              color="bg-purple-100 text-purple-600"
            />
            <StatCard
              title="Pending Fine Amount"
              value={`Rs. ${(summary.pendingAmount || 0).toLocaleString()}`}
              icon={<Receipt />}
              color="bg-red-100 text-red-600"
            />
            <StatCard
              title="Collected Amount"
              value={`Rs. ${(summary.collectedAmount || 0).toLocaleString()}`}
              icon={<Receipt />}
              color="bg-green-100 text-green-600"
            />
            <StatCard
              title="Total Camera Violations"
              value={String(summary.totalViolations)}
              icon={<AlertTriangle />}
              color="bg-slate-100 text-slate-600"
            />
          </div>
        )}

        <div className="space-y-4">
          <h2 className="text-lg font-semibold">Recent Camera Violations</h2>
          <ViolationsTable />
        </div>
=======
        <ViolationsTable />
>>>>>>> a044002ed30c4560c21643524cf71c40799ff22b
      </div>
    </>
  );
}
