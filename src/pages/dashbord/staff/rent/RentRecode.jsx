import React, { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import API from '../../../../services/api'
import { FiArrowLeft, FiCalendar, FiClock, FiDollarSign, FiPackage, FiUser, FiCheckCircle, FiAlertCircle, FiCreditCard, FiRefreshCw } from 'react-icons/fi'
import Toast from '../../../../component/Toast/Toast'

const RentRecode = () => {
    const { id } = useParams()
    const navigate = useNavigate()
    const token = localStorage.getItem('access_token')
    const [rentalrecode, setRentalRecode] = useState(null)
    const [loading, setLoading] = useState(true)
    const [returning, setReturning] = useState(false)
    const [toast, setToast] = useState(null)

    const fetchrentalRecode = async () => {
        try {
            const res = await API.get(`/rentel/rent-recode/${id}`, {
                headers: { Authorization: `Bearer ${token}` }
            })
            if (res.data.success === true) setRentalRecode(res.data.result)
        } catch (error) {
            setToast({
                success: false,
                message: error.response?.data?.message || 'Failed to load rental record'
            })
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        if (token && id) fetchrentalRecode()
    }, [token, id])

    const formatDateTime = (date) => new Date(date).toLocaleString('en-US', { day: '2-digit', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit' })

    const product = rentalrecode?.product
    const user = rentalrecode?.user
    const overdue = rentalrecode?.overdue
    const calculatedOverdue = !rentalrecode?.is_returned && rentalrecode?.endDateTime && new Date() > new Date(rentalrecode.endDateTime)
    const isOverdue = rentalrecode?.is_returned ? Boolean(overdue?.isOverdue) : Boolean(overdue?.isOverdue || calculatedOverdue)
    const overdueDays = overdue?.overdueDays || (calculatedOverdue ? Math.ceil((new Date().getTime() - new Date(rentalrecode.endDateTime).getTime()) / (1000 * 60 * 60 * 24)) : 0)
    const overdueCost = Number(overdue?.overdueCost || 0)

    const headleReturnTool = async () => {
        setReturning(true)

        try {
            const res = await API.post(`/rentel/return-tool/${id}`, {}, {
                headers: { Authorization: `Bearer ${token}` }
            })

            if (res.data.success === true) {
                setToast({
                    success: true,
                    message: res.data.message
                })

                await fetchrentalRecode()
            }
        } catch (err) {
            setToast({
                success: false,
                message: err.response?.data?.message || 'Something went wrong'
            })
        } finally {
            setReturning(false)
        }
    }

    if (loading) return <div className="flex min-h-[500px] items-center justify-center"><div className="h-9 w-9 animate-spin rounded-full border-4 border-slate-200 border-t-yellow-500" /></div>

    if (!rentalrecode) return <div className="flex min-h-[500px] flex-col items-center justify-center text-center"><div className="flex h-16 w-16 items-center justify-center rounded-full bg-slate-100 text-slate-500"><FiPackage className="h-8 w-8" /></div><h2 className="mt-5 text-xl font-black text-slate-900">Rental Record Not Found</h2><button onClick={() => navigate(-1)} className="mt-5 rounded-xl bg-slate-950 px-5 py-3 text-sm font-bold text-white">Go Back</button></div>

    return (
        <div className="w-full">
            {toast && (
                <div className="fixed right-8 top-20 z-50">
                    <Toast success={toast.success} message={toast.message} onClose={() => setToast(null)} />
                </div>
            )}

            <div className="mb-6 flex items-center justify-between gap-4">
                <div>
                    <button onClick={() => navigate(-1)} className="mb-4 flex items-center gap-2 text-sm font-semibold text-slate-500 transition hover:text-slate-950"><FiArrowLeft /> Back to Rentals</button>
                    <p className="text-xs font-bold uppercase tracking-[0.2em] text-yellow-600">Rental Details</p>
                    <h1 className="mt-2 text-3xl font-black tracking-tight text-slate-950">Rental Record</h1>
                    <p className="mt-2 text-sm text-slate-500">#{String(rentalrecode._id).slice(-8)}</p>
                </div>

                <div className={`hidden rounded-full px-4 py-2 text-sm font-bold sm:inline-flex ${rentalrecode.is_returned ? 'bg-slate-100 text-slate-600' : isOverdue ? 'bg-red-50 text-red-600' : 'bg-green-50 text-green-600'}`}>
                    {rentalrecode.is_returned ? 'Returned' : isOverdue ? 'Overdue' : 'Active'}
                </div>
            </div>

            <div className="grid gap-6 lg:grid-cols-3">
                <div className="space-y-6 lg:col-span-2">
                    <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
                        <div className="flex flex-col gap-5 p-5 sm:flex-row sm:p-6">
                            {product?.product_imgs?.[0] ? (
                                <img src={`${import.meta.env.VITE_APP_API_FILES}/uploads/product/${product.product_imgs[0]}`} alt={product?.product || 'Product'} className="h-28 w-28 rounded-2xl object-cover sm:h-32 sm:w-32" />
                            ) : (
                                <div className="flex h-28 w-28 items-center justify-center rounded-2xl bg-slate-100 text-slate-400 sm:h-32 sm:w-32"><FiPackage className="h-10 w-10" /></div>
                            )}

                            <div className="flex-1">
                                <p className="text-xs font-bold uppercase tracking-wider text-slate-400">Rented Product</p>
                                <h2 className="mt-2 text-2xl font-black text-slate-950">{product?.product || 'Product'}</h2>
                                <p className="mt-2 text-sm text-slate-500">{product?.description || 'Rental product details'}</p>
                                <div className="mt-4 flex flex-wrap gap-2">
                                    <span className="rounded-lg bg-slate-100 px-3 py-1.5 text-xs font-semibold text-slate-600">ID: {String(product?._id || '').slice(-8)}</span>
                                    {product?.category?.name && <span className="rounded-lg bg-yellow-50 px-3 py-1.5 text-xs font-semibold text-yellow-700">{product.category.name}</span>}
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6">
                        <div className="flex items-center gap-3">
                            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-slate-100 text-slate-600"><FiCalendar /></div>
                            <div><h2 className="font-black text-slate-950">Rental Period</h2><p className="text-xs text-slate-400">Scheduled rental duration</p></div>
                        </div>

                        <div className="mt-6 grid gap-4 sm:grid-cols-2">
                            <div className="rounded-xl bg-slate-50 p-4">
                                <p className="text-xs font-bold uppercase tracking-wider text-slate-400">Start</p>
                                <p className="mt-2 text-sm font-bold text-slate-900">{formatDateTime(rentalrecode.startDateTime)}</p>
                            </div>

                            <div className="rounded-xl bg-slate-50 p-4">
                                <p className="text-xs font-bold uppercase tracking-wider text-slate-400">Expected Return</p>
                                <p className="mt-2 text-sm font-bold text-slate-900">{formatDateTime(rentalrecode.endDateTime)}</p>
                            </div>
                        </div>

                        <div className="mt-4 grid grid-cols-3 gap-3">
                            <div className="rounded-xl border border-slate-100 p-4 text-center"><FiClock className="mx-auto text-slate-400" /><p className="mt-2 text-lg font-black text-slate-950">{Number(rentalrecode.totalHours || 0).toFixed(1)}</p><p className="text-xs text-slate-400">Hours</p></div>
                            <div className="rounded-xl border border-slate-100 p-4 text-center"><FiCalendar className="mx-auto text-slate-400" /><p className="mt-2 text-lg font-black text-slate-950">{Number(rentalrecode.totalDays || 0).toFixed(1)}</p><p className="text-xs text-slate-400">Days</p></div>
                            <div className="rounded-xl border border-slate-100 p-4 text-center"><FiCalendar className="mx-auto text-slate-400" /><p className="mt-2 text-lg font-black text-slate-950">{Number(rentalrecode.totalWeeks || 0).toFixed(1)}</p><p className="text-xs text-slate-400">Weeks</p></div>
                        </div>
                    </div>

                    {isOverdue && !rentalrecode.is_returned && (
                        <div className="rounded-2xl border border-red-200 bg-red-50 p-5 sm:p-6">
                            <div className="flex items-start gap-4">
                                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-red-100 text-red-600"><FiAlertCircle className="h-6 w-6" /></div>
                                <div>
                                    <h2 className="font-black text-red-800">Rental is Overdue</h2>
                                    <p className="mt-1 text-sm text-red-600">This product is currently {overdueDays} {overdueDays === 1 ? 'day' : 'days'} overdue.</p>
                                    <p className="mt-3 text-xs font-semibold text-red-500">Overdue charges will be calculated when the product is returned.</p>
                                </div>
                            </div>
                        </div>
                    )}

                    {rentalrecode.is_returned && overdue?.isOverdue && (
                        <div className="rounded-2xl border border-red-200 bg-red-50 p-5 sm:p-6">
                            <div className="flex items-start gap-4">
                                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-red-100 text-red-600"><FiAlertCircle className="h-6 w-6" /></div>
                                <div>
                                    <h2 className="font-black text-red-800">Overdue Charges</h2>
                                    <p className="mt-1 text-sm text-red-600">{overdue.overdueDays} {overdue.overdueDays === 1 ? 'day' : 'days'} overdue</p>
                                    <p className="mt-2 text-xl font-black text-red-700">${overdueCost.toFixed(2)}</p>
                                </div>
                            </div>
                        </div>
                    )}

                    {!rentalrecode.is_returned && (
                        <button onClick={headleReturnTool} disabled={returning} className="flex w-full items-center justify-center gap-2 rounded-2xl bg-slate-950 px-5 py-4 text-sm font-black text-white transition hover:bg-slate-800 disabled:cursor-not-allowed disabled:opacity-60">
                            {returning ? <FiRefreshCw className="animate-spin" /> : <FiCheckCircle />}
                            {returning ? 'Processing Return...' : 'Return Tool'}
                        </button>
                    )}
                </div>

                <div className="space-y-6">
                    <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6">
                        <div className="flex items-center gap-3"><div className="flex h-10 w-10 items-center justify-center rounded-xl bg-slate-950 text-white"><FiDollarSign /></div><div><h2 className="font-black text-slate-950">Payment Summary</h2><p className="text-xs text-slate-400">Rental cost breakdown</p></div></div>

                        <div className="mt-6 space-y-4">
                            <div className="flex justify-between text-sm"><span className="text-slate-500">Subtotal</span><span className="font-bold text-slate-900">${Number(rentalrecode.subtotal || 0).toFixed(2)}</span></div>
                            <div className="flex justify-between text-sm"><span className="text-slate-500">VAT ({Number(rentalrecode.vatRate || 0)}%)</span><span className="font-bold text-slate-900">${Number(rentalrecode.vatAmount || 0).toFixed(2)}</span></div>

                            {rentalrecode.is_returned && overdue?.isOverdue && (
                                <div className="flex justify-between text-sm"><span className="text-red-500">Overdue Cost</span><span className="font-bold text-red-600">+${overdueCost.toFixed(2)}</span></div>
                            )}

                            <div className="border-t border-slate-100 pt-4">
                                <div className="flex justify-between">
                                    <span className="font-bold text-slate-700">Total</span>
                                    <span className="text-2xl font-black text-slate-950">${Number(rentalrecode.totalAmount || 0).toFixed(2)}</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6">
                        <div className="flex items-center gap-3"><div className="flex h-10 w-10 items-center justify-center rounded-xl bg-slate-100 text-slate-600"><FiUser /></div><div><h2 className="font-black text-slate-950">Customer</h2><p className="text-xs text-slate-400">Rental account</p></div></div>

                        <div className="mt-5 rounded-xl bg-slate-50 p-4">
                            <p className="text-sm font-bold text-slate-900">{user?.name || user?.firstName || 'Customer'}</p>
                            <p className="mt-1 break-all text-sm text-slate-500">{user?.email || 'N/A'}</p>
                            <p className="mt-3 text-xs text-slate-400">User ID</p>
                            <p className="mt-1 break-all text-xs font-semibold text-slate-700">{user?._id || 'N/A'}</p>
                        </div>
                    </div>

                    <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6">
                        <div className="flex items-center gap-3"><div className="flex h-10 w-10 items-center justify-center rounded-xl bg-slate-100 text-slate-600"><FiCreditCard /></div><div><h2 className="font-black text-slate-950">Status</h2><p className="text-xs text-slate-400">Current rental state</p></div></div>

                        <div className={`mt-5 flex items-center gap-3 rounded-xl p-4 ${rentalrecode.is_returned ? 'bg-slate-50' : isOverdue ? 'bg-red-50' : 'bg-green-50'}`}>
                            <FiCheckCircle className={rentalrecode.is_returned ? 'text-slate-500' : isOverdue ? 'text-red-500' : 'text-green-500'} />
                            <div>
                                <p className={`text-sm font-black ${rentalrecode.is_returned ? 'text-slate-700' : isOverdue ? 'text-red-700' : 'text-green-700'}`}>{rentalrecode.is_returned ? 'Returned' : isOverdue ? 'Overdue' : 'Active'}</p>
                                <p className="text-xs text-slate-500">{rentalrecode.is_returned ? 'Product has been returned' : isOverdue ? `${overdueDays} ${overdueDays === 1 ? 'day' : 'days'} overdue` : 'Product is currently rented'}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default RentRecode