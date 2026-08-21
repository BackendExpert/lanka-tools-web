import React from "react";
import { FaArrowLeft, FaHome, FaTools } from "react-icons/fa";

const DefultError = () => {
    return (
        <div className="relative flex min-h-screen items-center justify-center overflow-hidden bg-black px-6">

            <div className="absolute -left-40 -top-40 h-[500px] w-[500px] rounded-full bg-yellow-400/10 blur-3xl" />
            <div className="absolute -bottom-40 -right-40 h-[500px] w-[500px] rounded-full bg-yellow-400/10 blur-3xl" />

            <div className="absolute inset-0 opacity-[0.035] bg-[radial-gradient(#facc15_1px,transparent_1px)] bg-[size:28px_28px]" />

            <div className="absolute left-[15%] top-24 h-2 w-2 bg-yellow-400 animate-pulse" />
            <div className="absolute right-[18%] top-[30%] h-3 w-3 bg-yellow-400 animate-ping" />
            <div className="absolute bottom-[25%] left-[22%] h-2 w-2 bg-yellow-400 animate-pulse" />
            <div className="absolute bottom-20 right-[30%] h-2 w-2 bg-yellow-300 animate-ping" />

            <div className="relative z-10 w-full max-w-2xl text-center">

                <div className="border border-white/10 bg-white/[0.03] px-8 py-12 backdrop-blur-xl sm:px-12">

                    <div className="mb-7 flex justify-center">
                        <div className="relative">
                            <div className="absolute inset-0 bg-yellow-400/30 blur-2xl" />

                            <div className="relative flex h-20 w-20 items-center justify-center bg-yellow-400 text-black">
                                <FaTools className="text-3xl" />
                            </div>
                        </div>
                    </div>

                    <div className="flex items-center justify-center gap-2">
                        <span className="text-7xl font-black tracking-tight text-yellow-400 sm:text-9xl">
                            4
                        </span>

                        <span className="text-7xl font-black tracking-tight text-white sm:text-9xl">
                            0
                        </span>

                        <span className="text-7xl font-black tracking-tight text-yellow-400 sm:text-9xl">
                            4
                        </span>
                    </div>

                    <div className="mt-6">
                        <h1 className="text-2xl font-bold text-white sm:text-3xl">
                            Tool Not Found
                        </h1>

                        <p className="mx-auto mt-4 max-w-lg text-sm leading-relaxed text-white/50 sm:text-base">
                            The page you're looking for doesn't exist,
                            may have been moved, or is currently unavailable.
                        </p>
                    </div>

                    <div className="mt-9 flex flex-col items-center justify-center gap-3 sm:flex-row">

                        <a
                            href="/"
                            className="inline-flex w-full items-center justify-center gap-2 bg-yellow-400 px-7 py-3 font-bold text-black transition-all duration-300 hover:bg-yellow-300 sm:w-auto"
                        >
                            <FaHome className="text-sm" />
                            Go Home
                        </a>

                        <button
                            onClick={() => window.history.back()}
                            className="inline-flex w-full items-center justify-center gap-2 border border-white/15 bg-white/5 px-7 py-3 font-bold text-white backdrop-blur-md transition-all duration-300 hover:border-yellow-400 hover:bg-yellow-400/10 sm:w-auto"
                        >
                            <FaArrowLeft className="text-sm" />
                            Go Back
                        </button>

                    </div>

                    <div className="mt-9 flex items-center justify-center gap-3 border-t border-white/10 pt-6 text-xs text-white/30">
                        <span className="h-1.5 w-1.5 bg-yellow-400" />
                        <span>Error 404</span>
                        <span>•</span>
                        <span>Tool Rental Platform</span>
                        <span className="h-1.5 w-1.5 bg-yellow-400" />
                    </div>

                </div>

            </div>

        </div>
    );
};

export default DefultError;