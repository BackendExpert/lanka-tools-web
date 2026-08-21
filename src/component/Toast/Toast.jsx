import React, { useEffect } from "react";
import {
    FaCheckCircle,
    FaTimesCircle,
    FaTimes
} from "react-icons/fa";

const Toast = ({ success, message = "testing", onClose }) => {
    useEffect(() => {
        const timer = setTimeout(() => {
            onClose();
        }, 3000);

        return () => clearTimeout(timer);
    }, [onClose]);

    const icon = success ? (
        <FaCheckCircle className="text-black w-6 h-6" />
    ) : (
        <FaTimesCircle className="text-black w-6 h-6" />
    );

    return (
        <div className="flex w-[20rem] overflow-hidden border border-white/10 bg-[#292929]/95 backdrop-blur-xl shadow-2xl">

            <div className="flex w-16 shrink-0 items-center justify-center bg-yellow-400">
                <div className="flex h-8 w-8 items-center justify-center">
                    {icon}
                </div>
            </div>

            <div className="flex flex-1 items-stretch bg-[#292929]/95">

                <div className="flex-1 px-5 py-4">
                    <p
                        className={`text-sm font-semibold leading-5 ${
                            success
                                ? "text-yellow-300"
                                : "text-white/80"
                        }`}
                    >
                        {message}
                    </p>
                </div>

                <button
                    type="button"
                    onClick={onClose}
                    className="flex w-12 shrink-0 items-center justify-center text-white/40 hover:text-yellow-400 transition-colors"
                >
                    <FaTimes className="w-4 h-4" />
                </button>

            </div>

        </div>
    );
};

export default Toast;