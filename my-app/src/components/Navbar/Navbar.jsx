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
            <nav className="flex justify-evenly items-center bg-white shadow-md h-16">
                {
                    navItems.map((items, index) => {
                        if (items.type === 'dropdown') {
                            return (
                                <div key={index} className="relative group">
                                    <span>{items.label}</span>
                                    <div key={index} className="absolute hidden group-hover:block border border-1 border-gray-500 bg-white p-2">
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