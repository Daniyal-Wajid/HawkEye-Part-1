import { Eye, User } from "lucide-react";

export default function StudentCard({ student }) {
  return (
    <div className="bg-white border rounded-xl p-5 flex flex-col">
      <div className="flex items-center gap-4">
        {student.avatar ? (
          <img
            src={student.avatar}
            alt={student.name}
            className="w-12 h-12 rounded-full object-cover"
          />
        ) : (
          <div className="w-12 h-12 rounded-full bg-slate-100 flex items-center justify-center">
            <User className="text-slate-400" />
          </div>
        )}

        <div>
          <div className="font-bold text-slate-800">{student.name}</div>
          <div className="text-sm font-semibold text-blue-600">{student.rollNumber}</div>
        </div>
      </div>

      <div className="mt-4 pt-4 border-t border-slate-100 flex items-center justify-between">
        <div className="text-xs font-bold text-slate-400 uppercase tracking-widest">
          Registered ID
        </div>
        <div className="text-xs font-mono text-slate-500">
          {student._id.slice(-8).toUpperCase()}
        </div>
      </div>

      <button className="mt-6 flex items-center justify-center gap-2 bg-slate-50 hover:bg-blue-50 hover:text-blue-600 text-slate-600 rounded-xl py-3 text-sm font-bold transition-all active:scale-[0.98]">
        <Eye size={16} /> View Details
      </button>
    </div>
  );
}
