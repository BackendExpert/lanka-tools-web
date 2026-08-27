import React, { useEffect, useState } from 'react'
import API from '../../../services/api'

const CurrntRentalTools = () => {
    const token = localStorage.getItem('access_token')
    const [rentaltools, setRentalTools] = useState([])

    useEffect(() => {
        const fetchmyretaltools = async () => {
            try {
                const res = await API.get('/rentel/my-rental-tools', {
                    headers: { Authorization: `Bearer ${token}` }
                })
                if (res.data.success === true) {
                    setRentalTools(res.data.result.filter(item => item.is_returned === false))
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
                <h1 className="mt-2 text-3xl font-black tracking-tight text-slate-950">Current Rental Tools</h1>
                <p className="mt-2 text-sm text-slate-500">Tools currently rented by you</p>
            </div>

            <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
                <div className="hidden overflow-x-auto md:block">
                    <table className="w-full">
                        <thead className="border-b border-slate-200 bg-slate-50">
                            <tr>
                                <th className="px-5 py-4 text-left text-xs font-bold uppercase tracking-wider text-slate-500">Tool</th>
                                <th className="px-5 py-4 text-left text-xs font-bold uppercase tracking-wider text-slate-500">Start Date</th>
                                <th className="px-5 py-4 text-left text-xs font-bold uppercase tracking-wider text-slate-500">Return Date</th>
                                <th className="px-5 py-4 text-left text-xs font-bold uppercase tracking-wider text-slate-500">Total Amount</th>
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
                                        <span className="rounded-full bg-yellow-50 px-3 py-1.5 text-xs font-bold text-yellow-600">Active</span>
                                    </td>
                                </tr>
                            )) : (
                                <tr>
                                    <td colSpan="6" className="px-5 py-16 text-center">
                                        <p className="text-lg font-black text-slate-900">No Current Rental Tools</p>
                                        <p className="mt-1 text-sm text-slate-500">You don't have any active rental tools.</p>
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
                                        <span className="shrink-0 rounded-full bg-yellow-50 px-2.5 py-1 text-xs font-bold text-yellow-600">Active</span>
                                    </div>

                                    <div className="mt-4 grid grid-cols-2 gap-3">
                                        <div>
                                            <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Start Date</p>
                                            <p className="mt-1 text-xs font-semibold text-slate-700">{formatDate(rental.startDateTime)}</p>
                                        </div>
                                        <div>
                                            <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Return Date</p>
                                            <p className="mt-1 text-xs font-semibold text-slate-700">{formatDate(rental.endDateTime)}</p>
                                        </div>
                                    </div>

                                    <div className="mt-4 flex items-center justify-between border-t border-slate-100 pt-3">
                                        <div>
                                            <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Total Amount</p>
                                            <p className="mt-1 text-base font-black text-slate-900">${Number(rental.totalAmount || 0).toFixed(2)}</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )) : (
                        <div className="px-5 py-16 text-center">
                            <p className="text-lg font-black text-slate-900">No Current Rental Tools</p>
                            <p className="mt-1 text-sm text-slate-500">You don't have any active rental tools.</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}

export default CurrntRentalTools