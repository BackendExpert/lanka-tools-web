import React, { useEffect, useState } from 'react'
import API from '../../../services/api'

const ProductListDash = () => {
    const token = localStorage.getItem('access_token')
    const [products, setPorducts] = useState([])

    useEffect(() => {
        const fetchproducts = async () => {
            try {
                const res = await API.get('/product/fetch-products', {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                })

                if (res.data.success === true) {
                    setPorducts(res.data.result || [])
                }
            } catch (error) {
                console.error('Products:', error)
            }
        }

        if (token) {
            fetchproducts()
        }
    }, [token])

    return (
        <div>
            <div className="mb-5">
                <h2 className="text-lg font-semibold text-gray-900">
                    Products
                </h2>
                <p className="text-sm text-gray-500">
                    Latest products
                </p>
            </div>

            <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 xl:grid-cols-6">
                {
                    products.slice(0, 12).map((data, index) => {
                        return (
                            <div
                                className="group w-full overflow-hidden border border-gray-100 bg-white transition-all duration-300 hover:border-yellow-400"
                                key={index}
                            >
                                <div className="relative aspect-square overflow-hidden bg-gray-50">
                                    {
                                        data.product_imgs?.[0] ? (
                                            <img
                                                src={`${import.meta.env.VITE_APP_API_FILES}/uploads/product/${data.product_imgs[0]}`}
                                                alt={data.product || 'Product'}
                                                className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                                            />
                                        ) : (
                                            <div className="flex h-full items-center justify-center text-xs text-gray-400">
                                                No Image
                                            </div>
                                        )
                                    }

                                    <div className="absolute left-2 top-2">
                                        {
                                            data.product_status ? (
                                                <span className="bg-yellow-400 px-2 py-1 text-[10px] font-semibold text-black">
                                                    Active
                                                </span>
                                            ) : (
                                                <span className="bg-gray-800 px-2 py-1 text-[10px] font-semibold text-white">
                                                    Inactive
                                                </span>
                                            )
                                        }
                                    </div>

                                    {
                                        data.discount > 0 && (
                                            <div className="absolute right-2 top-2 bg-black px-2 py-1 text-[10px] font-semibold text-white">
                                                {data.discount}% OFF
                                            </div>
                                        )
                                    }
                                </div>

                                <div className="p-3">
                                    <p className="truncate text-sm font-semibold text-gray-900">
                                        {data.product}
                                    </p>

                                    {
                                        typeof data.category === 'object' && (
                                            <p className="mt-1 truncate text-xs text-gray-400">
                                                {data.category?.category}
                                            </p>
                                        )
                                    }

                                    {
                                        data.tags?.length > 0 && (
                                            <div className="mt-2 flex flex-wrap gap-1">
                                                {
                                                    data.tags.slice(0, 2).map((tag, tagIndex) => {
                                                        return (
                                                            <span
                                                                key={tagIndex}
                                                                className="bg-yellow-50 px-2 py-1 text-[10px] font-medium text-yellow-700"
                                                            >
                                                                {typeof tag === 'object'
                                                                    ? tag.name || tag.tag
                                                                    : tag}
                                                            </span>
                                                        )
                                                    })
                                                }

                                                {
                                                    data.tags.length > 2 && (
                                                        <span className="px-1 py-1 text-[10px] text-gray-400">
                                                            +{data.tags.length - 2}
                                                        </span>
                                                    )
                                                }
                                            </div>
                                        )
                                    }

                                    <div className="mt-3 grid grid-cols-2 gap-2 border-t border-gray-100 pt-3">
                                        <div>
                                            <p className="text-[10px] uppercase text-gray-400">
                                                Hourly
                                            </p>
                                            <p className="text-sm font-semibold text-gray-900">
                                                Rs. {data.hourly_price}
                                            </p>
                                        </div>

                                        <div>
                                            <p className="text-[10px] uppercase text-gray-400">
                                                Daily
                                            </p>
                                            <p className="text-sm font-semibold text-yellow-600">
                                                Rs. {data.daily_price}
                                            </p>
                                        </div>

                                        <div>
                                            <p className="text-[10px] uppercase text-gray-400">
                                                Weekly
                                            </p>
                                            <p className="text-sm font-semibold text-gray-900">
                                                Rs. {data.weekly_price}
                                            </p>
                                        </div>

                                        <div>
                                            <p className="text-[10px] uppercase text-gray-400">
                                                Stock
                                            </p>
                                            <p className="text-sm font-semibold text-gray-900">
                                                {data.stock}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )
                    })
                }
            </div>
        </div>
    )
}

export default ProductListDash