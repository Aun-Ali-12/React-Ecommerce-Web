import { Link } from "react-router-dom"
import { useSession } from "../../../Context/AuthContext"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faShoppingCart } from "@fortawesome/free-solid-svg-icons";

function AdminNavbar() {
    const { signOut } = useSession();
    const navElements = [
        { path: '/admin/dashboard', label: 'Dashboard' },
        { path: '/admin/yourproduct', label: 'Your Products' },
        { path: '/admin/listing', label: 'Product Listing' },
        { path: '/admin/orders', label: 'Orders' },
    ]

    return (
        <>
            <div className="h-screen w-[25vw] bg-white flex flex-col justify-between border-r border-gray-200 p-5">
                <div>
                    {/* Logo Section */}
                    <div className="flex items-center">
                        <FontAwesomeIcon icon={faShoppingCart} className="text-4xl" />
                        <h1>Shopzar</h1>
                    </div>
                    {/* Navigation Links */}
                    <div className="flex flex-col mt-6 space-y-2 px-4">
                        {navElements.map((nav) => (
                            <Link
                                key={nav.path}
                                to={nav.path}
                                className="text-black py-2 px-3 rounded hover:bg-gray-100 transition-colors duration-200"
                            >
                                {nav.label}
                            </Link>
                        ))}
                    </div>
                </div>
                {/* Logout Button */}
                <div className="px-4 py-6 border-t border-gray-200">
                    <button
                        onClick={() => signOut()}
                        className="w-full py-2 bg-red-500 text-white font-semibold rounded hover:bg-red-600 transition-colors duration-200"
                    >
                        Logout
                    </button>
                </div>
            </div>
        </>
    )
}
export default AdminNavbar