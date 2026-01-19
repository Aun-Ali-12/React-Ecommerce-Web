import { Link, useNavigate } from "react-router-dom"
import { supabase } from "../services/supabaseClient"
import { useState } from "react"
import { toast } from "react-toastify"
import FormImg from '../assets/FormImg.jpg'

function CreateAcc() {

    //states to handle data
    const [name, setName] = useState("")
    const [email, setEmail] = useState("")
    const [pass, setPass] = useState("")
    const [loading, setLoading] = useState(false)

    //use to navigate to any specific page
    const navigate = useNavigate()

    // to validate password 
    const capLetter = /[A-Z]/
    const specialChar = /[!@#$%^&*]/

    // register user on click button (Register)
    const RegisterUser = (e) => {
        e.preventDefault();
        signUp()
    }

    //function to perform signup 
    async function signUp() {

        // checking if any input is empty then shouldn't proceed further  
        if (!name || !email || !pass) {
            alert("fill all the fields")
            return
        }

        // checking if pass doesnot carry Cap Letter then shouldn't proceed further  
        if (!capLetter.test(pass)) {
            alert("Enter atleast one capital letter")
            return
        }

        // checking if pass doesnot carry special char then shouldn't proceed further  
        if (!specialChar.test(pass)) {
            alert("Enter atleast one special char")
            return
        }

        //formatting the name
        const splitName = name.split(" ")
        const formatName = (splitName.map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())).join(" ")

        try {
            setLoading(true)
            const { error } = await supabase.auth.signUp({
                email: email.trim().toLowerCase(),
                password: pass.trim(),
                options: {
                    data: {
                        user_name: formatName
                    }
                }
            })

            if (error) {
                setLoading(false)
                toast.error('Something went wrong, try again!')
                return
            }
            toast.success('User successfully registered.')
            setName("")
            setEmail("")
            setPass("")
            navigate("/login")
        }
        catch (err) {
            console.log("error in signup function");
        }

        //manuallay inserting new user in to user table
        const { data: { user } } = await supabase.auth.getUser()
        if (user) {
            console.log(user);
        }
        const userName = user.user_metadata.user_name
        const userEmail = user.user_metadata.email
        const userId = user.id

        try {
            const { error } = await supabase
                .from('users')
                .insert({ id: userId, user_name: userName, user_email: userEmail, is_admin: false })

            if (error) {
                console.log(error.message);
                return
            }
            console.log("user inserted manually after signing up");
        }
        catch (err) {
            console.log(err, "error while inserting user manuallay after signing up");
        }
    }
    return (
        <>
            <div className="min-h-screen bg-white grid grid-cols-1 md:grid-cols-2 animate-fadeInUp">
                {/* Left Side – Form */}
                <div className="hidden md:block h-screen scale-x-[-1]">
                    <img
                        src={FormImg}
                        alt="Ecommerce App"
                        className="w-full h-full object-cover"
                    />
                </div>

                {/* Right Side – Image (Full Height) */}
                <div className="flex items-center justify-center px-6 md:px-16 border">
                    <div className="w-full max-w-md">
                        <h1 className="text-3xl font-bold text-blue-500 mb-6">
                            Login to your account
                        </h1>

                        <form onSubmit={RegisterUser} className="space-y-4">
                            <div>
                                <label className="block text-black mb-1">
                                    Enter your name
                                </label>
                                <input
                                    type="text"
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                    placeholder="Enter your name"
                                    disabled={loading}
                                    className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                />
                            </div>

                            <div>
                                <label className="block text-black mb-1">
                                    Enter your email
                                </label>
                                <input
                                    type="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    placeholder="Enter your email"
                                    disabled={loading}
                                    className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                />
                            </div>

                            <div>
                                <label className="block text-black mb-1">
                                    Enter your password
                                </label>
                                <input
                                    type="password"
                                    value={pass}
                                    onChange={(e) => setPass(e.target.value)}
                                    placeholder="Enter your password"
                                    disabled={loading}
                                    className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                />
                            </div>

                            <button
                                disabled={loading}
                                className="w-full bg-blue-500 text-white py-2 rounded-lg font-semibold hover:bg-blue-600 transition disabled:opacity-60 disabled:cursor-not-allowed"
                            >
                                {loading ? "Registering user..." : "Register"}
                            </button>
                        </form>

                        <p className="text-black mt-4 text-sm">
                            Already registered?
                            <Link
                                to="/login"
                                className="text-blue-500 font-medium hover:underline"
                            >
                                Login
                            </Link>
                        </p>
                    </div>
                </div>
            </div>
        </>
    )
}
export default CreateAcc