import React, { useEffect, useState } from 'react'
import API from '../../../../services/api'

const Branches = () => {
    const token = localStorage.getItem('access_token')
    const [branches, setBranches] = useState([])

    useEffect(() => {
        const fetchbranches = async () => {
            const res = await API.get('/admin/fetch-all-branches', {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            })

            if (res.data.success === true) {
                setBranches(res.data.result)
            }
        }

        if (token) fetchbranches()
    }, [token])

    return (
        <div className="w-full sm:px-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                {branches.map((data, index) => {
                    const mapUrl = `https://www.google.com/maps?q=${encodeURIComponent(
                        data.branch_address
                    )}&output=embed`

                    return (
                        <div
                            key={data._id || index}
                            className="overflow-hidden border border-gray-200 bg-white"
                        >
                            <div className="w-full h-56">
                                <iframe
                                    src={mapUrl}
                                    className="w-full h-full border-0"
                                    loading="lazy"
                                    allowFullScreen
                                    title={`${data.branch_name} location`}
                                />
                            </div>

                            <div className="p-5">
                                <div className="flex items-start justify-between gap-4">
                                    <div>
                                        <p className="text-xs font-semibold uppercase tracking-wider text-yellow-600">
                                            Branch
                                        </p>

                                        <h3 className="mt-1 text-xl font-bold text-gray-900">
                                            {data.branch_name}
                                        </h3>
                                    </div>

                                    <span
                                        className={`shrink-0 px-3 py-1 text-xs font-bold ${data.branch_admin?.account_stats
                                            ? 'bg-yellow-400 text-gray-900'
                                            : 'bg-gray-200 text-gray-600'
                                            }`}
                                    >
                                        {data.branch_admin?.account_stats
                                            ? 'Active'
                                            : 'Inactive'}
                                    </span>
                                </div>

                                <div className="mt-4">
                                    <p className="text-xs font-semibold uppercase tracking-wider text-gray-400">
                                        Address
                                    </p>

                                    <p className="mt-1 text-sm text-gray-600">
                                        {data.branch_address}
                                    </p>
                                </div>

                                <div className="mt-5 border-t border-gray-100 pt-5">
                                    <p className="text-xs font-semibold uppercase tracking-wider text-yellow-600">
                                        Branch Administrator
                                    </p>

                                    <div className="mt-3">
                                        <p className="text-sm font-semibold text-gray-900">
                                            {data.branch_admin?.email || 'No email available'}
                                        </p>

                                        <p className="mt-1 text-xs text-gray-500">
                                            Last Login:{' '}
                                            {data.branch_admin?.last_login
                                                ? new Date(
                                                    data.branch_admin.last_login
                                                ).toLocaleString()
                                                : 'Never'}
                                        </p>
                                    </div>
                                </div>

                                <div className="mt-5 border-t border-gray-100 pt-5">
                                    <p className="text-xs font-semibold uppercase tracking-wider text-yellow-600">
                                        Branch Staff
                                    </p>

                                    <div className="mt-3">
                                        {
                                            data.staff_members.map((staff, staff_index) => {
                                                return (
                                                    <div className="" key={staff_index}>
                                                        <p className="text-sm font-semibold text-gray-900">
                                                            {staff.email || 'No email available'}
                                                        </p>
                                                    </div>
                                                )
                                            })
                                        }
                                    </div>
                                </div>

                                <div className="mt-5 grid grid-cols-2 gap-3">
                                    <div className="border border-gray-100 bg-gray-50 p-3">
                                        <p className="text-xs text-gray-400">
                                            Staff Members
                                        </p>

                                        <p className="mt-1 text-lg font-bold text-gray-900">
                                            {data.staff_members?.length || 0}
                                        </p>
                                    </div>

                                    <div className="border border-yellow-100 bg-yellow-50 p-3">
                                        <p className="text-xs text-yellow-600">
                                            Created
                                        </p>

                                        <p className="mt-1 text-sm font-bold text-gray-900">
                                            {data.createdAt
                                                ? new Date(
                                                    data.createdAt
                                                ).toLocaleDateString()
                                                : '-'}
                                        </p>
                                    </div>
                                </div>

                                <a
                                    href={data.branch_google_location}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="mt-5 block w-full bg-yellow-400 px-4 py-3 text-center text-sm font-bold text-gray-900 transition hover:bg-yellow-500"
                                >
                                    View Google Location
                                </a>
                            </div>
                        </div>
                    )
                })}
            </div>
        </div>
    )
}

export default Branches