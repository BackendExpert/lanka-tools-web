import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import API from '../../../../services/api'
import UpdateProduct from './UpdateProduct'

const ViewProduct = () => {
    const { id } = useParams()
    const token = localStorage.getItem("access_token")

    const [product, setProduct] = useState(null)
    const [loading, setLoading] = useState(true)
    const [activeImage, setActiveImage] = useState(0)

    useEffect(() => {
        const fetchProduct = async () => {
            try {
                const res = await API.get(`/product/fetch-product/${id}`, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                })

                if (res.data.success === true) {
                    setProduct(res.data.result)
                }
            } catch (error) {
                console.error(error)
            } finally {
                setLoading(false)
            }
        }

        if (token && id) {
            fetchProduct()
        }
    }, [id, token])

    if (loading) {
        return (
            <div className="min-h-screen bg-gray-50 p-4 sm:p-6 lg:p-8">
                <div className="mx-auto max-w-7xl">
                    <div className="animate-pulse">
                        <div className="mb-8 h-8 w-48 rounded bg-gray-200" />
                        <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
                            <div className="h-[420px] rounded-xl bg-gray-200" />
                            <div className="space-y-5">
                                <div className="h-10 w-3/4 rounded bg-gray-200" />
                                <div className="h-24 rounded bg-gray-200" />
                                <div className="h-20 rounded bg-gray-200" />
                                <div className="h-40 rounded bg-gray-200" />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }

    if (!product) {
        return (
            <div className="flex min-h-screen items-center justify-center bg-gray-50 px-4">
                <div className="w-full max-w-md border border-gray-200 bg-white p-8 text-center">
                    <h2 className="text-xl font-semibold text-gray-900">
                        Product Not Found
                    </h2>

                    <p className="mt-2 text-sm text-gray-500">
                        The product you are looking for could not be found.
                    </p>
                </div>
            </div>
        )
    }

    const images = product.product_imgs || []

    const hourlyPrice = Number(product.hourly_price || 0)
    const dailyPrice = Number(product.daily_price || 0)
    const weeklyPrice = Number(product.weekly_price || 0)
    const discount = Number(product.discount || 0)

    return (
        <div className="min-h-screen bg-gray-50">
            <div className="mx-auto max-w-7xl px-4 py-5 sm:px-6 sm:py-8 lg:px-8">

                <div className="mb-6 sm:mb-8">
                    <p className="text-xs font-medium uppercase tracking-wider text-gray-400">
                        Product Management
                    </p>

                    <div className="mt-1 flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
                        <div>
                            <h1 className="text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl">
                                Product Details
                            </h1>

                            <p className="mt-1 text-sm text-gray-500">
                                View complete information about this product
                            </p>
                        </div>

                        <div
                            className={`inline-flex w-fit items-center gap-2 px-3 py-2 text-xs font-semibold ${product.product_status
                                    ? 'bg-green-50 text-green-700'
                                    : 'bg-red-50 text-red-700'
                                }`}
                        >
                            <span
                                className={`h-2 w-2 rounded-full ${product.product_status
                                        ? 'bg-green-500'
                                        : 'bg-red-500'
                                    }`}
                            />

                            {product.product_status
                                ? 'Active Product'
                                : 'Inactive Product'}
                        </div>
                    </div>
                </div>

                <div className="grid grid-cols-1 gap-6 lg:grid-cols-[1.05fr_0.95fr] lg:gap-8">

                    <div className="min-w-0">

                        <div className="overflow-hidden border border-gray-200 bg-white">
                            <div className="relative flex h-[320px] items-center justify-center bg-gray-50 sm:h-[430px] lg:h-[520px]">

                                {images.length > 0 ? (
                                    <img
                                        src={`${import.meta.env.VITE_APP_API_FILES}/uploads/product/${images[activeImage]}`}
                                        alt={product.product}
                                        className="h-full w-full object-contain p-5 sm:p-8"
                                    />
                                ) : (
                                    <div className="flex flex-col items-center justify-center text-center">
                                        <div className="mb-3 flex h-16 w-16 items-center justify-center bg-gray-100 text-gray-400">
                                            <span className="text-2xl">
                                                —
                                            </span>
                                        </div>

                                        <p className="text-sm text-gray-400">
                                            No product image
                                        </p>
                                    </div>
                                )}

                                {discount > 0 && (
                                    <div className="absolute left-4 top-4 bg-yellow-500 px-3 py-2 text-xs font-bold text-black">
                                        {discount}% OFF
                                    </div>
                                )}
                            </div>

                            {images.length > 1 && (
                                <div className="border-t border-gray-200 bg-white p-3 sm:p-4">
                                    <div className="grid grid-cols-4 gap-2 sm:grid-cols-5 sm:gap-3">

                                        {images.map((image, index) => (
                                            <button
                                                type="button"
                                                key={index}
                                                onClick={() =>
                                                    setActiveImage(index)
                                                }
                                                className={`relative h-16 overflow-hidden border bg-gray-50 transition sm:h-20 ${activeImage === index
                                                        ? 'border-yellow-500'
                                                        : 'border-gray-200 hover:border-gray-400'
                                                    }`}
                                            >
                                                <img
                                                    src={`${import.meta.env.VITE_APP_API_FILES}/uploads/product/${image}`}
                                                    alt={`${product.product} ${index + 1}`}
                                                    className="h-full w-full object-contain"
                                                />
                                            </button>
                                        ))}

                                    </div>
                                </div>
                            )}
                        </div>

                        <div className="mt-6 border border-gray-200 bg-white p-5 sm:p-6">
                            <h2 className="text-base font-semibold text-gray-900">
                                Description
                            </h2>

                            <p className="mt-3 text-sm leading-7 text-gray-600">
                                {product.description ||
                                    'No description available for this product.'}
                            </p>
                        </div>
                    </div>

                    <div className="min-w-0">

                        <div className="border border-gray-200 bg-white p-5 sm:p-7">

                            <div className="flex flex-wrap items-center gap-2">

                                {product.category?.category && (
                                    <span className="bg-yellow-50 px-3 py-1.5 text-xs font-medium text-yellow-700">
                                        {product.category.category}
                                    </span>
                                )}

                                {product.product_status ? (
                                    <span className="bg-green-50 px-3 py-1.5 text-xs font-medium text-green-700">
                                        Available
                                    </span>
                                ) : (
                                    <span className="bg-red-50 px-3 py-1.5 text-xs font-medium text-red-700">
                                        Unavailable
                                    </span>
                                )}

                            </div>

                            <h2 className="mt-5 text-2xl font-bold leading-tight text-gray-900 sm:text-3xl">
                                {product.product}
                            </h2>

                            <div className="mt-6 grid grid-cols-1 gap-3 sm:grid-cols-3">

                                <div className="border border-gray-200 bg-gray-50 p-4">
                                    <p className="text-xs font-medium uppercase tracking-wide text-gray-400">
                                        Hourly Price
                                    </p>

                                    <p className="mt-2 text-2xl font-bold text-gray-900">
                                        ${hourlyPrice.toFixed(2)}
                                    </p>

                                    <p className="mt-1 text-xs text-gray-500">
                                        Per hour
                                    </p>
                                </div>

                                <div className="border border-gray-200 bg-gray-50 p-4">
                                    <p className="text-xs font-medium uppercase tracking-wide text-gray-400">
                                        Daily Price
                                    </p>

                                    <p className="mt-2 text-2xl font-bold text-gray-900">
                                        ${dailyPrice.toFixed(2)}
                                    </p>

                                    <p className="mt-1 text-xs text-gray-500">
                                        Per day
                                    </p>
                                </div>

                                <div className="border border-gray-200 bg-gray-50 p-4">
                                    <p className="text-xs font-medium uppercase tracking-wide text-gray-400">
                                        Weekly Price
                                    </p>

                                    <p className="mt-2 text-2xl font-bold text-gray-900">
                                        ${weeklyPrice.toFixed(2)}
                                    </p>

                                    <p className="mt-1 text-xs text-gray-500">
                                        Per week
                                    </p>
                                </div>

                            </div>

                            {discount > 0 && (
                                <div className="mt-4">
                                    <span className="inline-flex bg-yellow-50 px-3 py-2 text-xs font-bold text-yellow-700">
                                        {discount}% Discount
                                    </span>
                                </div>
                            )}

                            <div className="mt-7 grid grid-cols-2 border-y border-gray-200">

                                <div className="border-r border-gray-200 py-5 pr-4">
                                    <p className="text-xs font-medium uppercase tracking-wide text-gray-400">
                                        Stock
                                    </p>

                                    <p className="mt-1 text-xl font-bold text-gray-900">
                                        {product.stock}
                                    </p>

                                    <p className="mt-1 text-xs text-gray-500">
                                        {Number(product.stock) > 0
                                            ? 'Units available'
                                            : 'Out of stock'}
                                    </p>
                                </div>

                                <div className="py-5 pl-4">
                                    <p className="text-xs font-medium uppercase tracking-wide text-gray-400">
                                        Status
                                    </p>

                                    <p className="mt-1 text-xl font-bold text-gray-900">
                                        {product.product_status
                                            ? 'Active'
                                            : 'Inactive'}
                                    </p>

                                    <p className="mt-1 text-xs text-gray-500">
                                        Product visibility
                                    </p>
                                </div>

                            </div>

                            <div className="mt-7">
                                <h3 className="text-sm font-semibold text-gray-900">
                                    Product Information
                                </h3>

                                <div className="mt-4 divide-y divide-gray-100 border border-gray-200">

                                    <div className="flex items-start justify-between gap-4 p-4">
                                        <span className="text-sm text-gray-500">
                                            Category
                                        </span>

                                        <span className="text-right text-sm font-medium text-gray-900">
                                            {product.category?.category ||
                                                'N/A'}
                                        </span>
                                    </div>

                                    <div className="flex items-start justify-between gap-4 p-4">
                                        <span className="text-sm text-gray-500">
                                            Sub Categories
                                        </span>

                                        <span className="max-w-[60%] text-right text-sm font-medium text-gray-900">
                                            {product.sub_category?.length
                                                ? product.sub_category.join(
                                                    ', '
                                                )
                                                : 'N/A'}
                                        </span>
                                    </div>

                                    <div className="flex items-start justify-between gap-4 p-4">
                                        <span className="text-sm text-gray-500">
                                            Stock Quantity
                                        </span>

                                        <span className="text-sm font-medium text-gray-900">
                                            {product.stock}
                                        </span>
                                    </div>

                                </div>
                            </div>

                            <div className="mt-7">
                                <h3 className="text-sm font-semibold text-gray-900">
                                    Product Tags
                                </h3>

                                {product.tags?.length ? (
                                    <div className="mt-4 flex flex-wrap gap-2">

                                        {product.tags.map((tag, index) => (
                                            <span
                                                key={index}
                                                className="border border-gray-200 bg-gray-50 px-3 py-2 text-xs font-medium text-gray-600"
                                            >
                                                #{tag}
                                            </span>
                                        ))}

                                    </div>
                                ) : (
                                    <p className="mt-3 text-sm text-gray-400">
                                        No tags available
                                    </p>
                                )}
                            </div>

                        </div>

                        <div className="mt-6 border border-gray-200 bg-white p-5 sm:p-6">

                            <div className="flex items-center justify-between gap-4">

                                <div>
                                    <p className="text-xs font-medium uppercase tracking-wide text-gray-400">
                                        Inventory
                                    </p>

                                    <p className="mt-1 text-sm font-medium text-gray-900">
                                        {Number(product.stock) > 0
                                            ? 'Product is currently in stock'
                                            : 'Product is currently out of stock'}
                                    </p>
                                </div>

                                <div
                                    className={`flex h-11 w-11 shrink-0 items-center justify-center ${Number(product.stock) > 0
                                            ? 'bg-green-50 text-green-600'
                                            : 'bg-red-50 text-red-600'
                                        }`}
                                >
                                    <span className="text-lg font-bold">
                                        {Number(product.stock) > 0
                                            ? '✓'
                                            : '!'}
                                    </span>
                                </div>

                            </div>

                        </div>
                    </div>
                </div>

                <div className="mt-8 border border-gray-100">
                    <UpdateProduct
                        productID={id}
                        productdata={product}
                    />
                </div>

            </div>
        </div>
    )
}

export default ViewProduct