import { createContext, useContext, useEffect, useState } from "react";
import { supabase } from "../services/supabaseClient";
import { toast } from "react-toastify";

const AuthContext = createContext();
export const AuthCheckProvider = ({ children }) => {
    const [isAdmin, setIsAdmin] = useState(false);
    const [loading, setLoading] = useState(true);


    useEffect(() => {
        CheckAuth();
        console.log(isAdmin);
    }, [])

    useEffect(() => {
        console.log(isAdmin);
    }, [isAdmin])

    async function CheckAuth() {
        try {
            const { data, error } = await supabase.auth.getSession()

            if (error) throw error;
            const user = data.session?.user

            if (!user) {
                isAdmin(false)
                return
            }

            const userId = user.id

            const { data: userData, error: Error } = await supabase
                .from('users')
                .select("is_admin")
                .eq("id", userId)
                .single()

            if (Error || !userData) {
                toast.error('Failed to fetch user status')
                setIsAdmin(false)
                return
            }
            setIsAdmin(userData.is_admin === true)
            setLoading(false);
        }
        catch (err) {
            console.log("Error in authcheck");
            setIsAdmin(false)
        }
    }
    return (
        <AuthContext.Provider value={{ isAdmin, CheckAuth, loading }}>
            {children}
        </AuthContext.Provider>
    )
}
export const useAuthCheck = () => useContext(AuthContext)