import { Outlet, Navigate } from "react-router"
import { useAuthStore } from "../stores/authStore"

export const ProtectedRoute = () => {
    const { user, isLoading } = useAuthStore()

    if (isLoading) {
        return <div>جاري التحقق من حالة المستخدم...</div>
    }
    if (!user) {
        return <Navigate to="/login" replace />
    }
    return <Outlet />

}