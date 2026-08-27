import React, { useEffect, useState } from 'react'
import API from '../../../services/api'
import Toast from '../../../component/Toast/Toast'
import DefaultButton from '../../../component/Buttons/DefaultButton'
import { loadStripe } from '@stripe/stripe-js'
import { Elements, CardElement, useStripe, useElements } from '@stripe/react-stripe-js'
import { FiLock } from 'react-icons/fi'

const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY)

const MyLateFees = () => {
    const token = localStorage.getItem('access_token')
    const [latefees, setLateFees] = useState([])
    const [loading, setLoading] = useState(true)
    const [paymentLoading, setPaymentLoading] = useState(false)
    const [toast, setToast] = useState(null)

    useEffect(() => {
        const fetchmyLateFees = async () => {
            try {
                const res = await API.get('/rentel/my-late-fees', {
                    headers: { Authorization: `Bearer ${token}` }
                })
                if (res.data.success === true) {
                    setLateFees(res.data.result)
                }
            } catch (error) {
                console.error(error)
                setToast({
                    success: false,
                    message: error.response?.data?.message || 'Failed to fetch late fees'
                })
            } finally {
                setLoading(false)
            }
        }
        if (token) fetchmyLateFees()
    }, [token])

    const formatDate = (date) => {
        if (!date) return 'N/A'
        return new Date(date).toLocaleDateString('en-GB', {
            day: '2-digit',
            month: 'short',
            year: 'numeric'
        })
    }

    const unpaidFees = latefees.filter(item => !item.is_pay_overdue)

    const totalOverdue = unpaidFees.reduce(
        (total, item) => total + Number(item.override_cost || 0),
        0
    )

    if (loading) {
        return (
            <div className="flex min-h-[400px] items-center justify-center">
                <div className="h-9 w-9 animate-spin rounded-full border-4 border-slate-200 border-t-yellow-500" />
            </div>
        )
    }

    return (
        <Elements stripe={stripePromise}>
            <MyLateFeesContent
                latefees={latefees}
                unpaidFees={unpaidFees}
                totalOverdue={totalOverdue}
                formatDate={formatDate}
                token={token}
                paymentLoading={paymentLoading}
                setPaymentLoading={setPaymentLoading}
                toast={toast}
                setToast={setToast}
                setLateFees={setLateFees}
            />
        </Elements>
    )
}

const MyLateFeesContent = ({
    latefees,
    unpaidFees,
    totalOverdue,
    formatDate,
    token,
    paymentLoading,
    setPaymentLoading,
    toast,
    setToast,
    setLateFees
}) => {
    const stripe = useStripe()
    const elements = useElements()

    const handlePayment = async () => {
        if (!stripe || !elements) {
            setToast({
                success: false,
                message: 'Payment system is not ready'
            })
            return
        }

        if (totalOverdue <= 0) {
            setToast({
                success: false,
                message: 'There are no outstanding overdue payments'
            })
            return
        }

        const cardElement = elements.getElement(CardElement)

        if (!cardElement) {
            setToast({
                success: false,
                message: 'Please enter your card details'
            })
            return
        }

        setPaymentLoading(true)

        try {
            const res = await API.post(
                '/rentel/clear-late-fees',
                {
                    cost: totalOverdue.toString()
                },
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            )

            if (res.data.success !== true) {
                throw new Error(
                    res.data.message || 'Late fee payment failed'
                )
            }

            const payment = res.data.payment

            if (!payment?.clientSecret) {
                throw new Error('Payment information is not available')
            }

            const paymentResult = await stripe.confirmCardPayment(
                payment.clientSecret,
                {
                    payment_method: {
                        card: cardElement
                    }
                }
            )

            if (paymentResult.error) {
                throw new Error(paymentResult.error.message)
            }

            if (
                !paymentResult.paymentIntent ||
                paymentResult.paymentIntent.status !== 'succeeded'
            ) {
                throw new Error('Payment was not completed')
            }

            setToast({
                success: true,
                message: `All overdue fees of $${totalOverdue.toFixed(2)} have been paid successfully.`
            })

            setLateFees(
                latefees.map(fee => ({
                    ...fee,
                    is_pay_overdue: !unpaidFees.some(
                        unpaid => unpaid._id === fee._id
                    )
                        ? fee.is_pay_overdue
                        : true
                }))
            )

            setTimeout(() => {
                window.location.reload()
            }, 3000)
        } catch (error) {
            console.error('Late Fee Payment Error:', error)

            setToast({
                success: false,
                message:
                    error.response?.data?.message ||
                    error.message ||
                    'Payment failed'
            })
        } finally {
            setPaymentLoading(false)
        }
    }

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
                <p className="text-xs font-bold uppercase tracking-[0.2em] text-yellow-600">
                    My Payments
                </p>
                <h1 className="mt-2 text-3xl font-black tracking-tight text-slate-950">
                    Late Fees
                </h1>
                <p className="mt-2 text-sm text-slate-500">
                    Manage your overdue rental payments
                </p>
            </div>

            <div className="mb-6 rounded-2xl border border-red-200 bg-red-50 p-5 sm:p-6">
                <p className="text-xs font-bold uppercase tracking-wider text-red-500">
                    Total Outstanding
                </p>

                <div className="mt-2 flex flex-col gap-5">
                    <div>
                        <p className="text-3xl font-black text-red-700">
                            ${totalOverdue.toFixed(2)}
                        </p>
                        <p className="mt-1 text-sm text-red-500">
                            {unpaidFees.length} unpaid overdue{' '}
                            {unpaidFees.length === 1 ? 'fee' : 'fees'}
                        </p>
                    </div>

                    {totalOverdue > 0 && (
                        <div>
                            <div className="mb-4">
                                <label className="mb-2 block text-xs font-semibold text-slate-700">
                                    Card Details
                                </label>

                                <div className="w-full rounded-xl border border-slate-200 bg-white px-4 py-4 shadow-sm">
                                    <CardElement
                                        options={{
                                            style: {
                                                base: {
                                                    fontSize: '16px',
                                                    color: '#374151',
                                                    fontFamily: 'Arial, sans-serif',
                                                    '::placeholder': {
                                                        color: '#9ca3af'
                                                    }
                                                },
                                                invalid: {
                                                    color: '#dc2626'
                                                }
                                            }
                                        }}
                                    />
                                </div>

                                <div className="mt-3 flex items-center gap-2 text-xs text-gray-400">
                                    <FiLock className="h-4 w-4" />
                                    <span>
                                        Your card information is securely processed by Stripe
                                    </span>
                                </div>
                            </div>

                            <DefaultButton
                                type="button"
                                label={
                                    paymentLoading
                                        ? 'Processing Payment...'
                                        : `Pay All Overdue Fees $${totalOverdue.toFixed(2)}`
                                }
                                onClick={handlePayment}
                            />
                        </div>
                    )}
                </div>
            </div>

            <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
                <div className="hidden overflow-x-auto md:block">
                    <table className="w-full">
                        <thead className="border-b border-slate-200 bg-slate-50">
                            <tr>
                                <th className="px-5 py-4 text-left text-xs font-bold uppercase tracking-wider text-slate-500">Product</th>
                                <th className="px-5 py-4 text-left text-xs font-bold uppercase tracking-wider text-slate-500">Return Date</th>
                                <th className="px-5 py-4 text-left text-xs font-bold uppercase tracking-wider text-slate-500">Overdue Cost</th>
                                <th className="px-5 py-4 text-left text-xs font-bold uppercase tracking-wider text-slate-500">Payment Status</th>
                            </tr>
                        </thead>

                        <tbody className="divide-y divide-slate-100">
                            {latefees.length > 0 ? latefees.map((fee) => (
                                <tr key={fee._id} className="transition hover:bg-slate-50">
                                    <td className="px-5 py-4">
                                        <div className="flex items-center gap-3">
                                            {fee.product?.product_imgs?.[0] ? (
                                                <img
                                                    src={`${import.meta.env.VITE_APP_API_FILES}/uploads/product/${fee.product.product_imgs[0]}`}
                                                    alt={fee.product?.product}
                                                    className="h-12 w-12 rounded-xl object-cover"
                                                />
                                            ) : (
                                                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-slate-100 text-xs font-black text-slate-400">
                                                    N/A
                                                </div>
                                            )}

                                            <div>
                                                <p className="font-bold text-slate-900">
                                                    {fee.product?.product || 'Product'}
                                                </p>
                                                <p className="text-xs text-slate-400">
                                                    #{String(fee._id).slice(-8)}
                                                </p>
                                            </div>
                                        </div>
                                    </td>

                                    <td className="px-5 py-4 text-sm font-semibold text-slate-700">
                                        {formatDate(fee.rentel?.endDateTime)}
                                    </td>

                                    <td className="px-5 py-4 text-sm font-black text-red-600">
                                        ${Number(fee.override_cost || 0).toFixed(2)}
                                    </td>

                                    <td className="px-5 py-4">
                                        <span className={`rounded-full px-3 py-1.5 text-xs font-bold ${fee.is_pay_overdue
                                            ? 'bg-green-50 text-green-600'
                                            : 'bg-red-50 text-red-600'
                                            }`}>
                                            {fee.is_pay_overdue ? 'Paid' : 'Unpaid'}
                                        </span>
                                    </td>
                                </tr>
                            )) : (
                                <tr>
                                    <td colSpan="4" className="px-5 py-16 text-center">
                                        <p className="text-lg font-black text-slate-900">
                                            No Late Fees
                                        </p>
                                        <p className="mt-1 text-sm text-slate-500">
                                            You don't have any overdue payments.
                                        </p>
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>

                <div className="block md:hidden">
                    {latefees.length > 0 ? latefees.map((fee) => (
                        <div
                            key={fee._id}
                            className="border-b border-slate-100 p-4 last:border-b-0"
                        >
                            <div className="flex items-start gap-3">
                                {fee.product?.product_imgs?.[0] ? (
                                    <img
                                        src={`${import.meta.env.VITE_APP_API_FILES}/uploads/product/${fee.product.product_imgs[0]}`}
                                        alt={fee.product?.product}
                                        className="h-16 w-16 shrink-0 rounded-xl object-cover"
                                    />
                                ) : (
                                    <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-xl bg-slate-100 text-xs font-black text-slate-400">
                                        N/A
                                    </div>
                                )}

                                <div className="min-w-0 flex-1">
                                    <div className="flex items-start justify-between gap-3">
                                        <div className="min-w-0">
                                            <p className="truncate font-black text-slate-900">
                                                {fee.product?.product || 'Product'}
                                            </p>
                                            <p className="mt-1 text-xs text-slate-400">
                                                #{String(fee._id).slice(-8)}
                                            </p>
                                        </div>

                                        <span className={`shrink-0 rounded-full px-2.5 py-1 text-xs font-bold ${fee.is_pay_overdue
                                            ? 'bg-green-50 text-green-600'
                                            : 'bg-red-50 text-red-600'
                                            }`}>
                                            {fee.is_pay_overdue ? 'Paid' : 'Unpaid'}
                                        </span>
                                    </div>

                                    <div className="mt-4 grid grid-cols-2 gap-3">
                                        <div>
                                            <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                                                Return Date
                                            </p>
                                            <p className="mt-1 text-xs font-semibold text-slate-700">
                                                {formatDate(fee.rentel?.endDateTime)}
                                            </p>
                                        </div>

                                        <div>
                                            <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                                                Overdue Cost
                                            </p>
                                            <p className="mt-1 text-sm font-black text-red-600">
                                                ${Number(fee.override_cost || 0).toFixed(2)}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )) : (
                        <div className="px-5 py-16 text-center">
                            <p className="text-lg font-black text-slate-900">
                                No Late Fees
                            </p>
                            <p className="mt-1 text-sm text-slate-500">
                                You don't have any overdue payments.
                            </p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}

export default MyLateFees