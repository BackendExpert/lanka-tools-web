import React, { useEffect, useState } from "react";
import { NavLink, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown } from "lucide-react";

import defaultUser from "../../assets/User.png";
import { useAuth } from "../../context/AuthContext";
import { menus } from "./menus";
import { MdSchool } from "react-icons/md";
import API from "../../services/api";
import { FaTools } from "react-icons/fa";

import './DashSide.css'

const DashSide = ({ closeSidebar }) => {
    const { auth } = useAuth();
    const location = useLocation();
    const token = localStorage.getItem('access_token')

    const [openMenu, setOpenMenu] = useState(null);
    const [myprofile, setMyProfile] = useState(null);
    const sections = menus[auth?.role] || [];

    useEffect(() => {
        const activeMenu = sections
            .flatMap((section) => section.items)
            .find((item) =>
                item.submenu?.some((sub) =>
                    location.pathname.startsWith(sub.link)
                )
            );

        if (activeMenu) {
            setOpenMenu(activeMenu.name);
        }
    }, [location.pathname, auth?.role]);

    const toggleMenu = (name) => {
        setOpenMenu((prev) => (prev === name ? null : name));
    };

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

    return (
        // <aside className="h-screen w-72 bg-white border-r border-gray-200 flex flex-col px-4 py-5 overflow-y-auto">
        <aside className="h-screen w-72 bg-white border-r border-gray-200 flex flex-col px-4 py-5 overflow-y-auto custom-scrollbar">
            {/* BRAND */}
            <div className="mb-10 px-2">

                <div className="flex items-center gap-3">

                    <div className="flex items-center justify-center w-10 h-10 bg-yellow-400 text-black">
                        <FaTools className="w-5 h-5" />
                    </div>

                    <div className="leading-tight">

                        <p className="text-base font-black tracking-tight text-gray-900">
                            LankaTools
                        </p>

                        <p className="text-[10px] font-semibold uppercase tracking-wider text-gray-400">
                            Rental Management
                        </p>

                    </div>

                </div>

            </div>


            {/* MENUS */}
            <div className="flex-1 space-y-7">

                {sections.map((section) => (

                    <div key={section.section}>

                        <p className="px-2 mb-3 text-[10px] font-bold uppercase tracking-[0.2em] text-gray-400">
                            {section.section}
                        </p>

                        <div className="space-y-1">

                            {section.items.map((item) => {

                                const activeSubmenu = item.submenu?.some(
                                    (sub) =>
                                        location.pathname.startsWith(sub.link)
                                );

                                const isOpen =
                                    openMenu === item.name || activeSubmenu;

                                return (
                                    <div key={item.name}>

                                        {item.submenu ? (

                                            <>

                                                <button
                                                    onClick={() =>
                                                        toggleMenu(item.name)
                                                    }
                                                    className={`relative w-full flex items-center justify-between px-3 py-2.5 transition-all duration-200 ${isOpen
                                                            ? "bg-yellow-400 text-black"
                                                            : "text-gray-600 hover:bg-gray-50 hover:text-black"
                                                        }`}
                                                >

                                                    <div className="flex items-center gap-3">

                                                        <span
                                                            className={`flex items-center justify-center w-8 h-8 transition ${isOpen
                                                                    ? "bg-black text-yellow-400"
                                                                    : "bg-gray-100 text-gray-600"
                                                                }`}
                                                        >
                                                            {item.icon}
                                                        </span>

                                                        <span className="text-sm font-semibold">
                                                            {item.name}
                                                        </span>

                                                    </div>

                                                    <ChevronDown
                                                        className={`w-4 h-4 transition-transform duration-200 ${isOpen
                                                                ? "rotate-180"
                                                                : ""
                                                            }`}
                                                    />

                                                </button>


                                                <AnimatePresence>

                                                    {isOpen && (

                                                        <motion.div
                                                            initial={{
                                                                opacity: 0,
                                                                height: 0,
                                                            }}
                                                            animate={{
                                                                opacity: 1,
                                                                height: "auto",
                                                            }}
                                                            exit={{
                                                                opacity: 0,
                                                                height: 0,
                                                            }}
                                                            className="ml-5 mt-1 pl-6 border-l border-gray-200 space-y-1 overflow-hidden"
                                                        >

                                                            {item.submenu.map(
                                                                (sub) => (

                                                                    <NavLink
                                                                        key={sub.link}
                                                                        to={sub.link}
                                                                        onClick={() => {
                                                                            window.scrollTo({
                                                                                top: 0,
                                                                                behavior: "smooth",
                                                                            });

                                                                            closeSidebar?.();
                                                                        }}
                                                                        className={({ isActive }) =>
                                                                            `block px-3 py-2 text-sm transition-all duration-200 ${isActive
                                                                                ? "bg-gray-900 text-yellow-400 font-semibold"
                                                                                : "text-gray-500 hover:bg-gray-50 hover:text-black"
                                                                            }`
                                                                        }
                                                                    >
                                                                        {sub.name}
                                                                    </NavLink>

                                                                )
                                                            )}

                                                        </motion.div>

                                                    )}

                                                </AnimatePresence>

                                            </>

                                        ) : (

                                            <NavLink
                                                to={item.link}
                                                onClick={() => {
                                                    window.scrollTo({
                                                        top: 0,
                                                        behavior: "smooth",
                                                    });

                                                    closeSidebar?.();
                                                }}
                                                className={({ isActive }) =>
                                                    `relative flex items-center gap-3 px-3 py-2.5 transition-all duration-200 ${isActive
                                                        ? "bg-yellow-400 text-black"
                                                        : "text-gray-600 hover:bg-gray-50 hover:text-black"
                                                    }`
                                                }
                                            >

                                                {({ isActive }) => (

                                                    <>

                                                        <span
                                                            className={`flex items-center justify-center w-8 h-8 transition ${isActive
                                                                    ? "bg-black text-yellow-400"
                                                                    : "bg-gray-100 text-gray-600"
                                                                }`}
                                                        >
                                                            {item.icon}
                                                        </span>

                                                        <span className="text-sm font-semibold">
                                                            {item.name}
                                                        </span>

                                                    </>

                                                )}

                                            </NavLink>

                                        )}

                                    </div>

                                );

                            })}

                        </div>

                    </div>

                ))}

            </div>


            {/* USER */}
            <div className="mt-6">

                <div className="flex items-center gap-3 p-3 border border-gray-200 bg-gray-50">

                    <img
                        src={
                            myprofile?.profile_img
                                ? `${import.meta.env.VITE_APP_API_FILES}/uploads/profile/${myprofile.profile_img}`
                                : defaultUser
                        }
                        alt="User"
                        className="w-10 h-10 object-cover"
                    />

                    <div className="flex-1 min-w-0">

                        <p className="text-sm font-bold text-gray-800 truncate">
                            {auth?.user?.username || "User"}
                        </p>

                        <p className="text-[10px] font-bold uppercase tracking-wider text-yellow-600">
                            {auth?.role}
                        </p>

                    </div>

                </div>

            </div>

        </aside>
    );
};

export default DashSide;