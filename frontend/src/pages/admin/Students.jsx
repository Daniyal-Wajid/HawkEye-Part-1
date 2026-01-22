import { useState } from "react";
import Topbar from "../../components/Topbar";
import StudentsFilters from "../../components/StudentsFilters";
import StudentsGrid from "../../components/StudentsGrid";
import StudentRegistrationModal from "../../components/StudentRegistrationModal";
import { UserPlus } from "lucide-react";

export default function Students() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
      <Topbar />

      <div className="p-6 space-y-6">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold">Students</h1>
            <p className="text-slate-500">View and manage student records</p>
          </div>

          <button
            onClick={() => setIsModalOpen(true)}
            className="flex items-center gap-2 bg-blue-600 text-white px-5 py-2.5 rounded-xl font-semibold hover:bg-blue-700 transition-all shadow-lg shadow-blue-100"
          >
            <UserPlus size={18} />
            Register Student
          </button>
        </div>

        <StudentsFilters />
        <StudentsGrid />
      </div>

      <StudentRegistrationModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </>
  );
}
