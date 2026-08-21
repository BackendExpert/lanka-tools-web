import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import {
    FiMail,
    FiPhone,
    FiMapPin,
    FiUser,
    FiCalendar,
    FiShield,
    FiClock,
    FiHome,
    FiCreditCard
} from 'react-icons/fi'
import { useAuth } from '../../../../context/AuthContext'
import Toast from '../../../../component/Toast/Toast'
import API from '../../../../services/api'

const ViewUser = () => {
    const { id } = useParams()
    const token = localStorage.getItem('access_token')

    const [user, setUser] = useState(null)
    const [loading, setLoading] = useState(false)
    const [toast, setToast] = useState(null)

    const { auth } = useAuth()

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const res = await API.get(`/admin/fetch-user/${id}`, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                })

                if (res.data.success === true) {
                    setUser(res.data.result)
                }
            } catch (err) {
                setToast({
                    success: false,
                    message:
                        err.response?.data?.message ||
                        'Unable to load user',
                })
            }
        }

        if (token && id) {
            fetchUserData()
        }
    }, [id, token])

    if (!user) {
        return (
            <div className="flex justify-center items-center h-96">
                <p className="text-gray-500">
                    Loading user...
                </p>
            </div>
        )
    }

    const profile = user.getprofile
    const account = user.tragetuser

    const handleUpdateUserStatus = async (e) => {
        e.preventDefault()

        setLoading(true)

        try {
            const res = await API.patch(
                `/admin/update-user-status/${id}`,
                {},
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            )

            if (res.data.success === true) {
                setToast({
                    success: true,
                    message: res.data.message,
                })

                setTimeout(() => {
                    window.location.reload()
                }, 3000)
            }

        } catch (err) {
            setToast({
                success: false,
                message:
                    err.response?.data?.message ||
                    'Something went wrong',
            })
        } finally {
            setLoading(false)
        }
    }

    const formatDate = (date) => {
        if (!date) return 'Not available'

        const parsedDate = new Date(date)

        if (isNaN(parsedDate.getTime())) {
            return 'Not available'
        }

        return parsedDate.toLocaleDateString('en-GB', {
            day: '2-digit',
            month: 'short',
            year: 'numeric',
        })
    }

    const formatDateTime = (date) => {
        if (!date) return 'Not available'

        const parsedDate = new Date(date)

        if (isNaN(parsedDate.getTime())) {
            return 'Not available'
        }

        return parsedDate.toLocaleString('en-GB', {
            day: '2-digit',
            month: 'short',
            year: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
        })
    }

    const hasAddress = (address) => {
        if (!address) return false

        return Object.values(address).some(
            (value) => value !== undefined && value !== null && value !== ''
        )
    }

    const AddressDisplay = ({ address }) => {
        if (!hasAddress(address)) {
            return (
                <p className="text-gray-400">
                    No address added
                </p>
            )
        }

        return (
            <div className="text-gray-700 leading-7">
                {address.address_line_1 && (
                    <div>{address.address_line_1}</div>
                )}

                {address.address_line_2 && (
                    <div>{address.address_line_2}</div>
                )}

                {(address.city || address.state) && (
                    <div>
                        {address.city}

                        {address.city && address.state
                            ? ', '
                            : ''}

                        {address.state}
                    </div>
                )}

                {address.postal_code && (
                    <div>{address.postal_code}</div>
                )}

                {address.country && (
                    <div>{address.country}</div>
                )}
            </div>
        )
    }

    return (
        <div className="w-full min-h-screen bg-gray-50">

            {toast && (
                <div className="fixed top-8 right-8 z-50">
                    <Toast
                        success={toast.success}
                        message={toast.message}
                        onClose={() => setToast(null)}
                    />
                </div>
            )}

            <div className="bg-white border border-gray-200">

                <div className="bg-gradient-to-r from-yellow-500 via-amber-500 to-yellow-400 h-36 md:h-48 relative">

                    <div className="absolute -bottom-16 left-6">

                        {profile?.profile_img ? (
                            <img
                                src={`${import.meta.env.VITE_APP_API_FILES}/uploads/profile/${profile.profile_img}`}
                                alt="Profile"
                                className="rounded-full w-32 h-32 md:w-40 md:h-40 border-4 border-white object-cover bg-white"
                            />
                        ) : (
                            <div className="rounded-full w-32 h-32 md:w-40 md:h-40 bg-white border-4 border-white flex items-center justify-center">
                                <FiUser
                                    size={60}
                                    className="text-gray-400"
                                />
                            </div>
                        )}

                    </div>

                </div>

                <div className="pt-20 md:pt-24 px-6 pb-8">

                    <div className="flex flex-col lg:flex-row lg:justify-between gap-6">

                        <div className="w-full">

                            <div className="mb-5">

                                {auth?.user?.email === account?.email ? (

                                    <div className="w-full bg-gray-100 border border-gray-300 text-gray-600 text-center font-semibold py-3 px-5">
                                        You cannot update your own account status.
                                    </div>

                                ) : (

                                    <button
                                        onClick={handleUpdateUserStatus}
                                        disabled={loading}
                                        className={`w-full md:w-auto py-3 px-6 font-semibold text-white transition-all duration-300 active:scale-95 disabled:opacity-60 disabled:cursor-not-allowed ${account?.account_stats
                                                ? 'bg-red-600 hover:bg-red-700'
                                                : 'bg-green-600 hover:bg-green-700'
                                            }`}
                                    >
                                        {loading ? (
                                            <div className="flex items-center justify-center gap-3">

                                                <svg
                                                    className="w-5 h-5 animate-spin"
                                                    xmlns="http://www.w3.org/2000/svg"
                                                    fill="none"
                                                    viewBox="0 0 24 24"
                                                >
                                                    <circle
                                                        className="opacity-25"
                                                        cx="12"
                                                        cy="12"
                                                        r="10"
                                                        stroke="currentColor"
                                                        strokeWidth="4"
                                                    />

                                                    <path
                                                        className="opacity-75"
                                                        fill="currentColor"
                                                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
                                                    />
                                                </svg>

                                                Updating...

                                            </div>
                                        ) : account?.account_stats ? (
                                            <div className="flex items-center justify-center gap-2">
                                                <span>🔒</span>
                                                Disable Account
                                            </div>
                                        ) : (
                                            <div className="flex items-center justify-center gap-2">
                                                <span>✅</span>
                                                Enable Account
                                            </div>
                                        )}
                                    </button>

                                )}

                            </div>

                            <h1 className="text-3xl font-bold text-gray-900">

                                {profile?.first_name || 'Unknown'}{' '}

                                {profile?.last_name || ''}

                            </h1>

                            <p className="text-gray-500 mt-2">
                                {account?.email}
                            </p>

                            <div className="flex flex-wrap gap-3 mt-4">

                                <span className="bg-yellow-100 text-yellow-700 px-4 py-1 text-sm font-semibold border border-yellow-200">
                                    {account?.role?.role || 'User'}
                                </span>

                                <span
                                    className={`px-4 py-1 text-sm font-semibold ${account?.account_stats
                                            ? 'bg-green-100 text-green-700'
                                            : 'bg-red-100 text-red-700'
                                        }`}
                                >
                                    {account?.account_stats
                                        ? 'Active'
                                        : 'Disabled'}
                                </span>

                            </div>

                        </div>

                    </div>

                </div>

            </div>

            <div className="grid grid-cols-1 xl:grid-cols-3 gap-6 mt-6">

                <div className="xl:col-span-2 space-y-6">

                    <div className="bg-white border border-gray-200 p-6">

                        <h2 className="text-xl font-bold text-gray-900 mb-6">
                            Personal Information
                        </h2>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

                            <div className="flex items-center gap-4">

                                <FiMail
                                    className="text-yellow-500 shrink-0"
                                    size={20}
                                />

                                <div>
                                    <p className="text-gray-400 text-sm">
                                        Email
                                    </p>

                                    <p className="font-medium text-gray-800 break-all">
                                        {account?.email || 'Not available'}
                                    </p>
                                </div>

                            </div>

                            <div className="flex items-center gap-4">

                                <FiPhone
                                    className="text-yellow-500 shrink-0"
                                    size={20}
                                />

                                <div>
                                    <p className="text-gray-400 text-sm">
                                        Mobile
                                    </p>

                                    <p className="font-medium text-gray-800">
                                        {profile?.mobile || 'Not available'}
                                    </p>
                                </div>

                            </div>

                            <div className="flex items-center gap-4">

                                <FiCalendar
                                    className="text-yellow-500 shrink-0"
                                    size={20}
                                />

                                <div>
                                    <p className="text-gray-400 text-sm">
                                        Date of Birth
                                    </p>

                                    <p className="font-medium text-gray-800">
                                        {formatDate(profile?.dob)}
                                    </p>
                                </div>

                            </div>

                            <div className="flex items-center gap-4">

                                <FiShield
                                    className="text-yellow-500 shrink-0"
                                    size={20}
                                />

                                <div>
                                    <p className="text-gray-400 text-sm">
                                        Account Status
                                    </p>

                                    <p
                                        className={`font-semibold ${account?.account_stats
                                                ? 'text-green-600'
                                                : 'text-red-600'
                                            }`}
                                    >
                                        {account?.account_stats
                                            ? 'Active'
                                            : 'Disabled'}
                                    </p>
                                </div>

                            </div>

                        </div>

                    </div>

                    <div className="bg-white border border-gray-200 p-6">

                        <div className="flex items-center gap-3 mb-6">

                            <div className="w-10 h-10 bg-yellow-50 border border-yellow-100 flex items-center justify-center">
                                <FiHome
                                    className="text-yellow-600"
                                    size={20}
                                />
                            </div>

                            <div>
                                <h2 className="text-xl font-bold text-gray-900">
                                    Residential Address
                                </h2>

                                <p className="text-sm text-gray-400">
                                    User's current residential address
                                </p>
                            </div>

                        </div>

                        <div className="flex gap-4">

                            <FiMapPin
                                className="text-yellow-500 mt-1 shrink-0"
                                size={22}
                            />

                            <AddressDisplay
                                address={profile?.address}
                            />

                        </div>

                    </div>

                    <div className="bg-white border border-gray-200 p-6">

                        <div className="flex items-center gap-3 mb-6">

                            <div className="w-10 h-10 bg-yellow-50 border border-yellow-100 flex items-center justify-center">
                                <FiCreditCard
                                    className="text-yellow-600"
                                    size={20}
                                />
                            </div>

                            <div>
                                <h2 className="text-xl font-bold text-gray-900">
                                    Billing Address
                                </h2>

                                <p className="text-sm text-gray-400">
                                    Address used for billing
                                </p>
                            </div>

                        </div>

                        <div className="flex gap-4">

                            <FiMapPin
                                className="text-yellow-500 mt-1 shrink-0"
                                size={22}
                            />

                            <AddressDisplay
                                address={profile?.billing_address}
                            />

                        </div>

                    </div>

                    <div className="bg-white border border-gray-200 p-6">

                        <h2 className="text-xl font-bold text-gray-900 mb-5">
                            Biography
                        </h2>

                        {profile?.bio ? (
                            <p className="leading-8 text-gray-600 whitespace-pre-line">
                                {profile.bio}
                            </p>
                        ) : (
                            <p className="text-gray-400">
                                No biography added.
                            </p>
                        )}

                    </div>

                </div>

                <div className="space-y-6">

                    <div className="bg-white border border-gray-200 p-6">

                        <h2 className="text-xl font-bold text-gray-900 mb-6">
                            Account Details
                        </h2>

                        <div className="space-y-5">

                            <div>
                                <span className="text-gray-500 text-sm">
                                    User ID
                                </span>

                                <p className="font-medium text-gray-800 mt-1 break-all">
                                    {account?._id}
                                </p>
                            </div>

                            <div className="border-t border-gray-100 pt-5">

                                <span className="text-gray-500 text-sm">
                                    Role
                                </span>

                                <p className="font-semibold text-yellow-600 mt-1">
                                    {account?.role?.role || 'User'}
                                </p>

                            </div>

                            <div className="border-t border-gray-100 pt-5">

                                <span className="text-gray-500 text-sm">
                                    Status
                                </span>

                                <p
                                    className={`font-semibold mt-1 ${account?.account_stats
                                            ? 'text-green-600'
                                            : 'text-red-600'
                                        }`}
                                >
                                    {account?.account_stats
                                        ? 'Active'
                                        : 'Disabled'}
                                </p>

                            </div>

                        </div>

                    </div>

                    <div className="bg-white border border-gray-200 p-6">

                        <h2 className="text-xl font-bold text-gray-900 mb-6">
                            Activity
                        </h2>

                        <div className="space-y-6">

                            <div className="flex gap-3">

                                <FiClock
                                    className="text-yellow-500 mt-1 shrink-0"
                                />

                                <div>

                                    <p className="text-gray-400 text-sm">
                                        Last Login
                                    </p>

                                    <p className="font-medium text-gray-800 mt-1">
                                        {formatDateTime(
                                            account?.last_login
                                        )}
                                    </p>

                                </div>

                            </div>

                            <div className="flex gap-3">

                                <FiCalendar
                                    className="text-yellow-500 mt-1 shrink-0"
                                />

                                <div>

                                    <p className="text-gray-400 text-sm">
                                        Account Created
                                    </p>

                                    <p className="font-medium text-gray-800 mt-1">
                                        {formatDateTime(
                                            account?.createdAt
                                        )}
                                    </p>

                                </div>

                            </div>

                            <div className="flex gap-3">

                                <FiShield
                                    className="text-yellow-500 mt-1 shrink-0"
                                />

                                <div>

                                    <p className="text-gray-400 text-sm">
                                        Last Updated
                                    </p>

                                    <p className="font-medium text-gray-800 mt-1">
                                        {formatDateTime(
                                            account?.updatedAt
                                        )}
                                    </p>

                                </div>

                            </div>

                        </div>

                    </div>

                </div>

            </div>

        </div>
    )
}

export default ViewUser