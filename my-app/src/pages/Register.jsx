import { Link, useNavigate } from "react-router-dom"
import { supabase } from "../services/supabaseClient"
import { useState } from "react"

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
                alert(error)
                setLoading(false)
                return
            }
            alert("Account created successfully.")
            setName("")
            setEmail("")
            setPass("")
            navigate("/")
        }
        catch (err) {
            console.log("error in signup function");
        }

    }
    return (
        <>
            <div id="reg-container">
                <h1>Register yourself</h1>
                <form id="form" onSubmit={RegisterUser}>
                    Enter your name: <input type="text" value={name} onChange={(e) => { setName(e.target.value) }} placeholder="enter your name" disabled={loading} /><br />
                    Enter your email: <input type="email" value={email} onChange={(e) => { setEmail(e.target.value) }} placeholder="enter your email" disabled={loading} /><br />
                    Enter your password: <input type="password" value={pass} onChange={(e) => { setPass(e.target.value)}} placeholder="enter your password" disabled={loading} /><br />
                <button type="submit" disabled={loading}>{loading ? "Registering..." : "Register"}</button>
                </form>
                <p>already registered? <Link to="/">login</Link></p>
            </div>
        </>
    )
}
export default CreateAcc