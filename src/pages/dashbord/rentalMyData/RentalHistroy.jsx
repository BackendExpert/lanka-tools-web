import React, { useEffect, useState } from 'react'
import API from '../../../services/api'

const RentalHistroy = () => {
    const token = localStorage.getItem('access_token')
    const [rentaltools, setRentalTools] = useState([])

    useEffect(() => {
        const fetchmyretaltools = async () => {
            try {
                const res = await API.get('/rentel/my-rental-tools', {
                    headers: { Authorization: `Bearer ${token}` }
                })
                if (res.data.success === true) {
                    setRentalTools(res.data.result)
                }
            } catch (error) {
                console.error(error)
            }
        }
        if (token) fetchmyretaltools()
    }, [token])

    const formatDate = (date) => {
        if (!date) return 'N/A'
        return new Date(date).toLocaleDateString('en-GB', {
            day: '2-digit',
            month: 'short',
            year: 'numeric'
        })
    }

    return (
        <div className="w-full">
            <div className="mb-6">
                <p className="text-xs font-bold uppercase tracking-[0.2em] text-yellow-600">My Rentals</p>
                <h1 className="mt-2 text-3xl font-black tracking-tight text-slate-950">Rental History</h1>
                <p className="mt-2 text-sm text-slate-500">View your complete rental history and overdue payments</p>
            </div>

            <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
                <div className="hidden overflow-x-auto md:block">
                    <table className="w-full">
                        <thead className="border-b border-slate-200 bg-slate-50">
                            <tr>
                                <th className="px-5 py-4 text-left text-xs font-bold uppercase tracking-wider text-slate-500">Tool</th>
                                <th className="px-5 py-4 text-left text-xs font-bold uppercase tracking-wider text-slate-500">Rent Date</th>
                                <th className="px-5 py-4 text-left text-xs font-bold uppercase tracking-wider text-slate-500">Return Date</th>
                                <th className="px-5 py-4 text-left text-xs font-bold uppercase tracking-wider text-slate-500">Rental Cost</th>
                                <th className="px-5 py-4 text-left text-xs font-bold uppercase tracking-wider text-slate-500">Overdue Cost</th>
                                <th className="px-5 py-4 text-left text-xs font-bold uppercase tracking-wider text-slate-500">Status</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100">
                            {rentaltools.length > 0 ? rentaltools.map((rental) => (
                                <tr key={rental._id} className="transition hover:bg-slate-50">
                                    <td className="px-5 py-4">
                                        <div className="flex items-center gap-3">
                                            {rental.product?.product_imgs?.[0] ? (
                                                <img src={`${import.meta.env.VITE_APP_API_FILES}/uploads/product/${rental.product.product_imgs[0]}`} alt={rental.product?.product} className="h-12 w-12 rounded-xl object-cover" />
                                            ) : (
                                                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-slate-100 text-sm font-black text-slate-400">N/A</div>
                                            )}
                                            <div>
                                                <p className="font-bold text-slate-900">{rental.product?.product || 'Product'}</p>
                                                <p className="text-xs text-slate-400">#{String(rental._id).slice(-8)}</p>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-5 py-4 text-sm font-semibold text-slate-700">{formatDate(rental.startDateTime)}</td>
                                    <td className="px-5 py-4 text-sm font-semibold text-slate-700">{formatDate(rental.endDateTime)}</td>
                                    <td className="px-5 py-4 text-sm font-black text-slate-900">${Number(rental.totalAmount || 0).toFixed(2)}</td>
                                    <td className="px-5 py-4">
                                        {rental.overdue ? (
                                            <div>
                                                <p className="font-black text-red-600">${Number(rental.overdue.override_cost || 0).toFixed(2)}</p>
                                                <p className={`text-xs font-semibold ${rental.overdue.is_pay_overdue ? 'text-green-600' : 'text-red-500'}`}>
                                                    {rental.overdue.is_pay_overdue ? 'Paid' : 'Unpaid'}
                                                </p>
                                            </div>
                                        ) : (
                                            <span className="text-sm font-semibold text-slate-400">No Overdue</span>
                                        )}
                                    </td>
                                    <td className="px-5 py-4">
                                        {rental.is_returned ? (
                                            <span className="rounded-full bg-green-50 px-3 py-1.5 text-xs font-bold text-green-600">Returned</span>
                                        ) : rental.overdue && !rental.overdue.is_pay_overdue ? (
                                            <span className="rounded-full bg-red-50 px-3 py-1.5 text-xs font-bold text-red-600">Overdue</span>
                                        ) : (
                                            <span className="rounded-full bg-yellow-50 px-3 py-1.5 text-xs font-bold text-yellow-600">Active</span>
                                        )}
                                    </td>
                                </tr>
                            )) : (
                                <tr>
                                    <td colSpan="6" className="px-5 py-16 text-center">
                                        <p className="text-lg font-black text-slate-900">No Rental History</p>
                                        <p className="mt-1 text-sm text-slate-500">You don't have any rental records.</p>
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>

                <div className="block md:hidden">
                    {rentaltools.length > 0 ? rentaltools.map((rental) => (
                        <div key={rental._id} className="border-b border-slate-100 p-4 last:border-b-0">
                            <div className="flex items-start gap-3">
                                {rental.product?.product_imgs?.[0] ? (
                                    <img src={`${import.meta.env.VITE_APP_API_FILES}/uploads/product/${rental.product.product_imgs[0]}`} alt={rental.product?.product} className="h-16 w-16 shrink-0 rounded-xl object-cover" />
                                ) : (
                                    <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-xl bg-slate-100 text-xs font-black text-slate-400">N/A</div>
                                )}

                                <div className="min-w-0 flex-1">
                                    <div className="flex items-start justify-between gap-3">
                                        <div className="min-w-0">
                                            <p className="truncate font-black text-slate-900">{rental.product?.product || 'Product'}</p>
                                            <p className="mt-1 text-xs text-slate-400">#{String(rental._id).slice(-8)}</p>
                                        </div>

                                        {rental.is_returned ? (
                                            <span className="shrink-0 rounded-full bg-green-50 px-2.5 py-1 text-xs font-bold text-green-600">Returned</span>
                                        ) : rental.overdue && !rental.overdue.is_pay_overdue ? (
                                            <span className="shrink-0 rounded-full bg-red-50 px-2.5 py-1 text-xs font-bold text-red-600">Overdue</span>
                                        ) : (
                                            <span className="shrink-0 rounded-full bg-yellow-50 px-2.5 py-1 text-xs font-bold text-yellow-600">Active</span>
                                        )}
                                    </div>

                                    <div className="mt-4 grid grid-cols-2 gap-3">
                                        <div>
                                            <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Rent Date</p>
                                            <p className="mt-1 text-xs font-semibold text-slate-700">{formatDate(rental.startDateTime)}</p>
                                        </div>
                                        <div>
                                            <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Return Date</p>
                                            <p className="mt-1 text-xs font-semibold text-slate-700">{formatDate(rental.endDateTime)}</p>
                                        </div>
                                    </div>

                                    <div className="mt-4 grid grid-cols-2 gap-3 border-t border-slate-100 pt-3">
                                        <div>
                                            <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Rental Cost</p>
                                            <p className="mt-1 text-base font-black text-slate-900">${Number(rental.totalAmount || 0).toFixed(2)}</p>
                                        </div>
                                        <div>
                                            <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Overdue Cost</p>
                                            {rental.overdue ? (
                                                <div>
                                                    <p className="mt-1 text-base font-black text-red-600">${Number(rental.overdue.override_cost || 0).toFixed(2)}</p>
                                                    <p className={`text-[10px] font-semibold ${rental.overdue.is_pay_overdue ? 'text-green-600' : 'text-red-500'}`}>
                                                        {rental.overdue.is_pay_overdue ? 'Paid' : 'Unpaid'}
                                                    </p>
                                                </div>
                                            ) : (
                                                <p className="mt-1 text-xs font-semibold text-slate-400">No Overdue</p>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )) : (
                        <div className="px-5 py-16 text-center">
                            <p className="text-lg font-black text-slate-900">No Rental History</p>
                            <p className="mt-1 text-sm text-slate-500">You don't have any rental records.</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}

export default RentalHistroy