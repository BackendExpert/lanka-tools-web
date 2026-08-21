import React from 'react'

const UserPageNotFound = () => {
    return (
        <div className="min-h-[70vh] flex items-center justify-center w-full">
            <div className="text-center max-w-md px-6">
                <div className="text-7xl font-bold text-gray-200 mb-4">
                    404
                </div>

                <h1 className="text-2xl font-semibold text-gray-800 mb-2">
                    Page Not Found
                </h1>

                <p className="text-sm text-gray-500 leading-6 mb-6">
                    The page you are looking for does not exist or may have been moved.
                </p>

                <button
                    onClick={() => window.history.back()}
                    className="px-6 py-3 text-sm font-medium text-gray-700 border border-gray-200 rounded-lg hover:bg-gray-100 transition-all duration-200"
                >
                    Go Back
                </button>
            </div>
        </div>
    )
}

export default UserPageNotFound