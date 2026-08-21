import { createContext, useContext, useState, useEffect } from "react";
import { jwtDecode } from "jwt-decode";
import { useNavigate } from "react-router-dom";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {

    const [auth, setAuth] = useState({
        accessToken: null,
        id: null,
        user: null,
        role: null,
        tenant: null,
    });

    useEffect(() => {
        const accessToken = localStorage.getItem("access_token");


        if (accessToken) {
            try {
                const decoded = jwtDecode(accessToken);

                const email = decoded.email || "";
                const username = email.split("@")[0];

                setAuth({
                    accessToken,
                    id: decoded.sub,
                    user: {
                        id: decoded.sub,
                        email,
                        username,
                    },
                    role: decoded.role,
                    tenant: decoded.tenant,
                });

            } catch (error) {
                localStorage.removeItem("access_token");
                localStorage.removeItem("refresh_token");
            }
        }
    }, []);


    const login = (
        accessToken,
        refreshToken
    ) => {
        const decoded = jwtDecode(accessToken);

        const email = decoded.email || "";
        const username = email.split("@")[0];


        localStorage.setItem(
            "access_token",
            accessToken
        );

        localStorage.setItem(
            "refresh_token",
            refreshToken
        );

        setAuth({
            accessToken,
            id: decoded.sub,
            user: {
                id: decoded.sub,
                email,
                username,
            },
            role: decoded.role,
            tenant: decoded.tenant,
        });
    };

    const updateAccessToken = (
        newAccessToken
    ) => {

        const decoded = jwtDecode(newAccessToken);

        const email = decoded.email || "";

        const username = email.split("@")[0];

        localStorage.setItem(
            "access_token",
            newAccessToken
        );


        setAuth({
            accessToken: newAccessToken,
            id: decoded.sub,
            user: {
                id: decoded.sub,
                email,
                username,
            },
            role: decoded.role,
            tenant: decoded.tenant,
        });
    };

    const logout = (navigate) => {
        localStorage.removeItem(
            "access_token"
        );

        localStorage.removeItem(
            "refresh_token"
        );

        setAuth({
            accessToken: null,
            id: null,
            user: null,
            role: null,
            tenant: null,
        });

        navigate(
            "/login",
            {
                replace: true
            }
        );
    };

    return (
        <AuthContext.Provider
            value={{
                auth,
                login,
                logout,
                updateAccessToken
            }}
        >
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);