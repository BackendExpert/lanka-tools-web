import React, { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import API from '../../../../services/api'
import { FiArrowLeft, FiCalendar, FiDollarSign, FiPackage, FiUser, FiCreditCard, FiAlertCircle } from 'react-icons/fi'
import Toast from '../../../../component/Toast/Toast'

const LateFee = () => {
    const { id } = useParams()
    const navigate = useNavigate()
    const token = localStorage.getItem('access_token')
    const [latefee, setlatefee] = useState(null)
    const [loading, setLoading] = useState(true)
    const [requesting, setRequesting] = useState(false)
    const [toast, setToast] = useState(false)

    useEffect(() => {
        const fetchlatefee = async () => {
            try {
                const res = await API.get(`/rentel/fetch-late-fee/${id}`, {
                    headers: { Authorization: `Bearer ${token}` }
                })
                if (res.data.success === true) {
                    setlatefee(res.data.result)
                }
            } catch (error) {
                console.error(error)
            } finally {
                setLoading(false)
            }
        }

        if (token && id) fetchlatefee()
    }, [token, id])

    const formatDateTime = (date) => new Date(date).toLocaleString('en-US', {
        day: '2-digit',
        month: 'short',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
    })

    const headleRequesttoPay = async (e) => {
        e.preventDefault()

        if (requesting) return

        setRequesting(true)

        try {
            const res = await API.post(
                `/rentel/request-to-pay-overdue/${id}`,
                {},
                {
                    headers: { Authorization: `Bearer ${token}` }
                }
            )

            if (res.data.success === true) {
                setToast({
                    success: true,
                    message: res.data.message,
                })

                setTimeout(() => {
                    window.location.reload()
                }, 3000)
            }
        } catch (error) {
            setToast({
                success: false,
                message:
                    err.response?.data?.message ||
                    'Something went wrong',
            })
        } finally {
            setRequesting(false)
        }
    }

    if (loading) {
        return (
            <div className="flex min-h-[500px] items-center justify-center">
                <div className="h-9 w-9 animate-spin rounded-full border-4 border-slate-200 border-t-yellow-500" />
            </div>
        )
    }

    if (!latefee) {
        return (
            <div className="flex min-h-[500px] flex-col items-center justify-center text-center">
                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-slate-100 text-slate-500">
                    <FiAlertCircle className="h-8 w-8" />
                </div>
                <h2 className="mt-5 text-xl font-black text-slate-900">Late Fee Record Not Found</h2>
                <button
                    onClick={() => navigate(-1)}
                    className="mt-5 rounded-xl bg-slate-950 px-5 py-3 text-sm font-bold text-white"
                >
                    Go Back
                </button>
            </div>
        )
    }

    const overdue = latefee.overdue || latefee
    const rental = latefee.rental || latefee.rentel
    const user = latefee.user || rental?.user
    const product = latefee.product || rental?.product

    return (
        <div className="w-full">
            {toast && (
                <div className="fixed top-20 right-8 z-50">
                    <Toast
                        success={toast.success}
                        message={toast.message}
                        onClose={() => setToast(null)}
                    />
                </div>
            )}
            <div className="mb-6">
                <button
                    onClick={() => navigate(-1)}
                    className="mb-4 flex items-center gap-2 text-sm font-semibold text-slate-500 transition hover:text-slate-950"
                >
                    <FiArrowLeft />
                    Back to Late Fees
                </button>

                <p className="text-xs font-bold uppercase tracking-[0.2em] text-yellow-600">
                    Late Fee Details
                </p>

                <h1 className="mt-2 text-3xl font-black tracking-tight text-slate-950">
                    Overdue Record
                </h1>

                <p className="mt-2 text-sm text-slate-500">
                    #{String(overdue._id || id).slice(-8)}
                </p>
            </div>

            <div className="grid gap-6 lg:grid-cols-3">
                <div className="space-y-6 lg:col-span-2">
                    <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
                        <div className="flex flex-col gap-5 p-5 sm:flex-row sm:p-6">
                            {product?.product_imgs?.[0] ? (
                                <img
                                    src={`${import.meta.env.VITE_APP_API_FILES}/uploads/product/${product.product_imgs[0]}`}
                                    alt={product?.product || 'Product'}
                                    className="h-28 w-28 rounded-2xl object-cover sm:h-32 sm:w-32"
                                />
                            ) : (
                                <div className="flex h-28 w-28 items-center justify-center rounded-2xl bg-slate-100 text-slate-400 sm:h-32 sm:w-32">
                                    <FiPackage className="h-10 w-10" />
                                </div>
                            )}

                            <div className="flex-1">
                                <p className="text-xs font-bold uppercase tracking-wider text-slate-400">
                                    Rented Product
                                </p>

                                <h2 className="mt-2 text-2xl font-black text-slate-950">
                                    {product?.product || 'Product'}
                                </h2>

                                <p className="mt-2 text-sm text-slate-500">
                                    {product?.description || 'Rental product details'}
                                </p>

                                <div className="mt-4 flex flex-wrap gap-2">
                                    <span className="rounded-lg bg-slate-100 px-3 py-1.5 text-xs font-semibold text-slate-600">
                                        Product ID: {String(product?._id || '').slice(-8)}
                                    </span>

                                    <span className="rounded-lg bg-red-50 px-3 py-1.5 text-xs font-semibold text-red-600">
                                        Overdue
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6">
                        <div className="flex items-center gap-3">
                            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-slate-100 text-slate-600">
                                <FiCalendar />
                            </div>

                            <div>
                                <h2 className="font-black text-slate-950">
                                    Rental Information
                                </h2>

                                <p className="text-xs text-slate-400">
                                    Original rental period
                                </p>
                            </div>
                        </div>

                        <div className="mt-6 grid gap-4 sm:grid-cols-2">
                            <div className="rounded-xl bg-slate-50 p-4">
                                <p className="text-xs font-bold uppercase tracking-wider text-slate-400">
                                    Start Date
                                </p>

                                <p className="mt-2 text-sm font-bold text-slate-900">
                                    {rental?.startDateTime
                                        ? formatDateTime(rental.startDateTime)
                                        : 'N/A'}
                                </p>
                            </div>

                            <div className="rounded-xl bg-slate-50 p-4">
                                <p className="text-xs font-bold uppercase tracking-wider text-slate-400">
                                    Expected Return
                                </p>

                                <p className="mt-2 text-sm font-bold text-slate-900">
                                    {rental?.endDateTime
                                        ? formatDateTime(rental.endDateTime)
                                        : 'N/A'}
                                </p>
                            </div>
                        </div>
                    </div>

                    <div className="rounded-2xl border border-red-200 bg-red-50 p-5 sm:p-6">
                        <div className="flex items-start gap-4">
                            <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-red-100 text-red-600">
                                <FiAlertCircle className="h-6 w-6" />
                            </div>

                            <div className="flex-1">
                                <h2 className="font-black text-red-800">
                                    Overdue Information
                                </h2>

                                <div className="mt-4 grid gap-4 sm:grid-cols-3">
                                    <div>
                                        <p className="text-xs font-bold uppercase tracking-wider text-red-400">
                                            Overdue Days
                                        </p>

                                        <p className="mt-1 text-2xl font-black text-red-700">
                                            {overdue.overdueDays || 0}
                                        </p>
                                    </div>

                                    <div>
                                        <p className="text-xs font-bold uppercase tracking-wider text-red-400">
                                            Overdue Percentage
                                        </p>

                                        <p className="mt-1 text-2xl font-black text-red-700">
                                            {Number(overdue.overduePercentage || 0).toFixed(2)}%
                                        </p>
                                    </div>

                                    <div>
                                        <p className="text-xs font-bold uppercase tracking-wider text-red-400">
                                            Overdue Cost
                                        </p>

                                        <p className="mt-1 text-2xl font-black text-red-700">
                                            ${Number(overdue.override_cost ?? overdue.overdueCost ?? 0).toFixed(2)}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="space-y-6">
                    <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6">
                        <div className="flex items-center gap-3">
                            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-slate-950 text-white">
                                <FiDollarSign />
                            </div>

                            <div>
                                <h2 className="font-black text-slate-950">
                                    Late Fee
                                </h2>

                                <p className="text-xs text-slate-400">
                                    Payment information
                                </p>
                            </div>
                        </div>

                        <div className="mt-6">
                            <p className="text-xs font-bold uppercase tracking-wider text-slate-400">
                                Overdue Cost
                            </p>

                            <p className="mt-2 text-3xl font-black text-red-600">
                                ${Number(overdue.override_cost ?? overdue.overdueCost ?? 0).toFixed(2)}
                            </p>
                        </div>

                        <div className="mt-5 border-t border-slate-100 pt-5">
                            <div className="flex items-center justify-between">
                                <span className="text-sm text-slate-500">
                                    Payment Status
                                </span>

                                <span className={`rounded-full px-3 py-1.5 text-xs font-bold ${overdue.is_pay_overdue
                                    ? 'bg-green-50 text-green-600'
                                    : 'bg-red-50 text-red-600'
                                    }`}>
                                    {overdue.is_pay_overdue ? 'Paid' : 'Unpaid'}
                                </span>
                            </div>
                        </div>
                    </div>

                    <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6">
                        <div className="flex items-center gap-3">
                            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-slate-100 text-slate-600">
                                <FiUser />
                            </div>

                            <div>
                                <h2 className="font-black text-slate-950">
                                    Customer
                                </h2>

                                <p className="text-xs text-slate-400">
                                    Rental account
                                </p>
                            </div>
                        </div>

                        <div className="mt-5 rounded-xl bg-slate-50 p-4">
                            <p className="text-sm font-bold text-slate-900">
                                {user?.name || user?.firstName || 'Customer'}
                            </p>

                            <p className="mt-1 break-all text-sm text-slate-500">
                                {user?.email || 'N/A'}
                            </p>

                            <p className="mt-2 text-xs text-slate-400">
                                User ID: {String(user?._id || '').slice(-8)}
                            </p>
                        </div>
                    </div>

                    <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6">
                        <div className="flex items-center gap-3">
                            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-slate-100 text-slate-600">
                                <FiCreditCard />
                            </div>

                            <div>
                                <h2 className="font-black text-slate-950">
                                    Rental Status
                                </h2>

                                <p className="text-xs text-slate-400">
                                    Current state
                                </p>
                            </div>
                        </div>

                        <div className="mt-5 flex items-center gap-3 rounded-xl bg-red-50 p-4">
                            <FiAlertCircle className="text-red-500" />

                            <div>
                                <p className="text-sm font-black text-red-700">
                                    Overdue
                                </p>

                                <p className="text-xs text-slate-500">
                                    {overdue.overdueDays || 0} {(overdue.overdueDays || 0) === 1 ? 'day' : 'days'} overdue
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="mt-8 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6">
                <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                    <div>
                        <h2 className="text-lg font-black text-slate-950">
                            Overdue Payment
                        </h2>

                        <p className="mt-1 text-sm text-slate-500">
                            Send a payment request to the rental customer.
                        </p>
                    </div>

                    {!overdue.is_pay_overdue ? (
                        <button
                            type="button"
                            onClick={headleRequesttoPay}
                            disabled={requesting}
                            className="rounded-xl bg-slate-950 px-5 py-3 text-sm font-bold text-white transition hover:bg-slate-800 disabled:cursor-not-allowed disabled:opacity-50"
                        >
                            {requesting ? 'Sending...' : 'Request to Pay'}
                        </button>
                    ) : (
                        <span className="rounded-xl bg-green-50 px-5 py-3 text-sm font-bold text-green-600">
                            Already Paid
                        </span>
                    )}
                </div>
            </div>
        </div>
    )
}

export default LateFee