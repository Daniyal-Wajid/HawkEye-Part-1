import { Card, CardContent } from "../../components/Card";
import { Bell, Gift, User } from "lucide-react";

/* ================= MOCK DATA ================= */

const leaderboard = [
  {
    rank: 1,
    name: "Hiba Ahmed",
    department: "Electrical Engineering",
    points: 104,
  },
  {
    rank: 2,
    name: "Zainab Hussain",
    department: "Computer Science",
    points: 103,
  },
  {
    rank: 3,
    name: "Maryam Mirza",
    department: "Mechanical Engineering",
    points: 98,
  },
  {
    rank: 4,
    name: "Sara Qureshi",
    department: "Business Administration",
    points: 79,
  },
];

/* ================= COMPONENT ================= */

export default function Rewards() {
  return (
    <>
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-semibold">Rewards</h1>
          <p className="text-slate-500">
            Issue and manage student rewards
          </p>
        </div>

        <div className="flex items-center gap-4">
          <Bell className="w-6 h-6 text-slate-500" />
          <div className="w-8 h-8 rounded-full bg-blue-600 text-white flex items-center justify-center font-medium">
            S
          </div>
        </div>
      </div>

      {/* Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Issue Reward */}
        <Card>
          <CardContent className="space-y-4">
            <h2 className="text-xl font-semibold flex items-center gap-2">
              + Issue Reward
            </h2>

            <div>
              <label className="text-sm font-medium">
                Select Student
              </label>
              <select className="w-full mt-1 p-2 border rounded-lg bg-slate-50 border-slate-200">
                <option>Search and select student...</option>
              </select>
            </div>

            <div>
              <label className="text-sm font-medium">Points</label>
              <input
                type="number"
                placeholder="Enter points"
                className="w-full mt-1 p-2 border rounded-lg bg-slate-50 border-slate-200"
              />
            </div>

            <div>
              <label className="text-sm font-medium">
                Description
              </label>
              <textarea
                placeholder="Reason for reward..."
                className="w-full mt-1 p-2 border rounded-lg bg-slate-50 border-slate-200"
                rows={4}
              />
            </div>

            <button className="w-full bg-blue-600 hover:bg-blue-700 transition-colors text-white py-2 rounded-lg flex items-center justify-center gap-2">
              <Gift className="w-4 h-4" />
              Issue Reward
            </button>
          </CardContent>
        </Card>

        {/* Leaderboard */}
        <Card>
          <CardContent className="space-y-4">
            <h2 className="text-xl font-semibold">
              Rewards Leaderboard
            </h2>

            <div className="space-y-3">
              {leaderboard.map((s) => (
                <div
                  key={s.rank}
                  className="flex items-center justify-between border border-slate-100 rounded-lg p-3 hover:bg-slate-50 transition-colors"
                >
                  <div className="flex items-center gap-4">
                    <div
                      className={`w-8 h-8 rounded-full flex items-center justify-center font-semibold text-white text-sm shadow-sm ${s.rank === 1
                          ? "bg-yellow-500"
                          : s.rank === 2
                            ? "bg-slate-400"
                            : s.rank === 3
                              ? "bg-orange-500"
                              : "bg-slate-200 text-slate-700"
                        }`}
                    >
                      {s.rank}
                    </div>

                    <div className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center">
                      <User className="w-5 h-5 text-slate-500" />
                    </div>

                    <div>
                      <div className="font-medium text-slate-900">{s.name}</div>
                      <div className="text-xs text-slate-500">
                        {s.department}
                      </div>
                    </div>
                  </div>

                  <div className="text-right">
                    <div className="text-lg font-bold text-blue-600">
                      {s.points}
                    </div>
                    <div className="text-xs text-slate-400">
                      points
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </>
  );
}
