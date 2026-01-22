import Topbar from "../../components/Topbar";
import ViolationsTable from "../../components/ViolationsTableFull";

export default function InchargeViolations() {
    return (
        <>
            <Topbar />
            <div className="p-6">
                <div className="flex justify-between items-center mb-6">
                    <div>
                        <h1 className="text-2xl font-bold">Discipline Violations</h1>
                        <p className="text-slate-500">
                            View and manage student discipline violations here.
                        </p>
                    </div>
                </div>

                <ViolationsTable />
            </div>
        </>
    );
}
