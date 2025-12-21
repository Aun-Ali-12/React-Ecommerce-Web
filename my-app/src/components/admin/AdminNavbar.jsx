import { Link } from "react-router-dom"

function AdminNavbar() {
    const navElements = [
        { path: '/admin/listing', label: 'Product Listing' },
        { path: '/admin/yourproduct', label: 'Your Products' },
        { path: '/admin/dashboard', label: 'Dashboard' }
    ]

    return (
        <>
            {
                navElements.map((nav) => [
                    <Link key={nav.path} to={nav.path}><div key={nav}>{nav.label}</div></Link>
                ])
            }
        </>
    )
}
export default AdminNavbar