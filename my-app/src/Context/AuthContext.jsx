import { createContext, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "../services/supabaseClient";
import { toast } from "react-toastify";

const UserContext = createContext(null);
export const UserProvider = ({ children }) => {
    const [session, setSession] = useState(null)
    const navigate = useNavigate();

    useEffect(() => {
        getSession();
    }, [])

    async function getSession() {
        try {
            const { data, error } = await supabase.auth.getSession()
            if (error) {
                console.log("user session null");
                setSession(null)
                return;
            }
            setSession(data.session)
        }
        catch (err) {
            setSession(null)
            console.log(err, "Error while fetching session");
        }
    }

    const signOut = async () => {
        try {
            const { error } = await supabase.auth.signOut()
            if (error) {
                toast.error("something went wrong, try again")
                return
            }
            toast.success("Logging out.")
            navigate('/')
        }
        catch (err) {
            console.log("User loggedout");
        }
    }
    return (
        <UserContext.Provider value={{ session, signOut }}>
            {children}
        </UserContext.Provider>
    )
}
export const useSession = () => useContext(UserContext)