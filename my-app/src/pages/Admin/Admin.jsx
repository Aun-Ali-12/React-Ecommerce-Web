import AdminNavbar from "../../components/admin/AdminNavbar"
import { Outlet } from "react-router-dom"

function AdminPanel() {
    return (
        <>
            <div><AdminNavbar /></div>
            <div>
                <Outlet/>
            </div>
        </>
    )
}

export default AdminPanel