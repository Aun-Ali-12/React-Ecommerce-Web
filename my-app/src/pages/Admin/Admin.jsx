import AdminNavbar from "../../components/admin/components/AdminNavbar";
import { Outlet } from "react-router-dom";

function AdminPanel() {
    return (
        <div className="flex h-screen">
            {/* Sidebar */}
            <div className="hidden md:block">
                <AdminNavbar />
            </div>

            {/* Main content */}
            <div className="flex-1 overflow-y-auto p-6 bg-slate-50">
                <Outlet />
            </div>
        </div>
    );
}

export default AdminPanel;
