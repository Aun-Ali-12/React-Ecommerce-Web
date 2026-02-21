function Footer() {

    return (
        <>
            <footer className="bg-slate-800 text-white mt-16">
                <div className="max-w-7xl mx-auto px-6 py-12 grid grid-cols-1 md:grid-cols-4 gap-8">

                    {/* Brand Section */}
                    <div>
                        <h2 className="text-2xl font-bold mb-4">YourStore</h2>
                        <p className="text-sm text-gray-300">
                            Premium quality products with secure checkout and fast delivery.
                            Shop smart. Shop better.
                        </p>
                    </div>

                    {/* Quick Links */}
                    <div>
                        <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
                        <ul className="space-y-2 text-sm text-gray-300">
                            <li className="hover:text-yellow-400 cursor-pointer transition">Home</li>
                            <li className="hover:text-yellow-400 cursor-pointer transition">Products</li>
                            <li className="hover:text-yellow-400 cursor-pointer transition">Categories</li>
                            <li className="hover:text-yellow-400 cursor-pointer transition">Contact</li>
                        </ul>
                    </div>

                    {/* Customer Support */}
                    <div>
                        <h3 className="text-lg font-semibold mb-4">Customer Support</h3>
                        <ul className="space-y-2 text-sm text-gray-300">
                            <li className="hover:text-yellow-400 cursor-pointer transition">FAQs</li>
                            <li className="hover:text-yellow-400 cursor-pointer transition">Shipping</li>
                            <li className="hover:text-yellow-400 cursor-pointer transition">Returns</li>
                            <li className="hover:text-yellow-400 cursor-pointer transition">Privacy Policy</li>
                        </ul>
                    </div>

                    {/* Newsletter */}
                    <div>
                        <h3 className="text-lg font-semibold mb-4">Subscribe</h3>
                        <div className="flex">
                            <input
                                type="email"
                                placeholder="Your email"
                                className="w-full px-3 py-2 rounded-l-md text-black focus:outline-none"
                            />
                            <button className="bg-yellow-500 hover:bg-yellow-400 text-black px-4 py-2 rounded-r-md font-semibold transition">
                                Join
                            </button>
                        </div>
                    </div>
                </div>

                {/* Bottom Bar */}
                <div className="border-t border-slate-700">
                    <div className="max-w-7xl mx-auto px-6 py-4 flex flex-col md:flex-row justify-between items-center text-sm text-gray-400">
                        <p className="capitalize">© {new Date().getFullYear()} developed by aun ali.</p>
                        <div className="flex space-x-4 mt-2 md:mt-0">
                            <span className="hover:text-yellow-400 cursor-pointer transition">Terms</span>
                            <span className="hover:text-yellow-400 cursor-pointer transition">Privacy</span>
                        </div>
                    </div>
                </div>
            </footer>
        </>
    )
}
export default Footer 