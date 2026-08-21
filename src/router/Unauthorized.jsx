import React, { useEffect, useState } from "react";
import { MdLockOutline } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import API from "../services/api";

const Unauthorized = () => {
    const navigate = useNavigate();
    const [countdown, setCountdown] = useState(5);

    useEffect(() => {
        const token = localStorage.getItem("access_token");

        if (!token) {
            navigate("/", { replace: true });
            return;
        }

        const timer = setInterval(() => {
            setCountdown((prev) => {
                if (prev <= 1) {
                    clearInterval(timer);

                    localStorage.removeItem("access_token");
                    localStorage.removeItem("refresh_token");

                    navigate("/", { replace: true });

                    return 0;
                }

                return prev - 1;
            });
        }, 1000);

        return () => clearInterval(timer);
    }, [navigate]);

    const handleUnauthorized = async () => {
        try {
            const token = localStorage.getItem("access_token");

            const res = await API.post(
                "/auth/unauthorized-attempt",
                {},
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );

            if (res.data.success === true) {
                localStorage.removeItem("access_token");
                localStorage.removeItem("refresh_token");

                navigate("/", { replace: true });
            }
        } catch (err) {
            localStorage.removeItem("access_token");
            localStorage.removeItem("refresh_token");

            navigate("/", { replace: true });
        }
    };

    return (
        <div className="relative min-h-screen flex items-center justify-center px-4 bg-[#0f0f0f] overflow-hidden">

            <div className="absolute top-[-150px] left-[-150px] w-[450px] h-[450px] bg-yellow-400/10 blur-[120px]" />

            <div className="absolute bottom-[-150px] right-[-150px] w-[450px] h-[450px] bg-yellow-400/10 blur-[120px]" />

            <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:50px_50px]" />

            <div className="relative w-full max-w-md border border-white/10 bg-[#292929]/80 backdrop-blur-2xl p-8 sm:p-10 shadow-2xl">

                <div className="flex justify-center mb-6">
                    <div className="flex items-center justify-center w-20 h-20 bg-yellow-400">
                        <MdLockOutline
                            size={46}
                            className="text-black"
                        />
                    </div>
                </div>

                <div className="text-center">

                    <p className="text-xs font-bold uppercase tracking-[0.3em] text-yellow-400">
                        Access Restricted
                    </p>

                    <h1 className="mt-3 text-3xl sm:text-4xl font-black text-white">
                        Unauthorized Access
                    </h1>

                    <p className="mt-5 text-sm leading-7 text-white/60">
                        You don't have permission to access this page.
                        Any unauthorized attempts are being recorded.
                    </p>

                    <p className="mt-3 text-sm leading-7 text-white/60">
                        Please login with the correct credentials or
                        contact the administrator.
                    </p>

                </div>

                <div className="mt-8 border-t border-white/10 pt-6 text-center">

                    <p className="text-xs uppercase tracking-widest text-white/40">
                        Redirecting to login
                    </p>

                    <div className="mt-2">
                        <span className="text-5xl font-black text-yellow-400">
                            {countdown}
                        </span>
                    </div>

                    <p className="mt-2 text-xs text-white/30">
                        Your session will be cleared automatically
                    </p>

                </div>

                <button
                    onClick={handleUnauthorized}
                    className="mt-8 w-full bg-yellow-400 px-6 py-3.5 text-sm font-bold text-black transition-all duration-300 hover:bg-yellow-300 hover:shadow-[0_0_30px_rgba(250,204,21,0.15)]"
                >
                    Logout & Go Back
                </button>

            </div>

        </div>
    );
};

export default Unauthorized;