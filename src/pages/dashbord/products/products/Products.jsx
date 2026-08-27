import React, { useEffect, useMemo, useState } from 'react'
import API from '../../../../services/api'
import DefaultInput from '../../../../component/Form/DefaultInput'
import Dropdown from '../../../../component/Form/Dropdown'

const Products = () => {
    const token = localStorage.getItem('access_token')

    const [products, setProducts] = useState([])
    const [search, setSearch] = useState('')
    const [category, setCategory] = useState('')
    const [subCategory, setSubCategory] = useState('')
    const [currentPage, setCurrentPage] = useState(1)

    const perPage = 25

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const res = await API.get('product/fetch-products', {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                })

                if (res.data.success === true) {
                    setProducts(res.data.result || [])
                }
            } catch (error) {
                console.error('Failed to fetch products:', error)
            }
        }

        fetchProducts()
    }, [token])

    const categoryOptions = useMemo(() => {
        const categories = []

        products.forEach((product) => {
            if (
                typeof product.category === 'object' &&
                product.category?.category &&
                !categories.some(
                    (item) => item.value === product.category._id
                )
            ) {
                categories.push({
                    value: product.category._id,
                    label: product.category.category,
                })
            }
        })

        return categories
    }, [products])

    const subCategoryOptions = useMemo(() => {
        if (!category) return []

        const subCategories = []

        products.forEach((product) => {
            if (
                typeof product.category === 'object' &&
                product.category?._id === category
            ) {
                product.category.sub_category?.forEach((item) => {
                    if (!subCategories.some((x) => x.value === item)) {
                        subCategories.push({
                            value: item,
                            label: item,
                        })
                    }
                })
            }
        })

        return subCategories
    }, [products, category])

    const filteredProducts = useMemo(() => {
        return products.filter((product) => {
            const name = product.product?.toLowerCase() || ''

            const productCategory =
                typeof product.category === 'object'
                    ? product.category?._id
                    : product.category

            return (
                name.includes(search.toLowerCase().trim()) &&
                (!category || productCategory === category) &&
                (!subCategory ||
                    product.sub_category?.includes(subCategory))
            )
        })
    }, [products, search, category, subCategory])

    const totalPages = Math.ceil(
        filteredProducts.length / perPage
    )

    const paginatedProducts = filteredProducts.slice(
        (currentPage - 1) * perPage,
        currentPage * perPage
    )

    useEffect(() => {
        setCurrentPage(1)
    }, [search, category, subCategory])

    return (
        <div className="w-full max-w-full overflow-hidden bg-white p-3 sm:p-5 lg:p-6">

            <div className="w-full max-w-full">

                <div className="mb-5">
                    <h1 className="text-xl font-bold text-gray-900 sm:text-2xl">
                        Products
                    </h1>

                    <p className="mt-1 text-xs text-gray-500 sm:text-sm">
                        Manage your products
                    </p>
                </div>

                <div className="mb-5 w-full rounded-xl border border-gray-200 bg-white p-3 shadow-sm sm:p-5">

                    <div className="grid w-full grid-cols-1 gap-0 sm:grid-cols-2 sm:gap-x-4 lg:grid-cols-3">

                        <DefaultInput
                            label="Search Product"
                            name="search"
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            placeholder="Search product..."
                        />

                        <Dropdown
                            label="Category"
                            name="category"
                            value={category}
                            onChange={(e) => {
                                setCategory(e.target.value)
                                setSubCategory('')
                            }}
                            options={categoryOptions}
                        />

                        <Dropdown
                            label="Sub Category"
                            name="sub_category"
                            value={subCategory}
                            onChange={(e) =>
                                setSubCategory(e.target.value)
                            }
                            options={subCategoryOptions}
                        />

                    </div>

                    {(search || category || subCategory) && (
                        <button
                            type="button"
                            onClick={() => {
                                setSearch('')
                                setCategory('')
                                setSubCategory('')
                            }}
                            className="w-full rounded-lg border border-gray-200 px-4 py-2.5 text-sm font-medium text-gray-700 hover:bg-gray-50 sm:w-auto"
                        >
                            Clear Filters
                        </button>
                    )}

                </div>

                <div className="w-full max-w-full rounded-xl border border-gray-200 bg-white shadow-sm">

                    <div className="flex items-center justify-between border-b border-gray-200 p-4">

                        <div>
                            <h2 className="text-sm font-semibold text-gray-900 sm:text-base">
                                Product List
                            </h2>

                            <p className="mt-1 text-xs text-gray-500">
                                {filteredProducts.length} products
                            </p>
                        </div>

                        {totalPages > 0 && (
                            <span className="text-xs text-gray-500">
                                {currentPage} / {totalPages}
                            </span>
                        )}

                    </div>

                    <div className="grid w-full grid-cols-1 gap-3 p-3 sm:grid-cols-2 sm:p-4 lg:grid-cols-3 xl:grid-cols-4">

                        {paginatedProducts.length > 0 ? (

                            paginatedProducts.map((data, index) => {
                                return (
                                    <div
                                        key={data._id || index}
                                        className="w-full min-w-0 rounded-xl border border-gray-200 bg-white p-3 transition hover:shadow-md"
                                    >

                                        <div className="flex min-w-0 gap-3">

                                            <div className="h-14 w-14 shrink-0 overflow-hidden rounded-lg bg-gray-100">

                                                {data.product_imgs?.[0] ? (
                                                    <img
                                                        src={`${import.meta.env.VITE_APP_API_FILES}/uploads/product/${data.product_imgs[0]}`}
                                                        alt={data.product}
                                                        className="h-full w-full object-cover"
                                                    />
                                                ) : (
                                                    <div className="flex h-full w-full items-center justify-center text-[10px] text-gray-400">
                                                        No Image
                                                    </div>
                                                )}

                                            </div>

                                            <div className="min-w-0 flex-1">

                                                <p className="truncate text-sm font-semibold text-gray-900">
                                                    {data.product}
                                                </p>

                                                <p className="mt-1 line-clamp-2 text-xs text-gray-500">
                                                    {data.description}
                                                </p>

                                            </div>

                                        </div>

                                        <div className="mt-4 space-y-2">

                                            <div className="flex items-center justify-between gap-3">
                                                <span className="text-xs text-gray-400">
                                                    Category
                                                </span>

                                                <span className="max-w-[60%] truncate text-right text-xs font-medium text-gray-700">
                                                    {data.category?.category ||
                                                        data.category ||
                                                        '-'}
                                                </span>
                                            </div>

                                            <div className="flex items-center justify-between gap-3">
                                                <span className="text-xs text-gray-400">
                                                    Price
                                                </span>

                                                <span className="text-sm font-bold text-gray-900">
                                                    Rs.{' '}
                                                    {Number(
                                                        data.price || 0
                                                    ).toLocaleString()}
                                                </span>
                                            </div>

                                            <div className="flex items-center justify-between gap-3">
                                                <span className="text-xs text-gray-400">
                                                    Stock
                                                </span>

                                                <span className="text-xs font-semibold text-gray-700">
                                                    {data.stock}
                                                </span>
                                            </div>

                                            <div className="flex items-center justify-between gap-3">
                                                <span className="text-xs text-gray-400">
                                                    Status
                                                </span>

                                                <span
                                                    className={`rounded-full px-2.5 py-1 text-[10px] font-semibold ${data.product_status
                                                        ? 'bg-green-100 text-green-700'
                                                        : 'bg-red-100 text-red-700'
                                                        }`}
                                                >
                                                    {data.product_status
                                                        ? 'Active'
                                                        : 'Inactive'}
                                                </span>
                                            </div>

                                        </div>

                                        <div className="mt-4 flex gap-2">
                                            <a
                                                href={`/dashboard/product/view/${data._id}`}
                                                className="text-center rounded-lg border border-gray-200 px-3 py-2 text-xs font-medium text-gray-700 hover:bg-gray-50"
                                            >
                                                View
                                            </a>
                                        </div>

                                    </div>
                                )
                            })

                        ) : (

                            <div className="col-span-full py-14 text-center">

                                <p className="text-sm font-semibold text-gray-600">
                                    No products found
                                </p>

                                <p className="mt-1 text-xs text-gray-400">
                                    Try changing your search or filters.
                                </p>

                            </div>

                        )}

                    </div>

                    {totalPages > 0 && (
                        <div className="flex w-full items-center justify-between border-t border-gray-200 p-3 sm:p-4">

                            <button
                                type="button"
                                disabled={currentPage === 1}
                                onClick={() =>
                                    setCurrentPage(
                                        currentPage - 1
                                    )
                                }
                                className="rounded-lg border border-gray-200 px-3 py-2 text-xs font-medium text-gray-700 hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-40 sm:px-4 sm:text-sm"
                            >
                                Previous
                            </button>

                            <span className="text-xs text-gray-500">
                                Page {currentPage} of {totalPages}
                            </span>

                            <button
                                type="button"
                                disabled={
                                    currentPage === totalPages
                                }
                                onClick={() =>
                                    setCurrentPage(
                                        currentPage + 1
                                    )
                                }
                                className="rounded-lg border border-gray-200 px-3 py-2 text-xs font-medium text-gray-700 hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-40 sm:px-4 sm:text-sm"
                            >
                                Next
                            </button>

                        </div>
                    )}

                </div>

            </div>

        </div>
    )
}

export default Products