import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import {
    FiUser,
    FiMail,
    FiShield,
    FiGlobe,
    FiMonitor,
    FiClock,
    FiActivity
} from 'react-icons/fi'
import API from '../../../../services/api'

const UserAuditLog = () => {
    const { id } = useParams()
    const token = localStorage.getItem('access_token')
    const [auditlog, setAuditlog] = useState(null)

    useEffect(() => {
        const fetchauditlog = async () => {
            const res = await API.get(`/admin/fetch-auditlog/${id}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            })

            if (res.data.success === true) {
                setAuditlog(res.data.result)
            }
        }

        if (token && id) {
            fetchauditlog()
        }
    }, [token, id])

    if (!auditlog) {
        return (
            <div className="flex justify-center items-center h-96">
                <p className="text-gray-500">
                    Loading audit log...
                </p>
            </div>
        )
    }

    const user = auditlog.user

    return (
        <div className="w-full">

            <div className="bg-white border border-gray-100 rounded-2xl shadow-sm overflow-hidden">

                <div className="bg-gradient-to-r from-yellow-500 via-amber-500 to-yellow-400 p-6 text-white">

                    <div className="flex items-center gap-4">

                        <div className="w-16 h-16 rounded-full bg-white/20 flex items-center justify-center">
                            <FiActivity size={32} />
                        </div>

                        <div>
                            <h1 className="text-2xl font-bold">
                                User Audit Log
                            </h1>

                            <p className="text-sm text-white/80 mt-1">
                                Security activity details
                            </p>
                        </div>

                    </div>

                </div>

                <div className="p-6">

                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

                        <div className="border border-gray-200 p-5 rounded-xl">

                            <h2 className="text-lg font-semibold text-gray-800 mb-5">
                                User Information
                            </h2>

                            <div className="space-y-4">

                                <div className="flex gap-3">
                                    <FiMail className="text-yellow-500 mt-1" />

                                    <div>
                                        <p className="text-xs text-gray-400">
                                            Email
                                        </p>

                                        <p className="font-medium text-gray-800">
                                            {user?.email}
                                        </p>
                                    </div>
                                </div>

                                <div className="flex gap-3">
                                    <FiShield className="text-yellow-600 mt-1" />

                                    <div>
                                        <p className="text-xs text-gray-400">
                                            Account Status
                                        </p>

                                        <p
                                            className={`${user?.account_stats
                                                ? 'text-green-600'
                                                : 'text-red-600'
                                                } font-semibold`}
                                        >
                                            {user?.account_stats
                                                ? "Active"
                                                : "Disabled"}
                                        </p>
                                    </div>
                                </div>

                                <div className="flex gap-3">
                                    <FiUser className="text-yellow-500 mt-1" />

                                    <div>
                                        <p className="text-xs text-gray-400">
                                            User ID
                                        </p>

                                        <p className="text-sm break-all text-gray-700">
                                            {user?._id}
                                        </p>
                                    </div>
                                </div>

                            </div>

                        </div>

                        <div className="border border-gray-200 p-5 rounded-xl">

                            <h2 className="text-lg font-semibold text-gray-800 mb-5">
                                Activity Information
                            </h2>

                            <div className="space-y-4">

                                <div className="flex gap-3">
                                    <FiActivity className="text-yellow-500 mt-1" />

                                    <div>
                                        <p className="text-xs text-gray-400">
                                            Action
                                        </p>

                                        <span className="inline-flex px-3 py-1 rounded-full bg-yellow-50 text-yellow-700 text-sm font-semibold border border-yellow-100">
                                            {auditlog.action}
                                        </span>
                                    </div>
                                </div>

                                <div className="flex gap-3">
                                    <FiGlobe className="text-yellow-600 mt-1" />

                                    <div>
                                        <p className="text-xs text-gray-400">
                                            IP Address
                                        </p>

                                        <p className="font-medium text-gray-800">
                                            {auditlog.ipAddress}
                                        </p>
                                    </div>
                                </div>

                                <div className="flex gap-3">
                                    <FiClock className="text-yellow-500 mt-1" />

                                    <div>
                                        <p className="text-xs text-gray-400">
                                            Time
                                        </p>

                                        <p className="font-medium text-gray-800">
                                            {new Date(
                                                auditlog.createdAt
                                            ).toLocaleString()}
                                        </p>
                                    </div>
                                </div>

                            </div>

                        </div>

                    </div>

                    <div className="mt-6 border border-gray-200 p-5 rounded-xl">

                        <h2 className="text-lg font-semibold text-gray-800 mb-4">
                            Description
                        </h2>

                        <div className="border-l-4 border-yellow-400 bg-yellow-50 px-4 py-3">
                            <p className="text-gray-700">
                                {auditlog.description}
                            </p>
                        </div>

                    </div>

                    <div className="mt-6 border border-gray-200 p-5 rounded-xl">

                        <h2 className="text-lg font-semibold text-gray-800 mb-4">
                            Device Information
                        </h2>

                        <div className="flex gap-3">

                            <FiMonitor className="text-yellow-500 mt-1 shrink-0" />

                            <p className="text-sm text-gray-600 break-all">
                                {auditlog.userAgent}
                            </p>

                        </div>

                    </div>

                </div>

            </div>

        </div>
    )
}

export default UserAuditLog