import React, { useEffect, useState } from 'react'
import { FaEye, FaSearch, FaChevronLeft, FaChevronRight } from 'react-icons/fa'
import API from '../../../../services/api'
import DefaultButton from '../../../../component/Buttons/DefaultButton'
import { exportToCSV } from '../../../../utils/dataexport'


const Users = () => {
    const token = localStorage.getItem('access_token')

    const [users, setUsers] = useState([])
    const [search, setSearch] = useState("")
    const [currentPage, setCurrentPage] = useState(1)

    const usersPerPage = 15

    const handleExport = () => {
        exportToCSV(
            filteredUsers,
            [
                {
                    header: "#",
                    value: (_, index) => index + 1
                },
                {
                    header: "Email",
                    value: "email"
                },
                {
                    header: "Role",
                    value: "role.role"
                }
            ],
            "users.csv"
        );
    };

    useEffect(() => {
        const fetchUsers = async () => {
            const res = await API.get('/admin/fetch-users', {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            })

            if (res.data.success) {
                setUsers(res.data.result)
            }
        }

        if (token) {
            fetchUsers()
        }
    }, [token])

    const filteredUsers = users.filter((data) =>
        data.email?.toLowerCase().includes(search.toLowerCase())
    )

    const totalPages = Math.ceil(filteredUsers.length / usersPerPage)

    const startIndex = (currentPage - 1) * usersPerPage

    const currentUsers = filteredUsers.slice(
        startIndex,
        startIndex + usersPerPage
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
                                Users Management
                            </h1>

                            <p className="text-sm text-gray-500 mt-1">
                                Manage system users and their roles
                            </p>
                        </div>

                        <div className="md:flex items-center gap-3 w-full sm:w-auto">
                            <div className="md:mb-0 mb-4">
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
                                    placeholder="Search by email..."
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
                                    Email
                                </th>

                                <th className="px-6 py-4 text-sm font-semibold text-gray-600">
                                    Role
                                </th>

                                <th className="px-6 py-4 text-sm font-semibold text-gray-600 text-center">
                                    Action
                                </th>

                            </tr>
                        </thead>

                        <tbody className="divide-y divide-gray-100">

                            {
                                currentUsers.map((data, index) => {
                                    return (
                                        <tr
                                            key={index}
                                            className="hover:bg-gray-50 transition duration-200"
                                        >

                                            <td className="px-6 py-4 text-sm text-gray-700">
                                                {startIndex + index + 1}
                                            </td>

                                            <td className="px-6 py-4">
                                                <div className="flex items-center gap-3">

                                                    <div className="w-10 h-10 rounded-full bg-yellow-100 flex items-center justify-center text-yellow-600 font-semibold">
                                                        {data.email?.charAt(0).toUpperCase()}
                                                    </div>

                                                    <div>
                                                        <p className="text-sm font-medium text-gray-800">
                                                            {data.email}
                                                        </p>

                                                        <p className="text-xs text-gray-500">
                                                            User Account
                                                        </p>
                                                    </div>

                                                </div>
                                            </td>

                                            <td className="px-6 py-4">
                                                <span className="inline-flex px-3 py-1 rounded-full text-xs font-medium bg-yellow-50 text-yellow-600">
                                                    {data.role?.role}
                                                </span>
                                            </td>

                                            <td className="px-6 py-4 text-center">
                                                <a
                                                    href={`/dashboard/platfrom-user/${data._id}`}
                                                    className="inline-flex items-center justify-center w-9 h-9 rounded-lg bg-gray-100 text-gray-600 hover:bg-yellow-400 hover:text-white transition"
                                                >
                                                    <FaEye size={15} />
                                                </a>
                                            </td>

                                        </tr>
                                    )
                                })
                            }

                        </tbody>

                    </table>

                </div>


                <div className="md:hidden divide-y divide-gray-100">

                    {
                        currentUsers.map((data, index) => {
                            return (
                                <div
                                    key={index}
                                    className="p-5 flex items-center justify-between hover:bg-gray-50 transition"
                                >

                                    <div className="flex items-center gap-3 min-w-0">

                                        <div className="w-10 h-10 shrink-0 rounded-full bg-yellow-100 flex items-center justify-center text-yellow-600 font-semibold">
                                            {data.email?.charAt(0).toUpperCase()}
                                        </div>

                                        <div className="min-w-0">

                                            <p className="text-sm font-medium text-gray-800 truncate">
                                                {data.email}
                                            </p>

                                            <span className="inline-flex mt-1 px-3 py-1 rounded-full text-xs font-medium bg-yellow-50 text-yellow-600">
                                                {data.role?.role}
                                            </span>

                                        </div>

                                    </div>


                                    <a
                                        href={`/dashboard/platfrom-user/${data._id}`}
                                        className="w-9 h-9 flex-shrink-0 flex items-center justify-center rounded-lg bg-gray-100 text-gray-600 hover:bg-yellow-400 hover:text-white transition"
                                    >
                                        <FaEye size={15} />
                                    </a>

                                </div>
                            )
                        })
                    }

                </div>


                <div className="px-5 sm:px-6 py-5 border-t border-gray-100 flex flex-col sm:flex-row items-center justify-between gap-4">

                    <p className="text-sm text-gray-500">
                        Showing {filteredUsers.length === 0 ? 0 : startIndex + 1} - {Math.min(startIndex + usersPerPage, filteredUsers.length)} of {filteredUsers.length} users
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

export default Users