import React, { useEffect, useState } from 'react'
import { FaSearch, FaChevronLeft, FaChevronRight, FaEye } from 'react-icons/fa'
import DefaultButton from '../../../../component/Buttons/DefaultButton'
import API from '../../../../services/api'
import { exportToCSV } from '../../../../utils/dataexport'


const LoginHistory = () => {
    const token = localStorage.getItem('access_token')

    const [auditlogs, setAuditlogs] = useState([])
    const [search, setSearch] = useState("")
    const [currentPage, setCurrentPage] = useState(1)

    const handleExport = () => {
        exportToCSV(
            filteredLogs,
            [
                { header: "#", value: (_, index) => index + 1 },
                { header: "User", value: "user.email" },
                { header: "Action", value: "action" },
                { header: "Description", value: "description" },
                { header: "IP Address", value: "ipAddress" },
                { header: "User Agent", value: "userAgent" },
                {
                    header: "Date",
                    value: (item) =>
                        new Date(item.createdAt).toLocaleString(),
                },
            ],
            "login-history.csv"
        );
    };

    const logsPerPage = 15

    useEffect(() => {
        const fetchallauditlogs = async () => {
            const res = await API.get('/admin/fetch-auditlogs', {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            })

            if (res.data.success === true) {
                // console.log(res.data.result)
                setAuditlogs(res.data.result || [])
            }

        }

        if (token) {
            fetchallauditlogs()
        }
    }, [token])

    const loginLogs = (auditlogs || []).filter((data) =>
        data.action === "LOGIN_SUCCESS" ||
        data.action === "WRONG_PASSWORD"
    )

    const filteredLogs = loginLogs.filter((data) =>
        data.description?.toLowerCase().includes(search.toLowerCase()) ||
        data.action?.toLowerCase().includes(search.toLowerCase())
    )

    const totalPages = Math.ceil(filteredLogs.length / logsPerPage)

    const startIndex = (currentPage - 1) * logsPerPage

    const currentLogs = filteredLogs.slice(
        startIndex,
        startIndex + logsPerPage
    )

    useEffect(() => {
        setCurrentPage(1)
    }, [search])

    return (
        <div className="w-full">

            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">

                <div className="px-5 sm:px-6 py-5 border-b border-gray-100">
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">

                        <div>
                            <h1 className="text-xl font-semibold text-gray-800">
                                Audit Logs
                            </h1>
                            <p className="text-sm text-gray-500 mt-1">
                                Monitor system activities and security events
                            </p>
                        </div>

                        <div className="md:flex items-center gap-3 w-full sm:w-auto">

                            <div className='md:mb-0 mb-4'>
                                <DefaultButton
                                    label="Export CSV"
                                    onClick={handleExport}
                                />
                            </div>

                            <div className="relative w-full sm:w-80">
                                <FaSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />

                                <input
                                    type="text"
                                    value={search}
                                    onChange={(e) => setSearch(e.target.value)}
                                    placeholder="Search email or action..."
                                    className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-gray-200 focus:ring-2 focus:ring-yellow-400 outline-none text-sm"
                                />
                            </div>

                        </div>

                    </div>
                </div>


                <div className="hidden md:block overflow-x-auto">

                    <table className="w-full">

                        <thead>
                            <tr className="bg-gray-50 text-left">

                                <th className="px-6 py-4 text-sm font-semibold text-gray-600">
                                    #
                                </th>

                                <th className="px-6 py-4 text-sm font-semibold text-gray-600">
                                    User
                                </th>

                                <th className="px-6 py-4 text-sm font-semibold text-gray-600">
                                    Action
                                </th>

                                <th className="px-6 py-4 text-sm font-semibold text-gray-600">
                                    Description
                                </th>

                                <th className="px-6 py-4 text-sm font-semibold text-gray-600">
                                    IP Address
                                </th>

                                <th className="px-6 py-4 text-sm font-semibold text-gray-600">
                                    Date
                                </th>

                                <th className="px-6 py-4 text-sm font-semibold text-gray-600">

                                </th>
                            </tr>
                        </thead>

                        <tbody className="divide-y divide-gray-100">

                            {
                                currentLogs.map((data, index) => (

                                    <tr key={index} className="hover:bg-gray-50 transition">

                                        <td className="px-6 py-4 text-sm text-gray-700">
                                            {startIndex + index + 1}
                                        </td>

                                        <td className="px-6 py-4 text-sm text-gray-700">
                                            {data.user?.email || "Unknown"}
                                        </td>

                                        <td className="px-6 py-4">

                                            <span className="px-3 py-1 rounded-full text-xs font-medium bg-yellow-50 text-yellow-600">
                                                {data.action}
                                            </span>

                                        </td>

                                        <td className="px-6 py-4 text-sm text-gray-700 max-w-md truncate">
                                            {data.description}
                                        </td>

                                        <td className="px-6 py-4 text-sm text-gray-600">
                                            {data.ipAddress}
                                        </td>

                                        <td className="px-6 py-4 text-sm text-gray-600">
                                            {new Date(data.createdAt).toLocaleString()}
                                        </td>
                                        <td className="px-6 py-4 text-center">
                                            <a
                                                href={`/dashboard/security/user-auditlog/${data._id}`}
                                                className="inline-flex items-center justify-center w-9 h-9 rounded-lg bg-gray-100 text-gray-600 hover:bg-yellow-600 hover:text-white transition"
                                            >
                                                <FaEye size={15} />
                                            </a>
                                        </td>
                                    </tr>
                                ))
                            }

                        </tbody>

                    </table>

                </div>


                <div className="md:hidden divide-y divide-gray-100">

                    {
                        currentLogs.map((data, index) => (
                            <div key={index} className="p-5 hover:bg-gray-50">

                                <div className="flex justify-between">

                                    <div>

                                        <p className="text-sm font-semibold text-gray-800">
                                            {data.user?.email || "Unknown"}
                                        </p>

                                        <span className="inline-flex mt-2 px-3 py-1 rounded-full text-xs font-medium bg-yellow-50 text-yellow-600">
                                            {data.action}
                                        </span>

                                        <p className="text-sm text-gray-600 mt-3">
                                            {data.description}
                                        </p>

                                        <p className="text-xs text-gray-500 mt-2">
                                            IP: {data.ipAddress}
                                        </p>

                                        <p className="text-xs text-gray-500 mt-1">
                                            {new Date(data.createdAt).toLocaleString()}
                                        </p>

                                    </div>
                                    <a
                                        href={`/dashboard/security/user-auditlog/${data._id}`}
                                        className="w-9 h-9 flex-shrink-0 flex items-center justify-center rounded-lg bg-gray-100 text-gray-600 hover:bg-yellow-400 hover:text-white transition"
                                    >
                                        <FaEye size={15} />
                                    </a>

                                </div>

                            </div>
                        ))
                    }

                </div>


                <div className="px-5 sm:px-6 py-5 border-t border-gray-100 flex flex-col sm:flex-row items-center justify-between gap-4">

                    <p className="text-sm text-gray-500">
                        Showing {filteredLogs.length === 0 ? 0 : startIndex + 1} - {Math.min(startIndex + logsPerPage, filteredLogs.length)} of {filteredLogs.length} logs
                    </p>

                    <div className="flex items-center gap-3">

                        <button
                            disabled={currentPage === 1}
                            onClick={() => setCurrentPage(currentPage - 1)}
                            className="w-9 h-9 flex items-center justify-center rounded-lg border border-gray-200 disabled:opacity-40 hover:bg-gray-100"
                        >
                            <FaChevronLeft size={14} />
                        </button>

                        <span className="px-4 py-2 rounded-lg bg-yellow-400 text-white text-sm">
                            {currentPage} / {totalPages || 1}
                        </span>

                        <button
                            disabled={currentPage === totalPages || totalPages === 0}
                            onClick={() => setCurrentPage(currentPage + 1)}
                            className="w-9 h-9 flex items-center justify-center rounded-lg border border-gray-200 disabled:opacity-40 hover:bg-gray-100"
                        >
                            <FaChevronRight size={14} />
                        </button>

                    </div>

                </div>

            </div>

        </div>
    )
}

export default LoginHistory