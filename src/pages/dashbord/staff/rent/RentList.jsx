import React, { useEffect, useState } from 'react'
import API from '../../../../services/api'
import { FiPackage } from 'react-icons/fi'

const RentList = () => {
    const token = localStorage.getItem('access_token')
    const [rentalList, setRentelList] = useState([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const fetchreatalList = async () => {
            try {
                const res = await API.get('/rentel/rented-list', {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                })
                if (res.data.success === true) setRentelList(res.data.result)
            } catch (error) {
                console.error(error)
            } finally {
                setLoading(false)
            }
        }
        if (token) fetchreatalList()
    }, [token])

    const formatDate = (date) => new Date(date).toLocaleDateString('en-US', { day: '2-digit', month: 'short', year: 'numeric' })

    const getStatus = (rental) => {
        if (rental.is_returned) {
            return {
                label: 'Returned',
                className: 'bg-slate-100 text-slate-600',
                isOverdue: false,
                overdueDays: 0,
            }
        }

        const endDate = new Date(rental.endDateTime)
        const now = new Date()

        if (now > endDate) {
            const overdueMilliseconds = now.getTime() - endDate.getTime()
            const overdueDays = Math.ceil(overdueMilliseconds / (1000 * 60 * 60 * 24))

            return {
                label: 'Overdue',
                className: 'bg-red-50 text-red-600',
                isOverdue: true,
                overdueDays,
            }
        }

        return {
            label: 'Active',
            className: 'bg-green-50 text-green-600',
            isOverdue: false,
            overdueDays: 0,
        }
    }

    const handleView = (rental) => {
        console.log(rental)
    }

    return (
        <div className="w-full">
            <div className="mb-6 flex items-end justify-between">
                <div>
                    <p className="text-xs font-bold uppercase tracking-[0.2em] text-yellow-600">My Rentals</p>
                    <h1 className="mt-2 text-3xl font-black tracking-tight text-slate-950">Rental History</h1>
                    <p className="mt-2 text-sm text-slate-500">Manage your rented tools and track their return status.</p>
                </div>

                <div className="hidden rounded-xl bg-slate-950 px-4 py-3 sm:block">
                    <p className="text-xs text-slate-400">Total Rentals</p>
                    <p className="mt-1 text-xl font-black text-white">{rentalList.length}</p>
                </div>
            </div>

            <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
                {loading ? (
                    <div className="flex min-h-64 items-center justify-center">
                        <div className="h-8 w-8 animate-spin rounded-full border-4 border-slate-200 border-t-yellow-500" />
                    </div>
                ) : rentalList.length === 0 ? (
                    <div className="flex min-h-64 flex-col items-center justify-center px-6 text-center">
                        <div className="flex h-14 w-14 items-center justify-center rounded-full bg-slate-100 text-slate-500">
                            <FiPackage className="h-7 w-7" />
                        </div>
                        <h3 className="mt-4 text-lg font-bold text-slate-900">No rentals yet</h3>
                        <p className="mt-1 text-sm text-slate-500">Your rented products will appear here.</p>
                    </div>
                ) : (
                    <>
                        <div className="hidden overflow-x-auto md:block">
                            <table className="w-full">
                                <thead className="border-b border-slate-100 bg-slate-50">
                                    <tr>
                                        <th className="px-6 py-4 text-left text-[10px] font-bold uppercase tracking-wider text-slate-400">Product</th>
                                        <th className="px-6 py-4 text-left text-[10px] font-bold uppercase tracking-wider text-slate-400">Rental Period</th>
                                        <th className="px-6 py-4 text-left text-[10px] font-bold uppercase tracking-wider text-slate-400">Rented By</th>
                                        <th className="px-6 py-4 text-left text-[10px] font-bold uppercase tracking-wider text-slate-400">Total</th>
                                        <th className="px-6 py-4 text-left text-[10px] font-bold uppercase tracking-wider text-slate-400">Status</th>
                                        <th className="px-6 py-4 text-left text-[10px] font-bold uppercase tracking-wider text-slate-400">Overdue</th>
                                        <th className="px-6 py-4"></th>
                                    </tr>
                                </thead>

                                <tbody className="divide-y divide-slate-100">
                                    {rentalList.map((rental) => {
                                        const status = getStatus(rental)
                                        const product = rental.product

                                        return (
                                            <tr key={rental._id} className="transition hover:bg-slate-50">
                                                <td className="px-6 py-5">
                                                    <div className="flex items-center gap-3">
                                                        {product?.product_imgs?.[0] ? (
                                                            <img src={`${import.meta.env.VITE_APP_API_FILES}/uploads/product/${product.product_imgs[0]}`} alt={product?.product || 'Product'} className="h-12 w-12 rounded-xl object-cover" />
                                                        ) : (
                                                            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-slate-100 text-slate-500">
                                                                <FiPackage className="h-5 w-5" />
                                                            </div>
                                                        )}

                                                        <div>
                                                            <p className="font-bold text-slate-900">{product?.product || 'Product'}</p>
                                                            <p className="mt-1 text-xs text-slate-400">Rental ID: {String(rental._id).slice(-8)}</p>
                                                        </div>
                                                    </div>
                                                </td>

                                                <td className="px-6 py-5">
                                                    <p className="text-sm font-semibold text-slate-800">{formatDate(rental.startDateTime)}</p>
                                                    <p className="mt-1 text-xs text-slate-400">to {formatDate(rental.endDateTime)}</p>
                                                </td>

                                                <td className="px-6 py-5">
                                                    <p className="text-base text-slate-950">{rental?.user?.email}</p>
                                                </td>

                                                <td className="px-6 py-5">
                                                    <p className="text-base font-black text-slate-950">${Number(rental.totalAmount || 0).toFixed(2)}</p>
                                                    <p className="mt-1 text-xs text-slate-400">{Number(rental.totalHours || 0).toFixed(1)} hours</p>
                                                </td>

                                                <td className="px-6 py-5">
                                                    <span className={`inline-flex rounded-full px-3 py-1.5 text-xs font-bold ${status.className}`}>
                                                        {status.label}
                                                    </span>
                                                </td>

                                                <td className="px-6 py-5">
                                                    {status.isOverdue ? (
                                                        <div>
                                                            <span className="inline-flex rounded-full bg-red-50 px-3 py-1.5 text-xs font-bold text-red-600">
                                                                Yes
                                                            </span>
                                                            <p className="mt-2 text-xs font-semibold text-red-500">
                                                                {status.overdueDays} {status.overdueDays === 1 ? 'day' : 'days'} overdue
                                                            </p>
                                                        </div>
                                                    ) : (
                                                        <span className="inline-flex rounded-full bg-green-50 px-3 py-1.5 text-xs font-bold text-green-600">
                                                            No
                                                        </span>
                                                    )}
                                                </td>

                                                <td className="px-6 py-5">
                                                    <a href={`tool/${rental._id}`}>
                                                        <button
                                                            type="button"
                                                            className="rounded-lg bg-slate-950 px-4 py-2 text-xs font-bold text-white transition hover:bg-slate-800"
                                                        >
                                                            View
                                                        </button>
                                                    </a>
                                                </td>
                                            </tr>
                                        )
                                    })}
                                </tbody>
                            </table>
                        </div>

                        <div className="divide-y divide-slate-100 md:hidden">
                            {rentalList.map((rental) => {
                                const status = getStatus(rental)
                                const product = rental.product

                                return (
                                    <div key={rental._id} className="p-5">
                                        <div className="flex items-start gap-3">
                                            {product?.product_imgs?.[0] ? (
                                                <img src={`${import.meta.env.VITE_APP_API_FILES}/uploads/product/${product.product_imgs[0]}`} alt={product?.product || 'Product'} className="h-14 w-14 rounded-xl object-cover" />
                                            ) : (
                                                <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-slate-100 text-slate-500">
                                                    <FiPackage className="h-6 w-6" />
                                                </div>
                                            )}

                                            <div className="min-w-0 flex-1">
                                                <div className="flex items-start justify-between gap-3">
                                                    <div>
                                                        <h3 className="truncate font-bold text-slate-900">{product?.product || 'Product'}</h3>
                                                        <p className="mt-1 text-xs text-slate-400">#{String(rental._id).slice(-8)}</p>
                                                    </div>

                                                    <span className={`shrink-0 rounded-full px-2.5 py-1 text-[10px] font-bold ${status.className}`}>
                                                        {status.label}
                                                    </span>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="mt-5 grid grid-cols-2 gap-3">
                                            <div className="rounded-xl bg-slate-50 p-3">
                                                <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Period</p>
                                                <p className="mt-1 text-xs font-semibold text-slate-800">{formatDate(rental.startDateTime)}</p>
                                                <p className="text-xs text-slate-400">to {formatDate(rental.endDateTime)}</p>
                                            </div>

                                            <div className="rounded-xl bg-slate-50 p-3">
                                                <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Total</p>
                                                <p className="mt-1 text-lg font-black text-slate-950">${Number(rental.totalAmount || 0).toFixed(2)}</p>
                                            </div>
                                        </div>

                                        <div className={`mt-3 rounded-xl border p-3 ${status.isOverdue ? 'border-red-100 bg-red-50' : 'border-green-100 bg-green-50'}`}>
                                            <div className="flex items-center justify-between">
                                                <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Overdue</p>

                                                {status.isOverdue ? (
                                                    <span className="inline-flex rounded-full bg-red-50 px-3 py-1.5 text-xs font-bold text-red-600">
                                                        Yes
                                                    </span>
                                                ) : (
                                                    <span className="rounded-full bg-green-100 px-2.5 py-1 text-[10px] font-bold text-green-600">
                                                        No
                                                    </span>
                                                )}
                                            </div>

                                            {status.isOverdue && (
                                                <p className="mt-2 text-xs font-semibold text-red-500">
                                                    {status.overdueDays} {status.overdueDays === 1 ? 'day' : 'days'} overdue
                                                </p>
                                            )}

                                            <a href={`tool/${rental._id}`}>
                                                <button
                                                    type="button"
                                                    className="mt-3 flex w-full items-center justify-center rounded-lg bg-slate-950 px-3 py-2 text-xs font-bold text-white transition hover:bg-slate-800"
                                                >
                                                    View
                                                </button>
                                            </a>
                                        </div>
                                    </div>
                                )
                            })}
                        </div>
                    </>
                )}
            </div>
        </div>
    )
}

export default RentList