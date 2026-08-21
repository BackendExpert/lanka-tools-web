import React, { useState, useEffect, useRef } from "react";
import {
    FiBell,
    FiMenu,
    FiX,
    FiUser,
    FiLogOut,
    FiSettings
} from "react-icons/fi";
import { motion, AnimatePresence } from "framer-motion";
import defultUser from "../../assets/User.png";
import { useAuth } from "../../context/AuthContext";
import { Link, useNavigate } from "react-router-dom";
import DashSide from "./DashSide";
import API from "../../services/api";

const DashNav = () => {
    const navigate = useNavigate();
    const token = localStorage.getItem('access_token')
    const { auth } = useAuth();
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const [searchOpen, setSearchOpen] = useState(false);
    const [mobileOpen, setMobileOpen] = useState(false);
    const [myprofile, setMyProfile] = useState(null);

    const dropdownRef = useRef(null);

    const headleLogout = async (e) => {
        e.preventDefault();

        try {
            const res = await API.post('/auth/logout', {
                headers: {
                    Authorization: `Bearer ${token}`,
                }
            })

            if (res.data.success === true) {
                localStorage.removeItem('access_token')
                localStorage.removeItem('refresh_token')
                window.location.reload()
            }
        }
        catch (err) {
            console.log(err)
            localStorage.removeItem("access_token");
            localStorage.removeItem("refresh_token")
        }
    }

    useEffect(() => {
        const fetchProfile = async () => {
            try {
                const res = await API.get('/profile/profile-data', {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });

                if (res.data.success) {
                    setMyProfile(res.data.result);
                }

            } catch (err) {
                console.log(err.response?.data || err.message);
            }
        };

        if (token) {
            fetchProfile();
        }

    }, [token]);

    useEffect(() => {
        const handleClickOutside = (e) => {
            if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
                setDropdownOpen(false);
            }
        };

        document.addEventListener("mousedown", handleClickOutside);

        return () =>
            document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    return (
        <>
            <motion.header
                initial={{ y: -40, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                className="sticky top-0 z-30 w-full bg-white/95 backdrop-blur-xl border-b border-gray-200"
            >
                <div className="flex items-center justify-between px-4 md:px-8 h-16 xl:pl-[20rem]">

                    <div className="flex items-center gap-4">

                        <button
                            onClick={() => setMobileOpen(!mobileOpen)}
                            className="p-2 text-gray-700 hover:text-black hover:bg-yellow-400 transition xl:hidden"
                        >
                            {mobileOpen ? <FiX size={20} /> : <FiMenu size={20} />}
                        </button>

                        <div>
                            <h1 className="text-base font-bold text-gray-900">
                                Dashboard
                            </h1>

                            <p className="text-xs text-gray-500">
                                Welcome back
                                <span className="ml-1 text-yellow-500">
                                    👋
                                </span>
                            </p>
                        </div>

                    </div>

                    <div
                        className="flex items-center gap-2"
                        ref={dropdownRef}
                    >

                        <div className="relative">

                            <button
                                onClick={() => setDropdownOpen(!dropdownOpen)}
                                className="ml-2 flex items-center gap-2 p-1.5 border border-transparent hover:border-gray-200 hover:bg-gray-50 transition"
                            >
                                <img
                                    src={
                                        myprofile?.profile_img
                                            ? `${import.meta.env.VITE_APP_API_FILES}/uploads/profile/${myprofile.profile_img}`
                                            : defultUser
                                    }
                                    alt="Profile"
                                    className="w-9 h-9 object-cover rounded-full"
                                />

                                <div className="hidden sm:block text-left mr-1">
                                    <p className="text-sm font-semibold text-gray-800 max-w-[120px] truncate">
                                        {auth?.user?.username || "User"}
                                    </p>

                                    <p className="text-[10px] uppercase tracking-wider text-yellow-600 font-bold">
                                        {auth?.role || "Role"}
                                    </p>
                                </div>
                            </button>

                            <AnimatePresence>
                                {dropdownOpen && (
                                    <motion.div
                                        initial={{ opacity: 0, y: -15 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        exit={{ opacity: 0, y: -15 }}
                                        transition={{
                                            type: "spring",
                                            stiffness: 300,
                                            damping: 30
                                        }}
                                        className="absolute right-0 mt-3 w-72 bg-white/95 backdrop-blur-xl border border-gray-200 shadow-2xl overflow-hidden z-50"
                                    >

                                        <div className="flex items-center gap-3 p-4 border-b border-gray-200">

                                            <div className="relative">

                                                <img
                                                    src={
                                                        myprofile?.profile_img
                                                            ? `${import.meta.env.VITE_APP_API_FILES}/uploads/profile/${myprofile?.profile_img}`
                                                            : defultUser
                                                    }
                                                    alt="User"
                                                    className="w-12 h-12 object-cover border border-gray-200"
                                                />

                                                <span className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-yellow-400 border-2 border-white" />

                                            </div>

                                            <div className="flex-1 min-w-0">

                                                <p className="font-bold text-gray-900 truncate">
                                                    {auth?.user?.username || "User"}
                                                </p>

                                                <p className="text-xs text-yellow-600 font-semibold uppercase tracking-wide truncate">
                                                    {auth?.role || "Role"}
                                                </p>

                                                <p className="text-xs text-gray-400 truncate">
                                                    {auth?.user?.email || "user@example.com"}
                                                </p>

                                            </div>

                                        </div>

                                        <div className="py-3 px-3 grid grid-cols-2 gap-2 border-b border-gray-200">

                                            <Link
                                                to="/Dashboard/my-profile"
                                                className="flex items-center justify-center gap-2 px-2 py-2.5 bg-gray-50 text-gray-700 hover:bg-yellow-400 hover:text-black transition text-sm font-semibold"
                                            >
                                                <FiUser className="w-4 h-4" />
                                                Profile
                                            </Link>

                                            <Link
                                                to="/Dashboard/my-profile"
                                                className="flex items-center justify-center gap-2 px-2 py-2.5 bg-gray-50 text-gray-700 hover:bg-yellow-400 hover:text-black transition text-sm font-semibold"
                                            >
                                                <FiSettings className="w-4 h-4" />
                                                Settings
                                            </Link>

                                        </div>

                                        <div className="py-2">

                                            <Link
                                                to="/Dashboard/notifications"
                                                className="flex items-center gap-3 w-full text-left px-4 py-3 text-gray-600 hover:bg-yellow-50 hover:text-black transition text-sm font-semibold"
                                            >
                                                <FiBell className="w-4 h-4" />
                                                Notifications
                                            </Link>

                                            <button
                                                onClick={headleLogout}
                                                className="flex items-center gap-3 w-full text-left px-4 py-3 text-gray-600 hover:bg-yellow-400 hover:text-black transition text-sm font-semibold"
                                            >
                                                <FiLogOut className="w-4 h-4" />
                                                Logout
                                            </button>

                                        </div>

                                    </motion.div>
                                )}
                            </AnimatePresence>

                        </div>

                    </div>

                </div>
            </motion.header>

            <AnimatePresence>
                {searchOpen && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 bg-black/30 backdrop-blur-sm z-50 flex items-start justify-center pt-24 px-4"
                        onClick={() => setSearchOpen(false)}
                    >
                        <motion.div
                            initial={{ y: -30, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            exit={{ y: -30, opacity: 0 }}
                            className="bg-white w-full max-w-lg border border-gray-200 p-5 shadow-2xl"
                            onClick={(e) => e.stopPropagation()}
                        >
                            <input
                                autoFocus
                                placeholder="Search anything..."
                                className="w-full p-3 border border-gray-300 outline-none text-gray-800 focus:border-yellow-400 focus:ring-1 focus:ring-yellow-400"
                            />
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>

            <div className="hidden xl:flex fixed top-0 left-0 z-50 h-screen w-72">
                <DashSide />
            </div>

            <AnimatePresence>
                {mobileOpen && (
                    <div className="xl:hidden">

                        <motion.div
                            initial={{ x: -300 }}
                            animate={{ x: 0 }}
                            exit={{ x: -300 }}
                            className="fixed top-0 left-0 z-50 h-screen w-72 shadow-2xl"
                        >
                            <DashSide closeSidebar={() => setMobileOpen(false)} />
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 0.4 }}
                            exit={{ opacity: 0 }}
                            className="fixed inset-0 bg-black z-40"
                            onClick={() => setMobileOpen(false)}
                        />

                    </div>
                )}
            </AnimatePresence>
        </>
    );
};

export default DashNav;