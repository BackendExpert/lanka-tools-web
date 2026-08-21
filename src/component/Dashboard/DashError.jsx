import React from "react";
import { AlertTriangle } from "lucide-react";

const DashError = () => {
    return (
        <div className="flex min-h-[80vh] w-full items-center justify-center bg-white px-6 py-16">
            <div className="flex flex-col items-center text-center max-w-xl">

                <div className="bg-yellow-50 p-6 mb-6">
                    <AlertTriangle className="w-16 h-16 text-yellow-500 animate-bounce" />
                </div>

                <h1 className="text-7xl font-black text-yellow-500 mb-4">
                    501
                </h1>

                <h2 className="text-3xl font-bold text-gray-900 mb-3">
                    Feature Not Available
                </h2>

                <p className="text-gray-500 text-lg leading-7 mb-8">
                    The feature you are trying to access is not currently
                    available. Please check back later or contact support
                    if you need assistance.
                </p>

                <div className="flex flex-col sm:flex-row gap-3">

                    <button
                        onClick={() => (window.location.href = "/Dashboard")}
                        className="px-6 py-3 bg-yellow-400 text-black font-bold hover:bg-yellow-500 transition"
                    >
                        Go Back Home
                    </button>

                    <a
                        href="#"
                        className="px-6 py-3 border border-gray-300 text-gray-700 font-semibold hover:border-yellow-400 hover:text-yellow-600 transition"
                    >
                        Contact Support
                    </a>

                </div>

            </div>
        </div>
    );
};

export default DashError;