import { Card, CardContent } from "../../components/Card";
import {
  Bell,
  Eye,
  Check,
  X,
} from "lucide-react";

/* ================= MOCK DATA ================= */

const reviewQueue = [
  {
    id: "VIO002",
    priority: "HIGH",
    student: "Unknown",
    type: "Bullying",
    confidence: "91%",
    location: "Main Gate",
    time: "Jan 16, 10:20 PM",
  },
  {
    id: "VIO029",
    priority: "HIGH",
    student: "Ali Malik",
    type: "Knife Detected",
    confidence: "86%",
    location: "Parking Lot A",
    time: "Jan 12, 9:14 AM",
  },
  {
    id: "VIO035",
    priority: "HIGH",
    student: "Ali Malik",
    type: "Bullying",
    confidence: "98%",
    location: "Engineering Block",
    time: "Jan 9, 2:33 AM",
  },
  {
    id: "VIO026",
    priority: "HIGH",
    student: "Unknown",
    type: "Gun Detected",
    confidence: "71%",
    location: "Parking Lot A",
    time: "Jan 7, 5:18 PM",
  },
  {
    id: "VIO022",
    priority: "HIGH",
    student: "Hassan Shah",
    type: "Bullying",
    confidence: "75%",
    location: "Parking Lot A",
    time: "Jan 5, 11:40 AM",
  },
];

/* ================= COMPONENT ================= */

export default function ReviewQueue() {
  return (
    <>
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-semibold">Review Queue</h1>
          <p className="text-slate-500">
            {reviewQueue.length} violations pending review
          </p>
        </div>
        <div className="flex items-center gap-4">
          <Bell className="w-6 h-6 text-slate-500" />
          <div className="w-8 h-8 rounded-full bg-blue-600 text-white flex items-center justify-center font-medium">
            S
          </div>
        </div>
      </div>

      {/* Table */}
      <Card>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="text-left text-slate-500 border-b">
                <tr className="h-12 border-b-slate-100">
                  <th className="p-4 w-10">
                    <input type="checkbox" className="rounded border-slate-300" />
                  </th>
                  <th className="p-4 font-medium">Priority</th>
                  <th className="p-4 font-medium">ID</th>
                  <th className="p-4 font-medium">Student</th>
                  <th className="p-4 font-medium">Type</th>
                  <th className="p-4 font-medium">Confidence</th>
                  <th className="p-4 font-medium">Location</th>
                  <th className="p-4 font-medium">Time</th>
                  <th className="p-4 font-medium text-right">Actions</th>
                </tr>
              </thead>

              <tbody className="divide-y divide-slate-100">
                {reviewQueue.map((v) => (
                  <tr key={v.id} className="h-16 hover:bg-slate-50 transition-colors">
                    <td className="p-4">
                      <input type="checkbox" className="rounded border-slate-300" />
                    </td>

                    <td className="p-4">
                      <span className="px-2.5 py-1 rounded-full text-xs font-semibold bg-blue-100 text-blue-700">
                        {v.priority}
                      </span>
                    </td>

                    <td className="p-4 font-medium text-slate-700">{v.id}</td>

                    <td
                      className={`p-4 ${v.student === "Unknown"
                          ? "italic text-slate-400"
                          : "text-slate-900 font-medium"
                        }`}
                    >
                      {v.student}
                    </td>

                    <td className="p-4 text-slate-600">{v.type}</td>
                    <td className="p-4 text-slate-600">{v.confidence}</td>
                    <td className="p-4 text-slate-600">{v.location}</td>
                    <td className="p-4 text-slate-500">{v.time}</td>

                    <td className="p-4">
                      <div className="flex items-center justify-end gap-2">
                        <button className="p-1.5 hover:bg-slate-100 rounded-lg transition-colors text-slate-600" title="View Details">
                          <Eye className="w-4 h-4" />
                        </button>
                        <button className="p-1.5 hover:bg-green-50 rounded-lg transition-colors text-green-600" title="Approve">
                          <Check className="w-4 h-4" />
                        </button>
                        <button className="p-1.5 hover:bg-red-50 rounded-lg transition-colors text-red-500" title="Reject">
                          <X className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </>
  );
}
