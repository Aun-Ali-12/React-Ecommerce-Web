import { Navigate } from "react-router-dom";
import { useAuthCheck } from "../../Context/AuthCheck";


const AdminGuard = ({ children }) => {
    const { isAdmin, loading } = useAuthCheck();

    if (loading) return 'Checking permission'

    if (!isAdmin) {
        return <Navigate to='/' replace />
    }

    return children;

}
export default AdminGuard