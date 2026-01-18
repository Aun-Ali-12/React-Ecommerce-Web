import { createContext, useContext, useEffect, useState } from "react";
import { supabase } from "../services/supabaseClient";

const UserContext = createContext(null);
export const UserProvider = ({ children }) => {
    const [session, setSession] = useState(null)

    useEffect(() => {
        getSession();
    }, [])

    async function getSession() {
        try {
            const { data, error } = await supabase.auth.getSession()
            console.log(data);
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
    return (
        <UserContext.Provider value={{ session }}>
            {children}
        </UserContext.Provider>
    )
}
export const useSession = () => useContext(UserContext)