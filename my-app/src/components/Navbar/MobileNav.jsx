import { Link } from "react-router-dom"
function MobileNav() {
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
            <div>
                {
                    navItems.map((items) => (
                        <Link key={items.label} to={items.path}>
                            {items.label}
                        </Link>
                    ))
                }
            </div>
        </>
    )
}
export default MobileNav