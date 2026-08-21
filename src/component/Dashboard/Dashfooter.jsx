import React from "react";
import {
    FaTwitter,
    FaLinkedin,
    FaGithub,
    FaTools,
    FaArrowRight,
} from "react-icons/fa";
import { MdOutlineBuild } from "react-icons/md";

const DashFooter = () => {
    const year = new Date().getFullYear();

    const quickLinks = [
        { name: "Dashboard", href: "/dashboard" },
        { name: "My Rentals", href: "/dashboard/my-rentals" },
        { name: "Rental Guide", href: "/dashboard/rental-guide" },
        { name: "Notifications", href: "/dashboard/notifications" },
        { name: "Support", href: "/dashboard/support" },
    ];

    const socials = [
        { icon: <FaTwitter />, href: "https://twitter.com" },
        { icon: <FaLinkedin />, href: "https://linkedin.com" },
        { icon: <FaGithub />, href: "https://github.com" },
    ];

    return (
        <footer className="bg-white border-t border-gray-200 mt-10">

            <div className="max-w-7xl mx-auto px-6 md:px-8 py-14">

                <div className="grid grid-cols-1 md:grid-cols-3 gap-12 lg:gap-20">

                    {/* BRAND */}
                    <div className="space-y-5">

                        <div className="flex items-center gap-4">

                            <div className="w-12 h-12 flex items-center justify-center bg-yellow-400 text-black">
                                <MdOutlineBuild size={28} />
                            </div>

                            <div>
                                <h1 className="text-xl font-black tracking-tight text-gray-900">
                                    Lanka Tools
                                </h1>

                                <p className="text-xs text-yellow-600 font-semibold">
                                    Smart Rental Management
                                </p>
                            </div>

                        </div>

                        <p className="text-sm text-gray-500 leading-7 max-w-sm">
                            A simple and reliable rental management platform designed
                            to make discovering, renting, returning, and managing
                            tools and equipment easier.
                        </p>

                        <div className="flex items-center gap-2 text-sm font-semibold text-gray-700">
                            <FaTools className="text-yellow-500" />
                            <span>
                                Rent smarter. Work better.
                            </span>
                        </div>

                    </div>


                    {/* QUICK LINKS */}
                    <div>

                        <h3 className="text-sm font-bold uppercase tracking-wider text-gray-900 mb-6">
                            Quick Links
                        </h3>

                        <div className="flex flex-col gap-4">

                            {quickLinks.map((link, index) => (
                                <a
                                    key={index}
                                    href={link.href}
                                    className="group flex items-center gap-2 w-fit text-sm text-gray-500 hover:text-yellow-600 transition-colors"
                                >
                                    <FaArrowRight className="w-2.5 h-2.5 text-yellow-400 opacity-0 group-hover:opacity-100 transition-opacity" />

                                    <span>
                                        {link.name}
                                    </span>
                                </a>
                            ))}

                        </div>

                    </div>


                    {/* CONNECT */}
                    <div>

                        <h3 className="text-sm font-bold uppercase tracking-wider text-gray-900 mb-6">
                            Connect With Us
                        </h3>

                        <div className="flex items-center gap-3 text-sm text-gray-500 mb-6">
                            <div className="w-9 h-9 flex items-center justify-center bg-yellow-50 text-yellow-500">
                                <FaTools size={16} />
                            </div>

                            <span>
                                Reliable tools. Simple rentals.
                            </span>
                        </div>


                        <div className="flex gap-3">

                            {socials.map((social, index) => (
                                <a
                                    key={index}
                                    href={social.href}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="w-11 h-11 flex items-center justify-center bg-gray-50 border border-gray-200 text-gray-500 hover:bg-yellow-400 hover:border-yellow-400 hover:text-black transition-all"
                                >
                                    {social.icon}
                                </a>
                            ))}

                        </div>

                    </div>

                </div>


                {/* BOTTOM */}
                <div className="mt-14 pt-7 border-t border-gray-200 flex flex-col md:flex-row justify-between items-center gap-4">

                    <p className="text-xs text-gray-400 text-center md:text-left">
                        © {year} lankatools. All rights reserved.
                    </p>

                    <div className="flex items-center gap-2 text-xs text-gray-400">
                        <span>
                            Smart Rental Management
                        </span>

                        <span className="text-yellow-400">
                            •
                        </span>

                        <span>
                            Built for better work
                        </span>
                    </div>

                </div>

            </div>

        </footer>
    );
};

export default DashFooter;