import AdminNavbar from "../../components/admin/AdminNavbar";
import { Outlet } from "react-router-dom";

function AdminPanel() {
    return (
        <div className="flex h-screen">
            {/* Sidebar */}
            <div>
                <AdminNavbar />
            </div>

            {/* Main content */}
            <div className="flex-1 overflow-y-auto bg-gray-50 p-6">
                <Outlet />
            </div>
        </div>
    );
}

export default AdminPanel;
