import { Link, useNavigate } from 'react-router-dom'
import { useCategory } from "../../Context/Category"
import { useSession } from "../../Context/AuthContext"


function Navbar() {
    const { categories } = useCategory(); //category context 
    const { session, signOut } = useSession(); //user auth context
    const user = session?.user
    const navigate = useNavigate()
    const navItems = [
        { path: '/', label: 'Home' },
        { path: '/products', label: 'Product' },
        { label: 'Category', type: 'dropdown' }, //no path bcz it is dropdown menu
        { path: '/contact', label: 'Contact' },
        { path: '/cart', label: 'Cart' }
    ]

    return (
        <>
            {/* Top Announcement Bar */}
            <div className="bg-pink-600 text-white text-center py-2 text-md hover:cursor-pointer">
                🚚 Free shipping on orders above $25
            </div>

            {/* Navbar */}
            <nav className="flex justify-between items-center px-10 bg-white shadow-md h-16">

                {/* Logo */}
                <div className="text-2xl font-bold text-black hover:cursor-pointer">
                    <span>🛍️ ShopZar</span>
                </div>

                {/* Nav Items */}
                <div className="flex block gap-8 items-center">
                    {navItems.map((items, index) => {
                        if (items.type === "dropdown") {
                            return (
                                <div key={index} className="relative group cursor-pointer">

                                    {/* Dropdown Trigger */}
                                    <span className="relative text-black font-medium
                  after:absolute after:left-0 after:-bottom-1
                  after:h-[2px] after:w-0 after:bg-black
                  after:transition-all after:duration-300
                  group-hover:after:w-full">
                                        {items.label}
                                    </span>

                                    {/* Dropdown Menu */}
                                    <div className="absolute top-8 left-0 hidden group-hover:block
                  bg-white border border-gray-200 rounded-lg shadow-lg
                  min-w-[180px] p-3 z-50">
                                        {categories.map((cat) => (
                                            <Link
                                                key={cat.slug}
                                                to={`/category/${cat.slug}`}
                                                className="block px-3 py-2 text-sm text-black rounded-md
                      hover:bg-gray-100 transition">
                                                {cat.category}
                                            </Link>
                                        ))}
                                    </div>
                                </div>
                            );
                        }

                        return (
                            <Link
                                key={items.label}
                                to={items.path}
                                className="relative text-black font-medium
                after:absolute after:left-0 after:-bottom-1
                after:h-[2px] after:w-0 after:bg-black
                after:transition-all after:duration-300
                hover:after:w-full"
                            >
                                {items.label}
                            </Link>
                        );
                    })}
                </div>

                {/* buttons */}
                {user ? <button onClick={()=>{signOut()}}>Logout</button> : <button onClick={() => { navigate('/login') }}>Login</button>}
            </nav>
        </>
    )
}
export default Navbar
