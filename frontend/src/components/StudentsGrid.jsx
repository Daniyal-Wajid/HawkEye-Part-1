<<<<<<< HEAD
import StudentCard from "./StudentCard";
import { Loader2, AlertCircle } from "lucide-react";

export default function StudentsGrid({ students = [], loading, error, onViewDetails, onEdit }) {
=======
import { useState, useEffect } from "react";
import StudentCard from "./StudentCard";
import { Loader2, AlertCircle } from "lucide-react";

export default function StudentsGrid() {
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchStudents = async () => {
      try {
        const token = localStorage.getItem("token");
        const res = await fetch("http://localhost:5000/api/students", {
          headers: {
            "Authorization": `Bearer ${token}`
          }
        });

        const data = await res.json();

        if (!res.ok) {
          throw new Error(data.error || "Failed to fetch students");
        }

        setStudents(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchStudents();
  }, []);

>>>>>>> a044002ed30c4560c21643524cf71c40799ff22b
  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center py-20 gap-4">
        <Loader2 className="w-12 h-12 text-blue-600 animate-spin" />
        <p className="text-slate-500 font-medium animate-pulse">Retrieving student records...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-50 border border-red-200 rounded-2xl p-6 flex items-center gap-4 text-red-600">
        <AlertCircle className="shrink-0" />
        <p className="font-semibold">{error}</p>
      </div>
    );
  }

  if (students.length === 0) {
    return (
      <div className="text-center py-20 bg-slate-50 border border-dashed rounded-3xl">
        <p className="text-slate-400 font-medium">No students registered yet.</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {students.map((student) => (
<<<<<<< HEAD
        <StudentCard
          key={student._id || student.id}
          student={student}
          onViewDetails={onViewDetails}
          onEdit={onEdit}
        />
=======
        <StudentCard key={student._id} student={student} />
>>>>>>> a044002ed30c4560c21643524cf71c40799ff22b
      ))}
    </div>
  );
}
