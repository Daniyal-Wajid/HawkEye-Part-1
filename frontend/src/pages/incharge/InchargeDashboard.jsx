import Topbar from "../../components/Topbar";
import StatCard from "../../components/StatCard";
import ViolationsTable from "../../components/ViolationsTableFull";
import { AlertTriangle, Clock, ShieldAlert, CheckCircle } from "lucide-react";

export default function InchargeDashboard() {
  return (
    <>
      <Topbar />

      <div className="p-6 space-y-6">
        <div>
          <h1 className="text-2xl font-bold">Dashboard</h1>
          <p className="text-slate-500">Overview of recent activity and alerts</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <StatCard
            title="Pending Reviews"
            value="5"
            icon={<Clock />}
            color="bg-orange-100 text-orange-600"
          />
          <StatCard
            title="Active Violations"
            value="12"
            icon={<ShieldAlert />}
            color="bg-red-100 text-red-600"
          />
          <StatCard
            title="Resolved Today"
            value="8"
            icon={<CheckCircle />}
            color="bg-green-100 text-green-600"
          />
          <StatCard
            title="High Priority"
            value="3"
            icon={<AlertTriangle />}
            color="bg-yellow-100 text-yellow-600"
          />
        </div>

        <div className="space-y-4">
          <h2 className="text-lg font-semibold">Recent Violations</h2>
          <ViolationsTable />
        </div>
      </div>
    </>
  );
}
