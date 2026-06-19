import Topbar from "../../components/Topbar";
<<<<<<< HEAD
=======
import NotificationStats from "../../components/NotificationStats";
>>>>>>> a044002ed30c4560c21643524cf71c40799ff22b
import NotificationsList from "../../components/NotificationsList";

export default function Notifications() {
  return (
    <>
      <Topbar />

      <div className="p-6 space-y-6">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold">Notifications</h1>
<<<<<<< HEAD
            <p className="text-slate-500">Stay updated with the latest system alerts.</p>
          </div>
        </div>

=======
            <p className="text-slate-500">6 unread notifications</p>
          </div>

          <button className="px-4 py-2 border rounded-lg text-sm hover:bg-slate-100">
            ✓ Mark All Read
          </button>
        </div>

        <NotificationStats />
>>>>>>> a044002ed30c4560c21643524cf71c40799ff22b
        <NotificationsList />
      </div>
    </>
  );
}
