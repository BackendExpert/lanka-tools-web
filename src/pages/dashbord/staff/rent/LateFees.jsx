import React, { useEffect, useState } from 'react'
import API from '../../../../services/api'
import { FiAlertCircle, FiCalendar, FiClock, FiDollarSign, FiPackage, FiUser } from 'react-icons/fi'

const LateFees = () => {
    const token = localStorage.getItem('access_token')
    const [latefees, setLatefess] = useState([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState('')

    useEffect(() => {
        const fetchlatefees = async () => {
            try {
                const res = await API.get('/rentel/fetch-late-fees', {
                    headers: { Authorization: `Bearer ${token}` }
                })

                if (res.data.success === true) {
                    setLatefess(res.data.result || [])
                }
            } catch (err) {
                console.error(err)
                setError(err.response?.data?.message || 'Failed to load late fees')
            } finally {
                setLoading(false)
            }
        }

        if (token) fetchlatefees()
        else setLoading(false)
    }, [token])

    const formatDate = (date) => {
        if (!date) return 'N/A'

        return new Date(date).toLocaleDateString('en-US', {
            day: '2-digit',
            month: 'short',
            year: 'numeric'
        })
    }

    if (loading) {
        return (
            <div className="flex min-h-[500px] items-center justify-center">
                <div className="h-9 w-9 animate-spin rounded-full border-4 border-slate-200 border-t-yellow-500" />
            </div>
        )
    }

    return (
        <div className="w-full">
            <div className="mb-6 flex items-end justify-between">
                <div>
                    <p className="text-xs font-bold uppercase tracking-[0.2em] text-yellow-600">Payments</p>
                    <h1 className="mt-2 text-3xl font-black tracking-tight text-slate-950">Late Fees</h1>
                    <p className="mt-2 text-sm text-slate-500">View overdue charges from your rental records.</p>
                </div>

                <div className="hidden rounded-xl bg-slate-950 px-4 py-3 sm:block">
                    <p className="text-xs text-slate-400">Total Late Fees</p>
                    <p className="mt-1 text-xl font-black text-white">{latefees.length}</p>
                </div>
            </div>

            {error && (
                <div className="mb-5 flex items-center gap-3 rounded-xl border border-red-200 bg-red-50 p-4 text-sm font-semibold text-red-600">
                    <FiAlertCircle className="h-5 w-5 shrink-0" />
                    {error}
                </div>
            )}

            <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
                {latefees.length === 0 ? (
                    <div className="flex min-h-64 flex-col items-center justify-center px-6 text-center">
                        <div className="flex h-14 w-14 items-center justify-center rounded-full bg-green-50 text-green-500">
                            <FiDollarSign className="h-7 w-7" />
                        </div>
                        <h3 className="mt-4 text-lg font-bold text-slate-900">No late fees</h3>
                        <p className="mt-1 text-sm text-slate-500">You don't have any overdue charges.</p>
                    </div>
                ) : (
                    <>
                        <div className="hidden overflow-x-auto md:block">
                            <table className="w-full">
                                <thead className="border-b border-slate-100 bg-slate-50">
                                    <tr>
                                        <th className="px-6 py-4 text-left text-[10px] font-bold uppercase tracking-wider text-slate-400">Product</th>
                                        <th className="px-6 py-4 text-left text-[10px] font-bold uppercase tracking-wider text-slate-400">Customer</th>
                                        <th className="px-6 py-4 text-left text-[10px] font-bold uppercase tracking-wider text-slate-400">Rental</th>
                                        <th className="px-6 py-4 text-left text-[10px] font-bold uppercase tracking-wider text-slate-400">Overdue</th>
                                        <th className="px-6 py-4 text-left text-[10px] font-bold uppercase tracking-wider text-slate-400">Late Fee</th>
                                        <th className="px-6 py-4 text-left text-[10px] font-bold uppercase tracking-wider text-slate-400">Payment</th>
                                        <th className="px-6 py-4"></th>
                                    </tr>
                                </thead>

                                <tbody className="divide-y divide-slate-100">
                                    {latefees.map((fee) => {
                                        const product = fee.product
                                        const user = fee.user
                                        const rental = fee.rentel || fee.rental
                                        const rentalId = rental?._id || fee.rentel || fee.rental

                                        return (
                                            <tr key={fee._id} className="transition hover:bg-slate-50">
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
                                                            <p className="mt-1 text-xs text-slate-400">#{String(fee._id).slice(-8)}</p>
                                                        </div>
                                                    </div>
                                                </td>

                                                <td className="px-6 py-5">
                                                    <p className="text-sm font-semibold text-slate-900">{user?.name || user?.firstName || 'Customer'}</p>
                                                    <p className="mt-1 text-xs text-slate-400">{user?.email || 'N/A'}</p>
                                                </td>

                                                <td className="px-6 py-5">
                                                    <p className="text-sm font-semibold text-slate-800">{formatDate(rental?.startDateTime)}</p>
                                                    <p className="mt-1 text-xs text-slate-400">to {formatDate(rental?.endDateTime)}</p>
                                                </td>

                                                <td className="px-6 py-5">
                                                    <span className="inline-flex items-center gap-1.5 rounded-full bg-red-50 px-3 py-1.5 text-xs font-bold text-red-600">
                                                        <FiClock className="h-3.5 w-3.5" />
                                                        {fee.overdueDays || 0} {Number(fee.overdueDays) === 1 ? 'day' : 'days'}
                                                    </span>
                                                </td>

                                                <td className="px-6 py-5">
                                                    <p className="text-base font-black text-red-600">
                                                        ${Number(fee.override_cost || fee.overdueCost || 0).toFixed(2)}
                                                    </p>
                                                </td>

                                                <td className="px-6 py-5">
                                                    {fee.is_pay_overdue ? (
                                                        <span className="inline-flex rounded-full bg-green-50 px-3 py-1.5 text-xs font-bold text-green-600">Paid</span>
                                                    ) : (
                                                        <span className="inline-flex rounded-full bg-yellow-50 px-3 py-1.5 text-xs font-bold text-yellow-700">Unpaid</span>
                                                    )}
                                                </td>

                                                <td className="px-6 py-5">
                                                    <a href={`late-fee/${fee._id}`} className="inline-flex rounded-xl bg-slate-950 px-4 py-2 text-xs font-bold text-white transition hover:bg-yellow-500 hover:text-slate-950">
                                                        View
                                                    </a>
                                                </td>
                                            </tr>
                                        )
                                    })}
                                </tbody>
                            </table>
                        </div>

                        <div className="divide-y divide-slate-100 md:hidden">
                            {latefees.map((fee) => {
                                const product = fee.product
                                const user = fee.user
                                const rental = fee.rentel || fee.rental
                                const rentalId = rental?._id || fee.rentel || fee.rental
                                const overdueDays = fee.overdueDays || 0
                                const overdueCost = fee.override_cost || fee.overdueCost || 0

                                return (
                                    <div key={fee._id} className="p-5">
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
                                                        <p className="mt-1 text-xs text-slate-400">#{String(fee._id).slice(-8)}</p>
                                                    </div>

                                                    {fee.is_pay_overdue ? (
                                                        <span className="shrink-0 rounded-full bg-green-50 px-2.5 py-1 text-[10px] font-bold text-green-600">Paid</span>
                                                    ) : (
                                                        <span className="shrink-0 rounded-full bg-yellow-50 px-2.5 py-1 text-[10px] font-bold text-yellow-700">Unpaid</span>
                                                    )}
                                                </div>
                                            </div>
                                        </div>

                                        <div className="mt-5 rounded-xl bg-red-50 p-4">
                                            <div className="flex items-center justify-between">
                                                <div>
                                                    <p className="text-[10px] font-bold uppercase tracking-wider text-red-400">Late Fee</p>
                                                    <p className="mt-1 text-xl font-black text-red-600">${Number(overdueCost).toFixed(2)}</p>
                                                </div>
                                                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-red-100 text-red-600">
                                                    <FiDollarSign className="h-5 w-5" />
                                                </div>
                                            </div>
                                        </div>

                                        <div className="mt-3 grid grid-cols-2 gap-3">
                                            <div className="rounded-xl bg-slate-50 p-3">
                                                <div className="flex items-center gap-2">
                                                    <FiClock className="text-slate-400" />
                                                    <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Overdue</p>
                                                </div>
                                                <p className="mt-2 text-sm font-black text-red-600">{overdueDays} {overdueDays === 1 ? 'day' : 'days'}</p>
                                            </div>

                                            <div className="rounded-xl bg-slate-50 p-3">
                                                <div className="flex items-center gap-2">
                                                    <FiCalendar className="text-slate-400" />
                                                    <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Return</p>
                                                </div>
                                                <p className="mt-2 text-xs font-semibold text-slate-800">{formatDate(rental?.endDateTime)}</p>
                                            </div>
                                        </div>

                                        <div className="mt-3 rounded-xl bg-slate-50 p-3">
                                            <div className="flex items-center gap-2">
                                                <FiUser className="text-slate-400" />
                                                <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Customer</p>
                                            </div>
                                            <p className="mt-2 text-sm font-bold text-slate-900">{user?.name || user?.firstName || 'Customer'}</p>
                                            <p className="mt-1 break-all text-xs text-slate-500">{user?.email || 'N/A'}</p>
                                        </div>

                                        <a href={`/rentel/late-fee/${fee._id}`} className="mt-4 flex w-full items-center justify-center rounded-xl bg-slate-950 px-4 py-3 text-xs font-bold text-white transition hover:bg-yellow-500 hover:text-slate-950">
                                            View Rental
                                        </a>
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

export default LateFees