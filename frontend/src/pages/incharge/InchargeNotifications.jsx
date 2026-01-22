import Topbar from "../../components/Topbar";
import { Card, CardContent } from "../../components/Card";
import { Bell, Info, AlertCircle, CheckCircle } from "lucide-react";

/* ================= MOCK DATA ================= */
const notifications = [
    {
        id: 1,
        title: "Violation Report Filed",
        message: "A new violation has been reported in the cafeteria.",
        time: "2 mins ago",
        type: "alert",
        read: false,
    },
    {
        id: 2,
        title: "System Maintenance",
        message: "Scheduled maintenance will occur tonight at 11 PM.",
        time: "1 hour ago",
        type: "info",
        read: true,
    },
    {
        id: 3,
        title: "Reward Approved",
        message: "The reward request for Ali Khan has been approved.",
        time: "3 hours ago",
        type: "success",
        read: true,
    },
    {
        id: 4,
        title: "Pending Review",
        message: "You have 5 violations pending review.",
        time: "5 hours ago",
        type: "alert",
        read: true,
    },
];

export default function InchargeNotifications() {
    return (
        <>
            <Topbar />
            <div className="p-6 max-w-4xl mx-auto space-y-6">
                <div className="flex justify-between items-center">
                    <div>
                        <h1 className="text-2xl font-bold">Notifications</h1>
                        <p className="text-slate-500">Stay updated with the latest alerts and messages.</p>
                    </div>
                    <button className="text-sm text-blue-600 hover:underline">Mark all as read</button>
                </div>

                <div className="space-y-4">
                    {notifications.map((notif) => (
                        <Card key={notif.id} className={!notif.read ? "bg-blue-50/50 border-blue-100" : ""}>
                            <CardContent className="flex items-start gap-4 p-5">
                                <div
                                    className={`mt-1 w-10 h-10 rounded-full flex items-center justify-center shrink-0 ${notif.type === "alert"
                                            ? "bg-red-100 text-red-600"
                                            : notif.type === "success"
                                                ? "bg-green-100 text-green-600"
                                                : "bg-blue-100 text-blue-600"
                                        }`}
                                >
                                    {notif.type === "alert" ? (
                                        <AlertCircle className="w-5 h-5" />
                                    ) : notif.type === "success" ? (
                                        <CheckCircle className="w-5 h-5" />
                                    ) : (
                                        <Info className="w-5 h-5" />
                                    )}
                                </div>
                                <div className="flex-1">
                                    <div className="flex justify-between items-start">
                                        <h3 className={`font-semibold ${!notif.read ? "text-slate-900" : "text-slate-700"}`}>
                                            {notif.title}
                                        </h3>
                                        <span className="text-xs text-slate-400 whitespace-nowrap ml-2">{notif.time}</span>
                                    </div>
                                    <p className="text-slate-600 text-sm mt-1">{notif.message}</p>
                                </div>
                                {!notif.read && (
                                    <div className="w-2.5 h-2.5 rounded-full bg-blue-600 mt-2"></div>
                                )}
                            </CardContent>
                        </Card>
                    ))}
                </div>
            </div>
        </>
    );
}
