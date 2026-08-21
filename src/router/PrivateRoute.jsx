import { useState, useEffect } from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const PrivateRoute = ({ children, roles }) => {
    const { auth } = useAuth();
    const [isChecking, setIsChecking] = useState(true);

    useEffect(() => {
        const token = localStorage.getItem("access_token");
        if (token) {
            setIsChecking(false);
        } else {
            setIsChecking(false);
        }
    }, []);

    if (isChecking) {
        return null;
    }

    if (!auth.accessToken) {
        return <Navigate to="/" replace />;
    }

    if (roles && !roles.includes(auth.role)) {
        return <Navigate to="/unauthorized" />;
    }

    return children;
};

export default PrivateRoute;