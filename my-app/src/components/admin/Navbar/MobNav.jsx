import { Link } from "react-router-dom"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faShoppingCart } from "@fortawesome/free-solid-svg-icons";
import { useSession } from "../../../Context/AuthContext"
import { useState } from "react";

function AdminMobNav() {
    const { signOut } = useSession();
    const [flag, setFlag] = useState(false)

    const navItems = [
        { path: "/admin/dashboard", label: "Dashboard" },
        { path: "/admin/yourproduct", label: "Your Product" },
        { path: "/admin/listing", label: "Product Listing" },
        { path: "/admin/orders", label: "Orders" }
    ]

    return (
        <>
            <div className="h-[10vh] w-full bg-slate-900 text-white flex flex-col justify-between border-r border-gray-200 p-3">
                {/* Logo Section */}
                <div className="flex items-center justify-between">
                    <span className="flex items-center">
                        <FontAwesomeIcon icon={faShoppingCart} className="text-4xl" />
                        <h1>Shopzar</h1>
                    </span>
                    <span onClick={() => { setFlag(!flag) }} className="relative text-sm cursor-pointer">{!flag ? "☰" : "Close"}</span>
                </div>

                {
                    flag && (
                        <>        {/* Nav Links */}
                            <div className="absolute left-0 h-screen z-50 flex flex-col justify-between items-start w-[75vw] bg-slate-900 text-white">
                                <div className="w-full flex flex-col gap-5 p-3">
                                    {
                                        navItems.map((nav) => (
                                            <Link
                                                key={nav.path}
                                                to={nav.path}
                                                onClick={() => { setFlag(!flag) }}
                                                className="text-white py-2 px-3 rounded hover:bg-gray-800 transition-colors duration-200 cursor-pointer"
                                            >{nav.label}</Link>
                                        ))
                                    }
                                </div>

                                {/* Logout Button */}
                                <div className="w-full px-4 py-6 border-t border-gray-200">
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
            </div>
        </>
    )
}
export default AdminMobNav