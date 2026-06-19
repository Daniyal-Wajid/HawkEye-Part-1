<<<<<<< HEAD
import { useState } from "react";
import Topbar from "../../components/Topbar";
import PolicyRulesGrid from "../../components/PolicyRulesGrid";
import AddRuleModal from "../../components/AddRuleModal";

export default function PolicyRules() {
  const [showAdd, setShowAdd] = useState(false);
  const [refreshKey, setRefreshKey] = useState(0);

  const handleSaved = () => setRefreshKey((k) => k + 1);

=======
import Topbar from "../../components/Topbar";
import PolicyRulesGrid from "../../components/PolicyRulesGrid";
import { Play } from "lucide-react";

export default function PolicyRules() {
>>>>>>> a044002ed30c4560c21643524cf71c40799ff22b
  return (
    <>
      <Topbar />

      <div className="p-6 space-y-6">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold">Policy Rules</h1>
            <p className="text-slate-500">
              Manage violation policies and penalties
            </p>
          </div>

<<<<<<< HEAD
          <button
            onClick={() => setShowAdd(true)}
            className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
          >
            + Add Rule
          </button>
        </div>

        <PolicyRulesGrid key={refreshKey} />

        {showAdd && (
          <AddRuleModal
            onClose={() => setShowAdd(false)}
            onSaved={handleSaved}
          />
        )}
=======
          <div className="flex gap-3">
            <button className="flex items-center gap-2 border px-4 py-2 rounded-lg hover:bg-slate-50">
              <Play size={16} />
              Simulate Rule
            </button>

            <button className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700">
              + Add Rule
            </button>
          </div>
        </div>

        <PolicyRulesGrid />
>>>>>>> a044002ed30c4560c21643524cf71c40799ff22b
      </div>
    </>
  );
}
