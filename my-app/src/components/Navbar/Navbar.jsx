import React from "react"
import { Link, useLocation } from 'react-router-dom'
import { useCategory } from "../../Context/Category"

function Navbar() {
    const { categories } = useCategory() //category context 

    const navItems = [
        { path: '/home', label: 'Home' },
        { path: '/products', label: 'Product' },
        { label: 'Category', type: 'dropdown' }, //no path bcz it is dropdown menu
        // { path: '/newarrival', label: 'New Arrival' },
        // { path: '/contact', label: 'Contact' },
        { path: '/cart', label: 'Cart' }
    ]

    return (
        <>
            <nav>
                {
                    navItems.map((items, index) => {
                        if (items.type === 'dropdown') {
                            return (
                                <div key={index} className="relative">
                                    <span>{items.label}</span>
                                    <div key={categories.id} className="dropdown">
                                        {categories.map((cat) => (
                                            <Link key={cat.slug} to={`/category/${cat.slug}`}>{cat.category}</Link>
                                        ))}
                                    </div>
                                </div>
                            )
                        }
                        return (
                            <Link key={items.label} to={items.path}>{items.label}</Link>
                        )
                    })
                }
            </nav>
        </>
    )
}
export default Navbar