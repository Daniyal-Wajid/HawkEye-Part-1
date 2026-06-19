import Topbar from "../../components/Topbar";
import ViolationsTable from "../../components/ViolationsTableFull";

export default function InchargeViolations() {
    return (
        <>
            <Topbar />
            <div className="p-6">
                <div className="flex justify-between items-center mb-6">
                    <div>
<<<<<<< HEAD
                        <h1 className="text-2xl font-bold">Camera Violations</h1>
                        <p className="text-slate-500">
                            View and manage violations detected from campus cameras.
=======
                        <h1 className="text-2xl font-bold">Discipline Violations</h1>
                        <p className="text-slate-500">
                            View and manage student discipline violations here.
>>>>>>> a044002ed30c4560c21643524cf71c40799ff22b
                        </p>
                    </div>
                </div>

                <ViolationsTable />
            </div>
        </>
    );
}
