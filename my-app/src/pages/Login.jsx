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
    const LoginAcc = () => {
        LoginUser()
    }

    //function to perform signup 
    async function LoginUser() {

        // checking if any input is empty then shouldn't proceed further  
        if (!email || !pass) {
            alert("fill all the fields")
            return
        }

        //formatting the name
        const splitName = name.split(" ")
        const formatName = (splitName.map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())).join(" ")

        try {
            setLoading(true)
            const { error } = await supabase.auth.signInWithPassword({
                email: email.trim(),
                password: pass.trim(),
            })

            if (error) {
                alert(error)
                setLoading(false)
                return
            }
            alert("Logged in successfull.")
            setName("")
            setEmail("")
            setPass("")
        }
        catch (err) {
            console.log("error in LoginUser function");
        }

    }
    return (
        <>
            <div id="reg-container">
                <h1>Login to your account</h1>
                <div id="form">
                    Enter your email: <input type="email" value={email} onChange={(e) => { setEmail(e.target.value) }} placeholder="enter your email" disabled={loading} /><br />
                    Enter your password: <input type="password" value={pass} onChange={(e) => { setPass(e.target.value) }} placeholder="enter your password" disabled={loading} /><br />
                </div>
                <button onClick={LoginAcc} disabled={loading}>{loading ? "Registering..." : "Register"}</button>
                <p>already registered? <Link to="/">login</Link></p>
            </div>
        </>
    )
}
export default Login