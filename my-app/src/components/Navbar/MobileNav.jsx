import { Link } from "react-router-dom"
import { useCategory } from "../../Context/Category"
import { useState } from "react";
function MobileNav() {
    const { categories } = useCategory();
    const [flag, setFlag] = useState(false);

    //links
    const navItems = [
        { path: '/', label: 'Home' },
        { path: '/products', label: 'Product' },
        { label: 'Category', type: 'dropdown' }, //no path bcz it is dropdown menu
        { path: '/contact', label: 'Contact' },
        { path: '/cart', label: 'Cart' }
    ]

    return (
        <>
            <nav className="fixed top-0 left-0 w-full z-[9999] bg-white shadow-md md:hidden">

                {/* Top Bar */}
                <div className="flex justify-between items-center h-16 px-4 text-2xl font-bold">
                    <span>🛍️ ShopZar</span>
                    <span onClick={() => { setFlag(!flag) }}>{!flag ? "☰" : "Close"}</span>
                </div>

                {/* Drawer */}
                {
                    flag && (
                        <div className="fixed top-16 left-0 bg-pink-100 w-[75vw] h-screen p-4">
                            {navItems.map((items) => {
                                if (items.type === 'dropdown') {
                                    return (
                                        <div key={items.label} className="mb-4">
                                            <span className="block text-black font-medium">
                                                {items.label}
                                            </span>
                                            <div className="mt-2 pl-2">
                                                {categories.map((cat) => (
                                                    <Link
                                                        key={cat.slug}
                                                        to={`/category/${cat.slug}`}
                                                        onClick={() => { setFlag(!flag) }}
                                                        className="block py-2 text-sm text-black">
                                                        {cat.category}
                                                    </Link>
                                                ))}
                                            </div>
                                        </div>
                                    )
                                }
                                return (
                                    <Link
                                        key={items.label}
                                        to={items.path}
                                        onClick={() => { setFlag(!flag) }}
                                        className="block py-3 text-black font-medium"
                                    >
                                        {items.label}
                                    </Link>
                                )
                            })}
                        </div>
                    )
                }
            </nav>

        </>
    )
}
export default MobileNav