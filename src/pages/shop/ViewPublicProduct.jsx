import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import {
    FaBagShopping,
    FaTruckFast,
    FaCircleCheck,
    FaArrowRotateLeft,
    FaArrowLeft,
    FaBoxOpen
} from 'react-icons/fa6'
import API from '../../services/api'
import Hero from './Hero'
import { useAuth } from '../../context/AuthContext'
import ProductComments from './ProductComments'

const ViewPublicProduct = () => {
    const { id } = useParams()
    const navigate = useNavigate()
    const { auth } = useAuth()

    const [product, setProduct] = useState(null)
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState('')
    const [activeImage, setActiveImage] = useState(0)

    useEffect(() => {
        const fetchProduct = async () => {
            try {
                setLoading(true)
                setError('')

                const res = await API.get(`/product/public-product/${id}`)

                if (res.data.success === true) {
                    setProduct(res.data.result)
                } else {
                    setError('Product not found')
                }
            } catch (error) {
                console.error(error)

                setError(
                    error.response?.data?.message ||
                    'Unable to load product'
                )
            } finally {
                setLoading(false)
            }
        }

        if (id) {
            fetchProduct()
        }
    }, [id])

    if (loading) {
        return (
            <div className="min-h-screen bg-slate-50">
                <Hero />

                <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8 lg:py-16">
                    <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">

                        <div className="overflow-hidden rounded-3xl bg-white shadow-sm ring-1 ring-slate-200">
                            <div className="aspect-square animate-pulse bg-slate-200" />

                            <div className="flex gap-3 p-4">
                                {Array.from({ length: 4 }).map((_, index) => (
                                    <div
                                        key={index}
                                        className="h-20 w-20 animate-pulse rounded-xl bg-slate-200"
                                    />
                                ))}
                            </div>
                        </div>

                        <div className="rounded-3xl bg-white p-6 shadow-sm ring-1 ring-slate-200 sm:p-8">
                            <div className="h-4 w-32 animate-pulse rounded bg-slate-200" />

                            <div className="mt-5 h-10 w-4/5 animate-pulse rounded bg-slate-200" />

                            <div className="mt-4 h-20 w-full animate-pulse rounded bg-slate-200" />

                            <div className="mt-8 h-12 w-48 animate-pulse rounded bg-slate-200" />

                            <div className="mt-8 h-24 w-full animate-pulse rounded bg-slate-200" />

                            <div className="mt-8 h-14 w-full animate-pulse rounded bg-slate-200" />
                        </div>

                    </div>
                </div>
            </div>
        )
    }

    if (error || !product) {
        return (
            <div className="min-h-screen bg-slate-50">
                <Hero />

                <div className="flex min-h-[70vh] items-center justify-center px-4">
                    <div className="w-full max-w-md rounded-3xl bg-white p-8 text-center shadow-sm ring-1 ring-slate-200">

                        <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-3xl bg-yellow-50">
                            <FaBoxOpen className="text-3xl text-yellow-600" />
                        </div>

                        <h1 className="mt-6 text-2xl font-bold text-slate-900">
                            Product Not Found
                        </h1>

                        <p className="mt-2 text-sm leading-6 text-slate-500">
                            {error || 'The product you are looking for is not available.'}
                        </p>

                        <a
                            href="/shop"
                            className="mt-6 inline-flex items-center gap-2 rounded-xl bg-slate-900 px-6 py-3 text-sm font-semibold text-white transition hover:bg-yellow-500 hover:text-slate-950"
                        >
                            <FaArrowLeft className="text-xs" />
                            Back to Products
                        </a>

                    </div>
                </div>
            </div>
        )
    }

    const images = product.product_imgs || []

    const price = Number(product.price || 0)
    const discount = Number(product.discount || 0)
    const stock = Number(product.stock || 0)

    const hourlyPrice = Number(product.hourly_price || 0)
    const dailyPrice = Number(product.daily_price || 0)
    const weeklyPrice = Number(product.weekly_price || 0)

    const originalPrice = price + discount

    const discountPercentage =
        originalPrice > 0
            ? Math.round((discount / originalPrice) * 100)
            : 0

    const imageUrl = (image) =>
        `${import.meta.env.VITE_APP_API_FILES}/uploads/product/${image}`

    return (
        <div className="min-h-screen bg-slate-50">

            <Hero />

            <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8 lg:py-12">

                <a
                    href="/shop"
                    className="mb-8 inline-flex items-center gap-2 text-sm font-semibold text-slate-500 transition hover:text-yellow-600"
                >
                    <FaArrowLeft className="text-xs" />
                    Back to Products
                </a>

                <div className="grid grid-cols-1 gap-8 lg:grid-cols-[1.05fr_0.95fr]">

                    <div>

                        <div className="overflow-hidden rounded-3xl bg-white shadow-sm ring-1 ring-slate-200">

                            <div className="relative flex aspect-square items-center justify-center overflow-hidden bg-slate-100 sm:aspect-[4/3] lg:aspect-square">

                                {images.length > 0 ? (
                                    <img
                                        src={imageUrl(images[activeImage])}
                                        alt={product.product || 'Product'}
                                        className="h-full w-full object-contain p-6 transition duration-500 sm:p-10"
                                    />
                                ) : (
                                    <div className="flex flex-col items-center justify-center text-center">

                                        <div className="flex h-20 w-20 items-center justify-center rounded-3xl bg-white shadow-sm">
                                            <FaBoxOpen className="text-3xl text-slate-400" />
                                        </div>

                                        <p className="mt-4 text-sm font-medium text-slate-400">
                                            No product image
                                        </p>

                                    </div>
                                )}

                                {discount > 0 && (
                                    <div className="absolute left-5 top-5 rounded-full bg-yellow-500 px-4 py-2 text-xs font-bold text-slate-950 shadow-sm">
                                        SAVE ${discount.toFixed(2)}
                                    </div>
                                )}

                                {stock <= 0 && (
                                    <div className="absolute right-5 top-5 rounded-full bg-red-500 px-4 py-2 text-xs font-bold text-white">
                                        Out of Stock
                                    </div>
                                )}

                            </div>

                            {images.length > 1 && (
                                <div className="border-t border-slate-100 p-4 sm:p-5">

                                    <div className="flex gap-3 overflow-x-auto pb-1">

                                        {images.map((image, index) => (
                                            <button
                                                key={`${image}-${index}`}
                                                type="button"
                                                onClick={() => setActiveImage(index)}
                                                className={`h-20 w-20 shrink-0 overflow-hidden rounded-xl border-2 bg-slate-50 transition sm:h-24 sm:w-24 ${activeImage === index
                                                    ? 'border-yellow-500'
                                                    : 'border-transparent hover:border-slate-300'
                                                    }`}
                                            >
                                                <img
                                                    src={imageUrl(image)}
                                                    alt={`${product.product} ${index + 1}`}
                                                    className="h-full w-full object-cover"
                                                />
                                            </button>
                                        ))}

                                    </div>

                                </div>
                            )}

                        </div>

                    </div>

                    <div className="rounded-3xl bg-white p-6 shadow-sm ring-1 ring-slate-200 sm:p-8">

                        <div className="flex flex-wrap items-center gap-2">

                            {product.category?.category && (
                                <span className="rounded-full bg-yellow-50 px-3 py-1.5 text-xs font-bold text-yellow-700">
                                    {product.category.category}
                                </span>
                            )}

                            <span
                                className={`rounded-full px-3 py-1.5 text-xs font-bold ${stock > 0
                                    ? 'bg-green-50 text-green-700'
                                    : 'bg-red-50 text-red-700'
                                    }`}
                            >
                                {stock > 0 ? 'In Stock' : 'Out of Stock'}
                            </span>

                        </div>

                        <h1 className="mt-5 text-3xl font-bold leading-tight tracking-tight text-slate-900 sm:text-4xl">
                            {product.product}
                        </h1>

                        <div className="mt-5 flex items-end gap-3">


                            {discount > 0 && (
                                <>
                                    <span className="pb-1 text-lg text-slate-400 line-through">
                                        ${originalPrice.toFixed(2)}
                                    </span>

                                    <span className="mb-1 rounded-lg bg-yellow-50 px-2.5 py-1 text-xs font-bold text-yellow-700">
                                        {discountPercentage}% OFF
                                    </span>
                                </>
                            )}

                        </div>

                        <div className="mt-6 grid grid-cols-1 gap-3 sm:grid-cols-3">

                            <div className="rounded-2xl bg-yellow-50 p-4">

                                <p className="text-xs font-bold uppercase tracking-wide text-yellow-700">
                                    Hourly
                                </p>

                                <p className="mt-2 text-xl font-bold text-slate-900">
                                    ${hourlyPrice.toFixed(2)}
                                </p>

                                <p className="mt-1 text-xs text-slate-500">
                                    per hour
                                </p>

                            </div>

                            <div className="rounded-2xl bg-slate-50 p-4">

                                <p className="text-xs font-bold uppercase tracking-wide text-slate-500">
                                    Daily
                                </p>

                                <p className="mt-2 text-xl font-bold text-slate-900">
                                    ${dailyPrice.toFixed(2)}
                                </p>

                                <p className="mt-1 text-xs text-slate-500">
                                    per day
                                </p>

                            </div>

                            <div className="rounded-2xl bg-slate-50 p-4">

                                <p className="text-xs font-bold uppercase tracking-wide text-slate-500">
                                    Weekly
                                </p>

                                <p className="mt-2 text-xl font-bold text-slate-900">
                                    ${weeklyPrice.toFixed(2)}
                                </p>

                                <p className="mt-1 text-xs text-slate-500">
                                    per week
                                </p>

                            </div>

                        </div>

                        <div className="mt-6 border-y border-slate-100 py-5">

                            <div className="flex items-center justify-between">
                                <span className="text-sm text-slate-500">
                                    Availability
                                </span>

                                <span
                                    className={`text-sm font-bold ${stock > 0
                                        ? 'text-green-600'
                                        : 'text-red-500'
                                        }`}
                                >
                                    {stock > 0
                                        ? `${stock} units available`
                                        : 'Currently unavailable'}
                                </span>
                            </div>

                            {product.category?.category && (
                                <div className="mt-4 flex items-center justify-between">

                                    <span className="text-sm text-slate-500">
                                        Category
                                    </span>

                                    <span className="text-sm font-semibold text-slate-900">
                                        {product.category.category}
                                    </span>

                                </div>
                            )}

                            {product.sub_category?.length > 0 && (
                                <div className="mt-4 flex items-start justify-between gap-5">

                                    <span className="shrink-0 text-sm text-slate-500">
                                        Sub Category
                                    </span>

                                    <span className="text-right text-sm font-semibold text-slate-900">
                                        {product.sub_category.join(', ')}
                                    </span>

                                </div>
                            )}

                        </div>

                        <div className="mt-7">

                            <h2 className="text-sm font-bold uppercase tracking-wide text-slate-900">
                                Description
                            </h2>

                            <p className="mt-3 text-sm leading-7 text-slate-600 sm:text-base">
                                {product.description || 'No description available for this product.'}
                            </p>

                        </div>

                        {product.tags?.length > 0 && (
                            <div className="mt-7">

                                <h2 className="text-sm font-bold uppercase tracking-wide text-slate-900">
                                    Tags
                                </h2>

                                <div className="mt-3 flex flex-wrap gap-2">

                                    {product.tags.map((tag, index) => (
                                        <span
                                            key={`${tag}-${index}`}
                                            className="rounded-full bg-slate-100 px-3 py-1.5 text-xs font-medium text-slate-600"
                                        >
                                            #{tag}
                                        </span>
                                    ))}

                                </div>

                            </div>
                        )}
                        <div className="mt-8">
                            {auth.accessToken ? (
                                <a
                                    href={stock > 0 ? `/dashboard/rentels/product/${product._id}` : '#'}
                                    className={`inline-flex w-full items-center justify-center gap-2 rounded-2xl px-6 py-4 text-sm font-bold transition ${stock > 0 ? 'bg-slate-900 text-white hover:bg-yellow-500 hover:text-slate-950' : 'cursor-not-allowed bg-slate-100 text-slate-400 pointer-events-none'}`}
                                >
                                    <FaBagShopping />
                                    {stock > 0 ? 'Rent this Tool' : 'Out of Stock'}
                                </a>
                            ) : (
                                <a
                                    href="/login"
                                    className="inline-flex w-full items-center justify-center gap-2 rounded-2xl bg-slate-900 px-6 py-4 text-sm font-bold text-white transition hover:bg-yellow-500 hover:text-slate-950"
                                >
                                    <FaBagShopping />
                                    Login to Rent
                                </a>
                            )}
                        </div>

                        <div className="mt-5 grid grid-cols-3 gap-3">

                            <div className="rounded-2xl bg-slate-50 p-4 text-center">

                                <div className="flex justify-center text-lg text-yellow-600">
                                    <FaTruckFast />
                                </div>

                                <p className="mt-2 text-xs font-semibold text-slate-700">
                                    Fast Delivery
                                </p>

                            </div>

                            <div className="rounded-2xl bg-slate-50 p-4 text-center">

                                <div className="flex justify-center text-lg text-green-600">
                                    <FaCircleCheck />
                                </div>

                                <p className="mt-2 text-xs font-semibold text-slate-700">
                                    Quality Product
                                </p>

                            </div>

                            <div className="rounded-2xl bg-slate-50 p-4 text-center">

                                <div className="flex justify-center text-lg text-yellow-600">
                                    <FaArrowRotateLeft />
                                </div>

                                <p className="mt-2 text-xs font-semibold text-slate-700">
                                    Easy Returns
                                </p>

                            </div>

                        </div>

                    </div>

                </div>

                <div className="mt-8 rounded-3xl bg-white p-6 shadow-sm ring-1 ring-slate-200 sm:p-8">

                    <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">

                        <div>

                            <p className="text-xs font-bold uppercase tracking-wider text-yellow-600">
                                Product Details
                            </p>

                            <h2 className="mt-1 text-2xl font-bold text-slate-900">
                                Everything you need to know
                            </h2>

                        </div>

                        {product.product_status && (
                            <span className="flex w-fit items-center gap-2 rounded-full bg-green-50 px-4 py-2 text-xs font-bold text-green-700">
                                <FaCircleCheck />
                                Active Product
                            </span>
                        )}

                    </div>

                    <div className="mt-6 grid grid-cols-1 divide-y divide-slate-100 border-y border-slate-100 sm:grid-cols-2 sm:divide-x sm:divide-y-0">

                        <div className="py-5 sm:pr-6">

                            <p className="text-xs font-semibold uppercase tracking-wide text-slate-400">
                                Product
                            </p>

                            <p className="mt-2 text-sm font-semibold text-slate-900">
                                {product.product}
                            </p>

                        </div>

                        <div className="py-5 sm:pl-6">

                            <p className="text-xs font-semibold uppercase tracking-wide text-slate-400">
                                Category
                            </p>

                            <p className="mt-2 text-sm font-semibold text-slate-900">
                                {product.category?.category || 'N/A'}
                            </p>

                        </div>

                        <div className="py-5 sm:pr-6">

                            <p className="text-xs font-semibold uppercase tracking-wide text-slate-400">
                                Hourly Price
                            </p>

                            <p className="mt-2 text-sm font-semibold text-slate-900">
                                ${hourlyPrice.toFixed(2)}
                            </p>

                        </div>

                        <div className="py-5 sm:pl-6">

                            <p className="text-xs font-semibold uppercase tracking-wide text-slate-400">
                                Daily Price
                            </p>

                            <p className="mt-2 text-sm font-semibold text-slate-900">
                                ${dailyPrice.toFixed(2)}
                            </p>

                        </div>

                        <div className="py-5 sm:pr-6">

                            <p className="text-xs font-semibold uppercase tracking-wide text-slate-400">
                                Weekly Price
                            </p>

                            <p className="mt-2 text-sm font-semibold text-slate-900">
                                ${weeklyPrice.toFixed(2)}
                            </p>

                        </div>

                    </div>

                </div>
                
                <div className="bg-white mt-8 p-4 rounded border border-gray-100">
                    <ProductComments 
                        ProductID={product._id}
                    />
                </div>

            </div>

        </div>
    )
}

export default ViewPublicProduct