import AdminNavbar from "../../components/admin/components/AdminNavbar";
import AdminMobNav from "../../components/admin/Navbar/MobNav";
import { Outlet } from "react-router-dom";

function AdminPanel() {
    return (
        <>
            {/* Mobile Nav  */}
            <div className="block md:hidden">
                <AdminMobNav />
            </div>

            <div className="flex h-screen ">

                {/* Sidebar */}
                <div className="hidden md:block">
                    <AdminNavbar />
                </div>

                {/* Main content */}
                <div className="flex-1 overflow-y-auto p-6 bg-slate-50">
                    <Outlet />
                </div>
            </div>

        </>
    );
}

export default AdminPanel;
