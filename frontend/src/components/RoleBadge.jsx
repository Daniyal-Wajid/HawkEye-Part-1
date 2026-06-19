export default function RoleBadge({ role }) {
<<<<<<< HEAD
  const r = (role || "").toLowerCase();
  const styles = {
    admin: "bg-red-100 text-red-600",
    discipline_incharge: "bg-blue-100 text-blue-600",
    student: "bg-slate-100 text-slate-600",
  };
  const label = role === "admin" ? "Admin" : role === "discipline_incharge" ? "Discipline Incharge" : role === "student" ? "Student" : (role || "—");

  return (
    <span className={`px-3 py-1 rounded-full text-xs font-semibold ${styles[r] || "bg-slate-100 text-slate-600"}`}>
      {label}
=======
  const styles = {
    Admin: "bg-red-100 text-red-600",
    "Discipline Incharge": "bg-blue-100 text-blue-600",
  };

  return (
    <span className={`px-3 py-1 rounded-full text-xs font-semibold ${styles[role]}`}>
      {role}
>>>>>>> a044002ed30c4560c21643524cf71c40799ff22b
    </span>
  );
}
