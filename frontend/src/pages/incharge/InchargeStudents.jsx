import Topbar from "../../components/Topbar";
import { Card, CardContent } from "../../components/Card";
import { Search, Filter, MoreHorizontal, User } from "lucide-react";

/* ================= MOCK DATA ================= */
const students = [
    { id: "S001", name: "Ali Khan", dept: "BSCS", batch: "2022", status: "Good" },
    { id: "S002", name: "Sara Ahmed", dept: "BBA", batch: "2023", status: "Warning" },
    { id: "S003", name: "Zain Malik", dept: "EE", batch: "2021", status: "Probation" },
    { id: "S004", name: "Hassan Raza", dept: "BSCS", batch: "2024", status: "Good" },
    { id: "S005", name: "Ayesha Bibi", dept: "Psych", batch: "2023", status: "Good" },
];

export default function InchargeStudents() {
    return (
        <>
            <Topbar />
            <div className="p-6 space-y-6">
                <div className="flex justify-between items-center">
                    <div>
                        <h1 className="text-2xl font-bold">Student Directory</h1>
                        <p className="text-slate-500">Search and view student profiles.</p>
                    </div>
                    <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition">
                        + Add Student
                    </button>
                </div>

                {/* Filters */}
                <div className="flex gap-4 mb-6">
                    <div className="relative flex-1 max-w-sm">
                        <Search className="absolute left-3 top-2.5 w-5 h-5 text-slate-400" />
                        <input
                            type="text"
                            placeholder="Search students..."
                            className="w-full pl-10 pr-4 py-2 bg-white border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>
                    <button className="flex items-center gap-2 px-4 py-2 bg-white border border-slate-200 rounded-lg text-slate-600 hover:bg-slate-50">
                        <Filter className="w-4 h-4" />
                        Filter
                    </button>
                </div>

                {/* Table */}
                <Card>
                    <CardContent>
                        <table className="w-full text-sm">
                            <thead className="text-left text-slate-500 border-b bg-slate-50">
                                <tr>
                                    <th className="p-4 font-medium">Student Info</th>
                                    <th className="p-4 font-medium">Department</th>
                                    <th className="p-4 font-medium">Batch</th>
                                    <th className="p-4 font-medium">Status</th>
                                    <th className="p-4 font-medium text-right">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y">
                                {students.map((student) => (
                                    <tr key={student.id} className="hover:bg-slate-50 transition">
                                        <td className="p-4">
                                            <div className="flex items-center gap-3">
                                                <div className="w-10 h-10 rounded-full bg-slate-200 flex items-center justify-center text-slate-500">
                                                    <User className="w-5 h-5" />
                                                </div>
                                                <div>
                                                    <div className="font-medium text-slate-900">{student.name}</div>
                                                    <div className="text-xs text-slate-500">{student.id}</div>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="p-4 text-slate-600">{student.dept}</td>
                                        <td className="p-4 text-slate-600">{student.batch}</td>
                                        <td className="p-4">
                                            <span
                                                className={`px-3 py-1 rounded-full text-xs font-medium ${student.status === "Good"
                                                        ? "bg-green-100 text-green-700"
                                                        : student.status === "Warning"
                                                            ? "bg-yellow-100 text-yellow-700"
                                                            : "bg-red-100 text-red-700"
                                                    }`}
                                            >
                                                {student.status}
                                            </span>
                                        </td>
                                        <td className="p-4 text-right">
                                            <button className="p-2 hover:bg-slate-100 rounded-lg text-slate-500">
                                                <MoreHorizontal className="w-4 h-4" />
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </CardContent>
                </Card>
            </div>
        </>
    );
}
