import { Card, CardContent } from "../../components/Card";
import {
  Bell,
  FileText,
  Receipt,
  CheckCircle,
} from "lucide-react";

/* ================= MOCK SUMMARY DATA ================= */

const summaryCards = [
  {
    title: "Total Penalties",
    value: 6,
    icon: Receipt,
    color: "text-blue-600",
  },
  {
    title: "Unpaid Amount",
    value: "Rs. 5000",
    icon: Receipt,
    color: "text-red-500",
  },
  {
    title: "Total Challans",
    value: 6,
    icon: FileText,
    color: "text-blue-600",
  },
  {
    title: "Pending Challans",
    value: 2,
    icon: FileText,
    color: "text-orange-500",
  },
];

/* ================= MOCK PENALTIES LIST ================= */

const penalties = [
  {
    penaltyId: "PEN001",
    violationId: "VIO001",
    student: "Hassan Shah",
    amount: "Rs. 1000",
    date: "Jan 10, 2026",
    status: "Paid",
  },
  {
    penaltyId: "PEN002",
    violationId: "VIO004",
    student: "Unknown",
    amount: "Rs. 2000",
    date: "Jan 12, 2026",
    status: "Unpaid",
  },
  {
    penaltyId: "PEN003",
    violationId: "VIO009",
    student: "Unknown",
    amount: "Rs. 5000",
    date: "Dec 30, 2025",
    status: "Paid",
  },
  {
    penaltyId: "PEN004",
    violationId: "VIO011",
    student: "Omar Raza",
    amount: "Rs. 1500",
    date: "Jan 9, 2026",
    status: "Unpaid",
  },
  {
    penaltyId: "PEN005",
    violationId: "VIO012",
    student: "Ali Malik",
    amount: "Rs. 500",
    date: "Jan 15, 2026",
    status: "Paid",
  },
  {
    penaltyId: "PEN006",
    violationId: "VIO013",
    student: "Ahmed Khan",
    amount: "Rs. 1500",
    date: "Dec 28, 2025",
    status: "Unpaid",
  },
];

/* ================= COMPONENT ================= */

export default function PenaltiesChallans() {
  return (
    <>
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-semibold">Penalties & Challans</h1>
          <p className="text-slate-500">
            Manage payment status and challans
          </p>
        </div>
        <div className="flex items-center gap-4">
          <Bell className="w-6 h-6 text-slate-500" />
          <div className="w-8 h-8 rounded-full bg-blue-600 text-white flex items-center justify-center font-medium">
            S
          </div>
        </div>
      </div>

      <div className="space-y-6">
        {/* Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          {summaryCards.map((card) => (
            <Card key={card.title}>
              <CardContent className="flex flex-col items-center justify-center h-36">
                <card.icon className={`w-8 h-8 mb-2 ${card.color}`} />
                <p className="text-slate-500 text-sm">{card.title}</p>
                <p className="text-2xl font-bold">{card.value}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Tabs */}
        <div className="flex gap-2">
          <button className="px-4 py-2 rounded-lg bg-blue-50 text-blue-600 font-medium">
            Penalties
          </button>
          <button className="px-4 py-2 rounded-lg text-slate-500 hover:bg-slate-50 transition-colors">
            Challans
          </button>
        </div>

        {/* Penalties Table */}
        <Card>
          <CardContent>
            <h2 className="text-lg font-semibold mb-4">Penalties List</h2>

            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead className="text-left text-slate-500 border-b">
                  <tr className="h-10">
                    <th className="font-medium p-2">Penalty ID</th>
                    <th className="font-medium p-2">Violation ID</th>
                    <th className="font-medium p-2">Student</th>
                    <th className="font-medium p-2">Amount</th>
                    <th className="font-medium p-2">Assigned Date</th>
                    <th className="font-medium p-2">Status</th>
                    <th className="font-medium p-2">Actions</th>
                  </tr>
                </thead>

                <tbody className="divide-y">
                  {penalties.map((p) => (
                    <tr key={p.penaltyId} className="h-14 hover:bg-slate-50 transition-colors">
                      <td className="font-medium p-2">{p.penaltyId}</td>
                      <td className="p-2">{p.violationId}</td>
                      <td className="p-2">{p.student}</td>
                      <td className="p-2">{p.amount}</td>
                      <td className="text-slate-500 p-2">{p.date}</td>
                      <td className="p-2">
                        <span
                          className={`px-3 py-1 rounded-full text-xs font-medium ${p.status === "Paid"
                              ? "bg-green-100 text-green-600"
                              : "bg-red-100 text-red-600"
                            }`}
                        >
                          {p.status}
                        </span>
                      </td>
                      <td className="p-2">
                        {p.status === "Unpaid" && (
                          <button className="flex items-center gap-2 px-3 py-1.5 text-xs bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors">
                            <CheckCircle className="w-3 h-3" />
                            Mark Paid
                          </button>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      </div>
    </>
  );
}
