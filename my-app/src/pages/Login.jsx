import { Link, useNavigate } from "react-router-dom"
import { supabase } from "../services/supabaseClient"
import { useState } from "react"

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
            alert("fill all the fields")
            return
        }

        try {
            setLoading(true)
            const { error } = await supabase.auth.signInWithPassword({
                email: email.trim(),
                password: pass.trim(),
            })
            if (error) {
                setLoading(false)
                alert("Processing failed, try again!")
                return
            }
            try {
                const { data: { user } } = await supabase.auth.getUser()
                let userId = user.id
                const { data } = await supabase
                    .from("users")
                    .select("*")
                    .eq("id", userId)
                alert("Logged in successfull.")

                const adminState = data[0].is_admin
                console.log(adminState);

                if (adminState) {
                    console.log(data);
                    navigate("/admin")
                } else {
                    console.log(data);
                    navigate("/home")
                    setLoading(false)
                }
            }
            catch (err) {
                console.log("Error in admin false");
            }
            setName("")
            setEmail("")
            setPass("")
            setLoading(false)
        }
        catch (err) {
            console.log("error in LoginUser function");
        }

    }
    return (
        <>
            <div id="reg-container">
                <h1>Login to your account</h1>
                <form onSubmit={LoginAcc} id="form">
                    Enter your email: <input type="email" value={email} onChange={(e) => { setEmail(e.target.value) }} placeholder="enter your email" disabled={loading} /><br />
                    Enter your password: <input type="password" value={pass} onChange={(e) => { setPass(e.target.value) }} placeholder="enter your password" disabled={loading} /><br />
                    <button disabled={loading}>{loading ? "Logging in..." : "Log in"}</button>
                </form>
                <p>already registered? <Link to="/signup">Signup</Link></p>
            </div>
        </>
    )
}
export default Login