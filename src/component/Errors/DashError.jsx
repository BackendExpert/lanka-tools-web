import React from "react";
import { AlertTriangle } from "lucide-react";

const DashError = () => {
    return (
        <div className="flex min-h-[40vh] w-full items-center justify-center bg-white px-6 py-16">
            <div className="flex flex-col items-center text-center max-w-xl">
                {/* Icon */}
                <div className="bg-indigo-50 p-6 rounded-full mb-6">
                    <AlertTriangle className="w-16 h-16 text-indigo-600 animate-bounce" />
                </div>

                {/* Error Code */}
                <h1 className="text-7xl font-extrabold text-indigo-600 mb-4">501</h1>

                {/* Error Title */}
                <h2 className="text-3xl font-semibold text-gray-800 mb-2">
                    Feature Not Implemented
                </h2>

                {/* Description */}
                <p className="text-gray-500 text-lg mb-6">
                    The feature you are trying to access is not yet available.
                    Please check back later or contact support for more information.
                </p>

                {/* Buttons */}
                <div className="flex flex-col sm:flex-row gap-4">
                    <button
                        onClick={() => (window.location.href = "/Dashboard")}
                        className="px-6 py-3 bg-indigo-600 text-white font-semibold rounded-xl shadow hover:bg-indigo-700 transition"
                    >
                        Go Back Home
                    </button>

                    <a
                        href="#"
                        className="px-6 py-3 border border-indigo-600 text-indigo-600 font-semibold rounded-xl shadow hover:bg-indigo-50 transition"
                    >
                        Contact Support
                    </a>
                </div>
            </div>
        </div>
    );
};

export default DashError;