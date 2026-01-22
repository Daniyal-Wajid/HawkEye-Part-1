import {
    LayoutDashboard,
    BarChart2,
    Camera,
    History,
    Bell,
    ShieldAlert,
    Users,
    UserCog,
    FileText,
    ClipboardList,
    Gavel,
    Award
} from "lucide-react";

export const adminSidebarItems = [
    { label: "Dashboard", path: "/admin/dashboard", icon: LayoutDashboard },
    { label: "Analytics", path: "/analytics", icon: BarChart2 },
    { label: "Violations", path: "/violations", icon: ShieldAlert },
    { label: "Students", path: "/students", icon: Users },
    { label: "Users", path: "/users", icon: UserCog },
    { label: "Cameras", path: "/cameras", icon: Camera },
    { label: "Policy Rules", path: "/policy-rules", icon: FileText },
    { label: "Notifications", path: "/notifications", icon: Bell },
    { label: "History Logs", path: "/history-logs", icon: History },
];

export const inchargeSidebarItems = [
    { label: "Dashboard", path: "/incharge/dashboard", icon: LayoutDashboard },
    {
        label: "Violations",
        path: "/incharge/violations",
        icon: ShieldAlert,
        highlight: true // Primary highlighted section
    },
    { label: "Students", path: "/incharge/students", icon: Users },
    {
        label: "Review Queue",
        path: "/incharge/reviews",
        icon: ClipboardList,
        badge: true // Badge indicator
    },
    {
        label: "Notifications",
        path: "/incharge/notifications",
        icon: Bell,
        badge: true
    },
    { label: "Penalties & Challans", path: "/incharge/penalties", icon: Gavel },
    { label: "Rewards", path: "/incharge/rewards", icon: Award },
];
export const studentSidebarItems = [
    { label: "Dashboard", path: "/student/dashboard", icon: LayoutDashboard },
    { label: "Notifications", path: "/student/notifications", icon: Bell },
];
