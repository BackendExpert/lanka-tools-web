import React, { useEffect, useState } from 'react'
import API from '../../../services/api'

const MyAuditLog = () => {
    const token = localStorage.getItem('access_token')
    const [myauditlog, setMyauditlog] = useState([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const fetchmyauditlogs = async () => {
            try {
                setLoading(true)

                const res = await API.get('/profile/my-audits', {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                })

                if (res.data.success === true) {
                    setMyauditlog(res.data.result || [])
                }
            } catch (error) {
                console.error('Failed to fetch audit logs:', error)
            } finally {
                setLoading(false)
            }
        }

        fetchmyauditlogs()
    }, [token])

    const formatDate = (date) => {
        if (!date) return '-'

        return new Date(date).toLocaleString('en-US', {
            year: 'numeric',
            month: 'short',
            day: '2-digit',
            hour: '2-digit',
            minute: '2-digit',
        })
    }

    const getMetadata = (metadata) => {
        if (!metadata) return '-'

        const filteredMetadata = Object.entries(metadata).filter(
            ([key]) => key !== 'ipAddress' && key !== 'userAgent'
        )

        if (!filteredMetadata.length) return '-'

        return filteredMetadata
            .map(
                ([key, value]) =>
                    `${key}: ${typeof value === 'object'
                        ? JSON.stringify(value)
                        : value
                    }`
            )
            .join(', ')
    }

    return (
        <div className="min-h-screen bg-white p-3 sm:p-5 lg:p-8">
            <div className="mx-auto w-full">
                <div className="mb-5 border-l-4 border-yellow-400 pl-3 sm:mb-6 sm:pl-4">
                    <h1 className="text-xl font-bold text-gray-900 sm:text-2xl lg:text-3xl">
                        My Audit Logs
                    </h1>

                    <p className="mt-1 text-xs text-gray-500 sm:text-sm">
                        View your recent account activity and security events.
                    </p>
                </div>

                <div className="border border-gray-200 bg-white">
                    <div className="flex items-center justify-between gap-3 border-b border-gray-200 bg-yellow-50 px-3 py-3 sm:px-6 sm:py-4">
                        <div className="min-w-0">
                            <h2 className="truncate text-base font-semibold text-gray-900 sm:text-lg">
                                Activity History
                            </h2>

                            <p className="mt-0.5 text-xs text-gray-500 sm:text-sm">
                                {myauditlog.length}{' '}
                                {myauditlog.length === 1
                                    ? 'activity'
                                    : 'activities'}
                            </p>
                        </div>

                        <div className="flex h-9 w-9 shrink-0 items-center justify-center bg-yellow-400 text-xs font-bold text-gray-900 sm:h-10 sm:w-10 sm:text-sm">
                            {myauditlog.length}
                        </div>
                    </div>

                    {loading ? (
                        <div className="flex min-h-[250px] items-center justify-center px-4">
                            <div className="flex items-center gap-3 text-gray-500">
                                <div className="h-5 w-5 animate-spin rounded-full border-2 border-gray-200 border-t-yellow-400" />

                                <span className="text-sm">
                                    Loading audit logs...
                                </span>
                            </div>
                        </div>
                    ) : myauditlog.length === 0 ? (
                        <div className="flex min-h-[250px] flex-col items-center justify-center px-5 text-center">
                            <div className="mb-4 flex h-14 w-14 items-center justify-center bg-yellow-100 text-yellow-600">
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    className="h-7 w-7"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                    strokeWidth={1.8}
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h7l5 5v11a2 2 0 01-2 2z"
                                    />
                                </svg>
                            </div>

                            <h3 className="text-base font-semibold text-gray-900 sm:text-lg">
                                No audit logs found
                            </h3>

                            <p className="mt-1 max-w-md text-xs text-gray-500 sm:text-sm">
                                Your account activity will appear here when
                                audit events are recorded.
                            </p>
                        </div>
                    ) : (
                        <>
                            <div className="hidden overflow-x-auto md:block">
                                <table className="w-full text-left">
                                    <thead>
                                        <tr className="border-b border-gray-200 bg-gray-50">
                                            <th className="whitespace-nowrap px-4 py-4 text-xs font-bold uppercase tracking-wider text-gray-500 lg:px-6">
                                                Date & Time
                                            </th>

                                            <th className="whitespace-nowrap px-4 py-4 text-xs font-bold uppercase tracking-wider text-gray-500">
                                                Action
                                            </th>

                                            <th className="whitespace-nowrap px-4 py-4 text-xs font-bold uppercase tracking-wider text-gray-500">
                                                Description
                                            </th>

                                            <th className="whitespace-nowrap px-4 py-4 text-xs font-bold uppercase tracking-wider text-gray-500">
                                                IP Address
                                            </th>

                                            <th className="whitespace-nowrap px-4 py-4 text-xs font-bold uppercase tracking-wider text-gray-500">
                                                User Agent
                                            </th>

                                            <th className="whitespace-nowrap px-4 py-4 text-xs font-bold uppercase tracking-wider text-gray-500">
                                                Metadata
                                            </th>
                                        </tr>
                                    </thead>

                                    <tbody className="divide-y divide-gray-100">
                                        {myauditlog.map((log, index) => (
                                            <tr
                                                key={log._id || index}
                                                className="transition-colors hover:bg-yellow-50"
                                            >
                                                <td className="whitespace-nowrap px-4 py-4 text-sm text-gray-600 lg:px-6">
                                                    {formatDate(
                                                        log.createdAt
                                                    )}
                                                </td>

                                                <td className="px-4 py-4">
                                                    <span className="inline-flex items-center bg-yellow-100 px-3 py-1.5 text-xs font-bold uppercase text-yellow-800">
                                                        {log.action || '-'}
                                                    </span>
                                                </td>

                                                <td className="max-w-sm px-4 py-4 text-sm leading-6 text-gray-700">
                                                    {log.description || '-'}
                                                </td>

                                                <td className="whitespace-nowrap px-4 py-4 font-mono text-sm text-gray-600">
                                                    {log.ipAddress ||
                                                        log.metadata
                                                            ?.ipAddress ||
                                                        '-'}
                                                </td>

                                                <td className="max-w-xs px-4 py-4 text-sm text-gray-500">
                                                    <div className="line-clamp-2">
                                                        {log.userAgent ||
                                                            log.metadata
                                                                ?.userAgent ||
                                                            '-'}
                                                    </div>
                                                </td>

                                                <td className="max-w-sm px-4 py-4 text-sm text-gray-500">
                                                    <div className="line-clamp-3">
                                                        {getMetadata(
                                                            log.metadata
                                                        )}
                                                    </div>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>

                            <div className="divide-y divide-gray-200 md:hidden">
                                {myauditlog.map((log, index) => (
                                    <div
                                        key={log._id || index}
                                        className="p-4 transition-colors active:bg-yellow-50"
                                    >
                                        <div className="flex items-start justify-between gap-3">
                                            <div className="min-w-0">
                                                <span className="inline-flex max-w-full bg-yellow-100 px-2.5 py-1 text-[10px] font-bold uppercase tracking-wide text-yellow-800">
                                                    <span className="truncate">
                                                        {log.action || '-'}
                                                    </span>
                                                </span>
                                            </div>

                                            <span className="shrink-0 text-[11px] text-gray-400">
                                                #{index + 1}
                                            </span>
                                        </div>

                                        <div className="mt-4">
                                            <p className="text-[10px] font-bold uppercase tracking-wider text-gray-400">
                                                Description
                                            </p>

                                            <p className="mt-1 break-words text-sm leading-5 text-gray-700">
                                                {log.description || '-'}
                                            </p>
                                        </div>

                                        <div className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-2">
                                            <div>
                                                <p className="text-[10px] font-bold uppercase tracking-wider text-gray-400">
                                                    Date & Time
                                                </p>

                                                <p className="mt-1 text-xs text-gray-600">
                                                    {formatDate(
                                                        log.createdAt
                                                    )}
                                                </p>
                                            </div>

                                            <div>
                                                <p className="text-[10px] font-bold uppercase tracking-wider text-gray-400">
                                                    IP Address
                                                </p>

                                                <p className="mt-1 break-all font-mono text-xs text-gray-600">
                                                    {log.ipAddress ||
                                                        log.metadata
                                                            ?.ipAddress ||
                                                        '-'}
                                                </p>
                                            </div>
                                        </div>

                                        <div className="mt-4">
                                            <p className="text-[10px] font-bold uppercase tracking-wider text-gray-400">
                                                User Agent
                                            </p>

                                            <p className="mt-1 break-words text-xs leading-5 text-gray-500">
                                                {log.userAgent ||
                                                    log.metadata?.userAgent ||
                                                    '-'}
                                            </p>
                                        </div>

                                        {getMetadata(log.metadata) !== '-' && (
                                            <div className="mt-4">
                                                <p className="text-[10px] font-bold uppercase tracking-wider text-gray-400">
                                                    Metadata
                                                </p>

                                                <p className="mt-1 break-words text-xs leading-5 text-gray-500">
                                                    {getMetadata(
                                                        log.metadata
                                                    )}
                                                </p>
                                            </div>
                                        )}
                                    </div>
                                ))}
                            </div>
                        </>
                    )}
                </div>
            </div>
        </div>
    )
}

export default MyAuditLog