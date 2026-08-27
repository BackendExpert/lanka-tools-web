import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import API from '../../../../services/api'
import Toast from '../../../../component/Toast/Toast'
import useForm from '../../../../hooks/useForm'
import DefaultInput from '../../../../component/Form/DefaultInput'
import DefaultButton from '../../../../component/Buttons/DefaultButton'
import { loadStripe } from '@stripe/stripe-js'
import {
    Elements,
    CardElement,
    useStripe,
    useElements,
} from '@stripe/react-stripe-js'
import { FiLock } from 'react-icons/fi'

const stripePromise = loadStripe(
    import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY
)

const PaymentProduct = () => {
    const { id } = useParams()
    const token = localStorage.getItem('access_token')

    const [product, setProduct] = useState(null)
    const [loading, setLoading] = useState(false)
    const [toast, setToast] = useState(null)

    useEffect(() => {
        const fetchProduct = async () => {
            if (!token || !id) return

            try {
                const res = await API.get(
                    `/product/fetch-product/${id}`,
                    {
                        headers: {
                            Authorization: `Bearer ${token}`,
                        },
                    }
                )

                if (res.data.success === true) {
                    setProduct(res.data.result)
                } else {
                    setProduct(null)

                    setToast({
                        success: false,
                        message:
                            res.data.message ||
                            'Product not found',
                    })
                }
            } catch (error) {
                console.error(
                    'Failed to fetch product:',
                    error
                )

                setProduct(null)

                setToast({
                    success: false,
                    message:
                        error.response?.data?.message ||
                        'Failed to fetch product',
                })
            }
        }

        fetchProduct()
    }, [token, id])

    const { values, handleChange } = useForm({
        startDate: '',
        startTime: '',
        endDate: '',
        endTime: '',
    })

    return (
        <Elements stripe={stripePromise}>
            <PaymentProductContent
                id={id}
                token={token}
                product={product}
                loading={loading}
                setLoading={setLoading}
                toast={toast}
                setToast={setToast}
                values={values}
                handleChange={handleChange}
            />
        </Elements>
    )
}

const PaymentProductContent = ({
    id,
    token,
    product,
    loading,
    setLoading,
    toast,
    setToast,
    values,
    handleChange,
}) => {
    const stripe = useStripe()
    const elements = useElements()

    const [rentalData, setRentalData] = useState(null)
    const [paymentData, setPaymentData] = useState(null)
    const [paymentReady, setPaymentReady] = useState(false)

    const handleCalculateRental = async (e) => {
        e.preventDefault()

        if (!product) {
            setToast({
                success: false,
                message: 'Product information is not available',
            })
            return
        }

        if (Number(product.stock || 0) <= 0) {
            setToast({
                success: false,
                message: 'Product is out of stock',
            })
            return
        }

        if (
            !values.startDate ||
            !values.startTime ||
            !values.endDate ||
            !values.endTime
        ) {
            setToast({
                success: false,
                message:
                    'Please select rental start and end date/time',
            })
            return
        }

        const start = new Date(
            `${values.startDate}T${values.startTime}:00`
        )

        const end = new Date(
            `${values.endDate}T${values.endTime}:00`
        )

        if (
            Number.isNaN(start.getTime()) ||
            Number.isNaN(end.getTime())
        ) {
            setToast({
                success: false,
                message: 'Invalid rental date or time',
            })
            return
        }

        if (end <= start) {
            setToast({
                success: false,
                message:
                    'End date and time must be after start date and time',
            })
            return
        }

        setLoading(true)

        try {
            const res = await API.post(
                `/rentel/calculate-rental/${id}`,
                values,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            )

            if (res.data.success !== true) {
                throw new Error(
                    res.data.message ||
                    'Unable to calculate rental cost'
                )
            }

            setRentalData(res.data.result)

            setToast({
                success: true,
                message:
                    'Rental cost calculated successfully',
            })
        } catch (error) {
            setToast({
                success: false,
                message:
                    error.response?.data?.message ||
                    error.message ||
                    'Unable to calculate rental cost',
            })
        } finally {
            setLoading(false)
        }
    }

    const handlePayment = async () => {
        if (!stripe || !elements) {
            setToast({
                success: false,
                message: 'Payment system is not ready',
            })
            return
        }

        if (!rentalData) {
            setToast({
                success: false,
                message:
                    'Please calculate rental cost first',
            })
            return
        }

        const cardElement =
            elements.getElement(CardElement)

        if (!cardElement) {
            setToast({
                success: false,
                message:
                    'Please enter your card details',
            })
            return
        }

        setLoading(true)

        try {
            const rentalResponse = await API.post(
                `/rentel/create-rental/${id}`,
                values,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            )

            if (rentalResponse.data.success !== true) {
                throw new Error(
                    rentalResponse.data.message ||
                    'Rental creation failed'
                )
            }

            const payment =
                rentalResponse.data.payment

            if (!payment?.clientSecret) {
                throw new Error(
                    'Payment information is not available'
                )
            }

            setPaymentData(payment)

            const paymentResult =
                await stripe.confirmCardPayment(
                    payment.clientSecret,
                    {
                        payment_method: {
                            card: cardElement,
                        },
                    }
                )

            if (paymentResult.error) {
                throw new Error(
                    paymentResult.error.message
                )
            }

            if (
                !paymentResult.paymentIntent ||
                paymentResult.paymentIntent.status !==
                    'succeeded'
            ) {
                throw new Error(
                    'Payment was not completed'
                )
            }

            setToast({
                success: true,
                message:
                    'Payment successful. Rental created successfully.',
            })

            setPaymentReady(false)

            setTimeout(() => {
                window.location.reload()
            }, 3000)
        } catch (error) {
            console.error(
                'Payment Error:',
                error
            )

            setToast({
                success: false,
                message:
                    error.response?.data?.message ||
                    error.message ||
                    'Payment failed',
            })
        } finally {
            setLoading(false)
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

            <div className="flex w-full flex-col md:flex-row">
                <div className="w-full overflow-hidden bg-slate-50 md:w-2/5">
                    {product?.product_imgs?.[0] ? (
                        <img
                            src={`${import.meta.env.VITE_APP_API_FILES}/uploads/product/${product.product_imgs[0]}`}
                            alt={
                                product?.product ||
                                'Product'
                            }
                            className="block h-72 w-full object-cover sm:h-80 md:h-[430px]"
                        />
                    ) : (
                        <div className="flex h-72 items-center justify-center text-sm text-slate-400 sm:h-80 md:h-[430px]">
                            No Image
                        </div>
                    )}
                </div>

                <div className="w-full bg-white p-6 sm:p-8 md:w-3/5 md:p-10 lg:p-12">
                    <p className="text-xs font-bold uppercase tracking-[0.2em] text-yellow-600">
                        {product?.category?.category ||
                            'Rental Product'}
                    </p>

                    <h1 className="mt-3 text-3xl font-black tracking-tight text-slate-950 sm:text-4xl">
                        {product?.product ||
                            'Product'}
                    </h1>

                    <p className="mt-4 max-w-2xl text-sm leading-7 text-slate-500 sm:text-base">
                        {product?.description ||
                            'No description available.'}
                    </p>

                    {product?.tags?.length > 0 && (
                        <div className="mt-6 flex flex-wrap gap-2">
                            {product.tags.map(
                                (tag, index) => (
                                    <span
                                        key={`${tag}-${index}`}
                                        className="rounded-full bg-slate-100 px-3 py-1.5 text-xs font-semibold text-slate-600"
                                    >
                                        #{tag}
                                    </span>
                                )
                            )}
                        </div>
                    )}

                    <div className="mt-8 grid grid-cols-1 gap-3 sm:grid-cols-3">
                        <div className="bg-slate-50 p-4">
                            <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                                Hourly
                            </p>

                            <p className="mt-2 text-xl font-black text-slate-950">
                                $
                                {Number(
                                    product?.hourly_price ||
                                        0
                                ).toFixed(2)}
                            </p>

                            <p className="mt-1 text-xs text-slate-400">
                                per hour
                            </p>
                        </div>

                        <div className="bg-yellow-50 p-4">
                            <p className="text-[10px] font-bold uppercase tracking-wider text-yellow-700">
                                Daily
                            </p>

                            <p className="mt-2 text-xl font-black text-slate-950">
                                $
                                {Number(
                                    product?.daily_price ||
                                        0
                                ).toFixed(2)}
                            </p>

                            <p className="mt-1 text-xs text-slate-400">
                                per day
                            </p>
                        </div>

                        <div className="bg-slate-50 p-4">
                            <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                                Weekly
                            </p>

                            <p className="mt-2 text-xl font-black text-slate-950">
                                $
                                {Number(
                                    product?.weekly_price ||
                                        0
                                ).toFixed(2)}
                            </p>

                            <p className="mt-1 text-xs text-slate-400">
                                per week
                            </p>
                        </div>
                    </div>

                    <div className="mt-8 flex items-center justify-between border-t border-slate-100 pt-6">
                        <div>
                            <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                                Availability
                            </p>

                            <p className="mt-1 text-sm font-bold text-slate-950">
                                {Number(
                                    product?.stock || 0
                                ) > 0
                                    ? `${product.stock} units available`
                                    : 'Currently unavailable'}
                            </p>
                        </div>

                        <div
                            className={`h-3 w-3 rounded-full ${
                                Number(
                                    product?.stock || 0
                                ) > 0
                                    ? 'bg-green-500'
                                    : 'bg-red-500'
                            }`}
                        />
                    </div>
                </div>
            </div>

            <div className="mt-8 bg-white p-8">
                <form
                    onSubmit={
                        handleCalculateRental
                    }
                >
                    <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                        <DefaultInput
                            label="Start Date"
                            type="date"
                            name="startDate"
                            value={
                                values.startDate
                            }
                            onChange={handleChange}
                            required
                        />

                        <DefaultInput
                            label="Start Time"
                            type="time"
                            name="startTime"
                            value={
                                values.startTime
                            }
                            onChange={handleChange}
                            required
                        />

                        <DefaultInput
                            label="End Date"
                            type="date"
                            name="endDate"
                            value={
                                values.endDate
                            }
                            onChange={handleChange}
                            required
                        />

                        <DefaultInput
                            label="End Time"
                            type="time"
                            name="endTime"
                            value={
                                values.endTime
                            }
                            onChange={handleChange}
                            required
                        />
                    </div>

                    {!rentalData && (
                        <div className="mt-5">
                            <DefaultButton
                                type="submit"
                                label={
                                    loading
                                        ? 'Calculating Rental...'
                                        : 'Calculate Rental Cost'
                                }
                            />
                        </div>
                    )}
                </form>

                {rentalData && (
                    <div className="mt-6 border border-slate-200 bg-slate-50 p-6">
                        <div className="flex items-center justify-between">
                            <p className="text-sm text-slate-500">
                                Rental Duration
                            </p>

                            <p className="text-sm font-bold text-slate-950">
                                {Number(
                                    rentalData.totalHours ||
                                        0
                                ).toFixed(2)}{' '}
                                hours
                            </p>
                        </div>

                        <div className="mt-5 border-t border-slate-200 pt-5">
                            <div className="flex items-center justify-between">
                                <p className="text-sm text-slate-500">
                                    Subtotal
                                </p>

                                <p className="text-sm font-bold text-slate-950">
                                    $
                                    {Number(
                                        rentalData.subtotal ||
                                            0
                                    ).toFixed(2)}
                                </p>
                            </div>

                            <div className="mt-3 flex items-center justify-between">
                                <p className="text-sm text-slate-500">
                                    VAT (
                                    {Number(
                                        rentalData.vatRate ||
                                            0
                                    )}
                                    %)
                                </p>

                                <p className="text-sm font-bold text-slate-950">
                                    $
                                    {Number(
                                        rentalData.vatAmount ||
                                            0
                                    ).toFixed(2)}
                                </p>
                            </div>

                            <div className="mt-5 flex items-center justify-between border-t border-slate-200 pt-5">
                                <p className="text-sm font-black uppercase tracking-wider text-slate-700">
                                    Total
                                </p>

                                <p className="text-4xl font-black text-slate-950">
                                    $
                                    {Number(
                                        rentalData.totalAmount ||
                                            0
                                    ).toFixed(2)}
                                </p>
                            </div>
                        </div>
                    </div>
                )}

                {rentalData && (
                    <div className="mt-6">
                        <div>
                            <label className="mb-2 block text-xs font-semibold">
                                Card Details
                            </label>

                            <div className="w-full rounded border border-gray-200 bg-white px-4 py-4 shadow-sm transition-all duration-200 hover:border-gray-300">
                                <CardElement
                                    options={{
                                        style: {
                                            base: {
                                                fontSize:
                                                    '16px',
                                                color:
                                                    '#374151',
                                                fontFamily:
                                                    'Arial, sans-serif',
                                                '::placeholder':
                                                    {
                                                        color:
                                                            '#9ca3af',
                                                    },
                                            },
                                            invalid: {
                                                color:
                                                    '#dc2626',
                                            },
                                        },
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

                        <div className="mt-5">
                            <DefaultButton
                                type="button"
                                label={
                                    loading
                                        ? 'Processing Payment...'
                                        : `Pay $${Number(
                                            rentalData.totalAmount ||
                                                0
                                        ).toFixed(2)} & Request Tool`
                                }
                                onClick={
                                    handlePayment
                                }
                            />
                        </div>
                    </div>
                )}
            </div>
        </div>
    )
}

export default PaymentProduct