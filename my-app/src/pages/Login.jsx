import { Link, useNavigate } from "react-router-dom"
import { supabase } from "../services/supabaseClient"
import { useState } from "react"
import FormImg from '../assets/FormImg.jpg'
import { toast } from "react-toastify"

function Login() {
    //states to handle data
    const [name, setName] = useState("")
    const [email, setEmail] = useState("")
    const [pass, setPass] = useState("")
    const [loading, setLoading] = useState(false)

    //use to navigate to any specific page
    const navigate = useNavigate()

    // register user on click button (Register)
    const LoginAcc = (e) => {
        e.preventDefault();
        LoginUser();
    }

    //function to perform signup 
    async function LoginUser() {

        // checking if any input is empty then shouldn't proceed further  
        if (!email || !pass) {
            toast.warning("fill all the fields")
            return
        }

        setLoading(true)
        try {
            const { error } = await supabase.auth.signInWithPassword({
                email: email.trim(),
                password: pass.trim(),
            })
            if (error) {
                setLoading(false)
                toast.error('Something went wrong, try again!')
                return
            }

            const { data: { user } } = await supabase.auth.getUser()
            let userId = user.id
            const { data, error: dbError } = await supabase
                .from("users")
                .select("is_admin")
                .eq("id", userId)
                .single()

            if (dbError || !data) {
                toast.error('Failed to fetch user')
                return
            }
            toast.success('Logged in successfully', {
                autoClose: 2000
            })
            navigate(data.is_admin ? '/admin/dashboard' : '/')
        }
        catch (err) {
            console.error("error in LoginUser function");
            toast.error('Unexpected error occured')
        }
        finally {
            setLoading(false)
        }

    }
    return (
        <>
            <div className="min-h-screen bg-white grid grid-cols-1 md:grid-cols-2 animate-fadeInUp">
                {/* Left Side – Form */}
                <div className="flex items-center justify-center px-6 md:px-16 border">
                    <div className="w-full max-w-md">
                        <h1 className="text-3xl font-bold text-blue-500 mb-6">
                            Login to your account
                        </h1>

                        <form onSubmit={LoginAcc} className="space-y-4">
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
                                {loading ? "Logging in..." : "Log in"}
                            </button>
                        </form>

                        <p className="text-black mt-4 text-sm">
                            Already registered?{" "}
                            <Link
                                to="/signup"
                                className="text-blue-500 font-medium hover:underline"
                            >
                                Signup
                            </Link>
                        </p>
                    </div>
                </div>

                {/* Right Side – Image (Full Height) */}
                <div className="hidden md:block h-screen">
                    <img
                        src={FormImg}
                        alt="Ecommerce App"
                        className="w-full h-full object-cover"
                    />
                </div>
            </div>
        </>
    )
}
export default Login