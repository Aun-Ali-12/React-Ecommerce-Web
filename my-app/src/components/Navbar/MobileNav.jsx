import { Link } from "react-router-dom"
import { useCategory } from "../../Context/Category"
import { useState } from "react";
function MobileNav() {
    const { categories } = useCategory();
    const [flag, setFlag] = useState(false);
    const [nestedFlag, setNestedFlag] = useState(false)

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
                    <span className="text-lg cursor-pointer">🛍️ ShopZar</span>
                    <span onClick={() => { setFlag(!flag) }} className="text-sm cursor-pointer">{!flag ? "☰" : "Close"}</span>
                </div>

                {/* Drawer */}
                {
                    flag && (
                        <div className="flex flex-col items-start gap-5 fixed top-16 left-0 bg-slate-100 text-slate-900 w-[75vw] h-screen p-4">
                            {navItems.map((items) => {
                                if (items.type === 'dropdown') {
                                    return (
                                        <div key={items.label} onClick={() => { setNestedFlag(!nestedFlag) }} className="relative mb-4">
                                            <span className="relative text-black font-medium
                after:absolute after:left-0 after:-bottom-1
                after:h-[2px] after:w-0 after:bg-black
                after:transition-all after:duration-300
                hover:after:w-full cursor-pointer">
                                                {items.label}
                                            </span>
                                            {
                                                nestedFlag && (
                                                    <div className="absolute z-50 ml-2 p-2 capitalize bg-white rounded-md shadow-sm">
                                                        {categories.map((cat) => (
                                                            <Link
                                                                key={cat.slug}
                                                                to={`/category/${cat.slug}`}
                                                                onClick={() => { setFlag(!flag) }}
                                                                className="block px-4 py-2 text-sm text-black hover:bg-slate-100 hover:rounded-md">
                                                                {cat.category}
                                                            </Link>
                                                        ))}
                                                    </div>
                                                )
                                            }
                                        </div>
                                    )
                                }
                                return (
                                    <Link
                                        key={items.label}
                                        to={items.path}
                                        onClick={() => { setFlag(!flag) }}
                                        className="relative text-black font-medium
                after:absolute after:left-0 after:-bottom-1
                after:h-[2px] after:w-0 after:bg-black
                after:transition-all after:duration-300
                hover:after:w-full"
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