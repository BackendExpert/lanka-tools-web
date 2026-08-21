import React from 'react'
import {
    FaGraduationCap,
    FaGithub,
    FaLinkedin,
    FaTwitter
} from 'react-icons/fa'

const Footer = () => {
    return (
        <footer className="border-t border-gray-200 bg-white">
            <div className="max-w-screen-2xl mx-auto px-6 py-10">

                <div className="grid grid-cols-1 md:grid-cols-4 gap-10">

                    <div className="md:col-span-2">
                        <div className="flex items-center gap-3">
                            <div className="flex items-center justify-center h-10 w-10 rounded-xl bg-blue-600 text-white">
                                <FaGraduationCap className="h-5 w-5" />
                            </div>

                            <div>
                                <p className="text-lg font-bold text-gray-900">
                                    ABC Research
                                </p>

                                <p className="text-xs text-gray-500">
                                    Research Management
                                </p>
                            </div>
                        </div>

                        <p className="mt-4 max-w-md text-sm leading-6 text-gray-500">
                            A modern research management platform designed to
                            help researchers organize, manage, and discover
                            valuable research.
                        </p>

                        <div className="flex items-center gap-3 mt-5">
                            <a
                                href="#"
                                className="flex items-center justify-center h-9 w-9 rounded-lg border border-gray-200 text-gray-500 hover:bg-gray-900 hover:text-white transition"
                            >
                                <FaGithub />
                            </a>

                            <a
                                href="#"
                                className="flex items-center justify-center h-9 w-9 rounded-lg border border-gray-200 text-gray-500 hover:bg-blue-600 hover:text-white transition"
                            >
                                <FaLinkedin />
                            </a>

                            <a
                                href="#"
                                className="flex items-center justify-center h-9 w-9 rounded-lg border border-gray-200 text-gray-500 hover:bg-sky-500 hover:text-white transition"
                            >
                                <FaTwitter />
                            </a>
                        </div>
                    </div>

                    <div>
                        <h3 className="text-sm font-semibold text-gray-900">
                            Platform
                        </h3>

                        <div className="flex flex-col gap-3 mt-4">
                            <a href="#" className="text-sm text-gray-500 hover:text-blue-600 transition">
                                Research
                            </a>

                            <a href="#" className="text-sm text-gray-500 hover:text-blue-600 transition">
                                Publications
                            </a>

                            <a href="#" className="text-sm text-gray-500 hover:text-blue-600 transition">
                                Saved Research
                            </a>

                            <a href="#" className="text-sm text-gray-500 hover:text-blue-600 transition">
                                Researchers
                            </a>
                        </div>
                    </div>

                    <div>
                        <h3 className="text-sm font-semibold text-gray-900">
                            Support
                        </h3>

                        <div className="flex flex-col gap-3 mt-4">
                            <a href="#" className="text-sm text-gray-500 hover:text-blue-600 transition">
                                Help Center
                            </a>

                            <a href="#" className="text-sm text-gray-500 hover:text-blue-600 transition">
                                Contact Us
                            </a>

                            <a href="#" className="text-sm text-gray-500 hover:text-blue-600 transition">
                                Privacy Policy
                            </a>

                            <a href="#" className="text-sm text-gray-500 hover:text-blue-600 transition">
                                Terms & Conditions
                            </a>
                        </div>
                    </div>

                </div>

                <div className="border-t border-gray-100 mt-10 pt-6 flex flex-col sm:flex-row items-center justify-between gap-3">
                    <p className="text-sm text-gray-500">
                        © {new Date().getFullYear()} ABC Research. All rights reserved.
                    </p>

                    <p className="text-sm text-gray-400">
                        Built for modern research
                    </p>
                </div>

            </div>
        </footer>
    )
}

export default Footer