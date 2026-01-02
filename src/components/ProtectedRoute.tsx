import { Navigate, Outlet } from "react-router-dom";

interface ProtectedRouteProps {
    allowedRoles: string[];
}

export function ProtectedRoute({ allowedRoles }: ProtectedRouteProps) {
    const userRole = localStorage.getItem("userRole") || "/secretary";

    if (!allowedRoles.includes(userRole)) {
        return <Navigate to="/dashboard/denied" replace />;
    }

    return <Outlet />;
}
