import React from "react"
import {Link, useLocation } from 'react-router-dom'

function Navbar() {
    const navItems = [
        { path: '/home', label: 'Home' },
        { path: '/products', label: 'Product' },
        { path: '/cart', label: 'Cart' }
    ]
    return (
        <>
            <div>
                {
                    navItems.map((items) => (
                        <Link key={items.path} to={items.path}>
                            <div key={items}>{items.label}</div>
                        </Link>
                    ))
                }
            </div>
        </>
    )
}
export default Navbar