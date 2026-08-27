import React, { useEffect, useMemo, useState } from 'react'
import API from '../../services/api'

const Products = () => {
    const [products, setProducts] = useState([])
    const [loading, setLoading] = useState(true)

    const [search, setSearch] = useState('')
    const [category, setCategory] = useState('')
    const [subCategory, setSubCategory] = useState('')
    const [priceType, setPriceType] = useState('daily')
    const [minPrice, setMinPrice] = useState('')
    const [maxPrice, setMaxPrice] = useState('')
    const [discount, setDiscount] = useState('')
    const [stock, setStock] = useState('')
    const [sort, setSort] = useState('default')
    const [showFilters, setShowFilters] = useState(false)

    useEffect(() => {
        const fetchpublicproducts = async () => {
            try {
                const res = await API.get('/product/public-products')

                if (res.data.success === true) {
                    setProducts(res.data.result)
                }
            } catch (error) {
                console.error(error)
            } finally {
                setLoading(false)
            }
        }

        fetchpublicproducts()
    }, [])

    const categories = useMemo(() => {
        const uniqueCategories = products
            .map((product) => product.category)
            .filter((item) => item)

        return uniqueCategories.filter(
            (item, index, self) =>
                index === self.findIndex(
                    (categoryItem) => categoryItem._id === item._id
                )
        )
    }, [products])

    const selectedCategory = useMemo(() => {
        return categories.find((item) => item._id === category)
    }, [categories, category])

    const availableSubCategories = useMemo(() => {
        if (!selectedCategory?.sub_category) {
            return []
        }

        return selectedCategory.sub_category
    }, [selectedCategory])

    const getProductPrice = (product) => {
        if (priceType === 'hourly') {
            return Number(product.hourly_price || 0)
        }

        if (priceType === 'weekly') {
            return Number(product.weekly_price || 0)
        }

        return Number(product.daily_price || 0)
    }

    const filteredProducts = useMemo(() => {
        let result = [...products]

        if (search.trim()) {
            const searchValue = search.toLowerCase().trim()

            result = result.filter((product) =>
                product.product?.toLowerCase().includes(searchValue) ||
                product.description?.toLowerCase().includes(searchValue) ||
                product.category?.category?.toLowerCase().includes(searchValue) ||
                product.sub_category?.some((sub) =>
                    sub.toLowerCase().includes(searchValue)
                ) ||
                product.tags?.some((tag) =>
                    tag.toLowerCase().includes(searchValue)
                )
            )
        }

        if (category) {
            result = result.filter(
                (product) => product.category?._id === category
            )
        }

        if (subCategory) {
            result = result.filter(
                (product) =>
                    product.sub_category?.includes(subCategory)
            )
        }

        if (minPrice !== '') {
            result = result.filter(
                (product) =>
                    getProductPrice(product) >= Number(minPrice)
            )
        }

        if (maxPrice !== '') {
            result = result.filter(
                (product) =>
                    getProductPrice(product) <= Number(maxPrice)
            )
        }

        if (discount === 'discounted') {
            result = result.filter(
                (product) => Number(product.discount || 0) > 0
            )
        }

        if (discount === 'no-discount') {
            result = result.filter(
                (product) => Number(product.discount || 0) === 0
            )
        }

        if (stock === 'in-stock') {
            result = result.filter(
                (product) => Number(product.stock || 0) > 0
            )
        }

        if (stock === 'out-of-stock') {
            result = result.filter(
                (product) => Number(product.stock || 0) <= 0
            )
        }

        if (sort === 'price-low') {
            result.sort(
                (a, b) =>
                    getProductPrice(a) - getProductPrice(b)
            )
        }

        if (sort === 'price-high') {
            result.sort(
                (a, b) =>
                    getProductPrice(b) - getProductPrice(a)
            )
        }

        if (sort === 'discount-high') {
            result.sort(
                (a, b) =>
                    Number(b.discount || 0) -
                    Number(a.discount || 0)
            )
        }

        if (sort === 'stock-high') {
            result.sort(
                (a, b) =>
                    Number(b.stock || 0) -
                    Number(a.stock || 0)
            )
        }

        if (sort === 'name-az') {
            result.sort(
                (a, b) =>
                    (a.product || '').localeCompare(
                        b.product || ''
                    )
            )
        }

        if (sort === 'name-za') {
            result.sort(
                (a, b) =>
                    (b.product || '').localeCompare(
                        a.product || ''
                    )
            )
        }

        return result
    }, [
        products,
        search,
        category,
        subCategory,
        priceType,
        minPrice,
        maxPrice,
        discount,
        stock,
        sort,
    ])

    const clearFilters = () => {
        setSearch('')
        setCategory('')
        setSubCategory('')
        setPriceType('daily')
        setMinPrice('')
        setMaxPrice('')
        setDiscount('')
        setStock('')
        setSort('default')
    }

    const hasFilters =
        search ||
        category ||
        subCategory ||
        priceType !== 'daily' ||
        minPrice ||
        maxPrice ||
        discount ||
        stock ||
        sort !== 'default'

    return (
        <div className="min-h-screen bg-[#f7f7f5]">
            <section className="mx-auto max-w-[1500px] px-4 py-8 sm:px-6 lg:px-8 lg:py-12">

                <div className="mb-10 flex flex-col gap-6 border-b border-slate-200 pb-8 lg:flex-row lg:items-end lg:justify-between">
                    <div>
                        <p className="text-xs font-bold uppercase tracking-[0.25em] text-yellow-600">
                            Premium Collection
                        </p>

                        <h1 className="mt-3 text-3xl font-bold tracking-tight text-slate-950 sm:text-4xl lg:text-5xl">
                            Explore Products
                        </h1>

                        <p className="mt-3 max-w-2xl text-sm leading-6 text-slate-500 sm:text-base">
                            Find the right product and choose the rental period that works best for you.
                        </p>
                    </div>

                    {!loading && (
                        <div className="flex items-center gap-3">
                            <div className="rounded-full border border-slate-200 bg-white px-5 py-2.5 text-sm font-semibold text-slate-700">
                                {filteredProducts.length} Products
                            </div>

                            <div className="hidden rounded-full bg-yellow-400 px-5 py-2.5 text-sm font-bold text-slate-950 sm:block">
                                {priceType === 'hourly'
                                    ? 'Hourly'
                                    : priceType === 'weekly'
                                        ? 'Weekly'
                                        : 'Daily'}
                            </div>
                        </div>
                    )}
                </div>

                {!loading && (
                    <div className="mb-10">

                        <div className="flex flex-col gap-3 lg:flex-row">

                            <div className="relative flex-1">
                                <input
                                    type="text"
                                    value={search}
                                    onChange={(e) => setSearch(e.target.value)}
                                    placeholder="Search products, categories, tags..."
                                    className="h-14 w-full rounded-2xl border border-slate-200 bg-white px-5 text-sm text-slate-900 outline-none transition focus:border-yellow-400 focus:ring-4 focus:ring-yellow-100"
                                />
                            </div>

                            <select
                                value={priceType}
                                onChange={(e) => setPriceType(e.target.value)}
                                className="h-14 rounded-2xl border border-slate-200 bg-white px-5 text-sm font-semibold text-slate-700 outline-none transition focus:border-yellow-400 focus:ring-4 focus:ring-yellow-100 lg:w-48"
                            >
                                <option value="hourly">
                                    Hourly Price
                                </option>
                                <option value="daily">
                                    Daily Price
                                </option>
                                <option value="weekly">
                                    Weekly Price
                                </option>
                            </select>

                            <select
                                value={sort}
                                onChange={(e) => setSort(e.target.value)}
                                className="h-14 rounded-2xl border border-slate-200 bg-white px-5 text-sm font-semibold text-slate-700 outline-none transition focus:border-yellow-400 focus:ring-4 focus:ring-yellow-100 lg:w-56"
                            >
                                <option value="default">
                                    Sort Products
                                </option>
                                <option value="price-low">
                                    Price: Low to High
                                </option>
                                <option value="price-high">
                                    Price: High to Low
                                </option>
                                <option value="discount-high">
                                    Highest Discount
                                </option>
                                <option value="stock-high">
                                    Highest Stock
                                </option>
                                <option value="name-az">
                                    Name: A to Z
                                </option>
                                <option value="name-za">
                                    Name: Z to A
                                </option>
                            </select>

                            <button
                                type="button"
                                onClick={() => setShowFilters(!showFilters)}
                                className="h-14 rounded-2xl bg-slate-950 px-6 text-sm font-bold text-white transition hover:bg-yellow-400 hover:text-slate-950"
                            >
                                {showFilters
                                    ? 'Close Filters'
                                    : 'Advanced Filters'}
                            </button>
                        </div>

                        {showFilters && (
                            <div className="mt-4 rounded-3xl border border-slate-200 bg-white p-5 sm:p-7">

                                <div className="mb-6 flex flex-col gap-3 border-b border-slate-100 pb-5 sm:flex-row sm:items-center sm:justify-between">
                                    <div>
                                        <p className="text-xs font-bold uppercase tracking-[0.2em] text-yellow-600">
                                            Filter Products
                                        </p>

                                        <h2 className="mt-1 text-xl font-bold text-slate-950">
                                            Refine your search
                                        </h2>
                                    </div>

                                    {hasFilters && (
                                        <button
                                            type="button"
                                            onClick={clearFilters}
                                            className="w-fit rounded-xl border border-slate-200 px-4 py-2 text-sm font-semibold text-slate-600 transition hover:border-yellow-400 hover:bg-yellow-50 hover:text-yellow-700"
                                        >
                                            Clear All
                                        </button>
                                    )}
                                </div>

                                <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">

                                    <div>
                                        <label className="mb-2 block text-xs font-bold uppercase tracking-wider text-slate-500">
                                            Category
                                        </label>

                                        <select
                                            value={category}
                                            onChange={(e) => {
                                                setCategory(e.target.value)
                                                setSubCategory('')
                                            }}
                                            className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm outline-none focus:border-yellow-400 focus:ring-4 focus:ring-yellow-100"
                                        >
                                            <option value="">
                                                All Categories
                                            </option>

                                            {categories.map((item) => (
                                                <option
                                                    key={item._id}
                                                    value={item._id}
                                                >
                                                    {item.category}
                                                </option>
                                            ))}
                                        </select>
                                    </div>

                                    <div>
                                        <label className="mb-2 block text-xs font-bold uppercase tracking-wider text-slate-500">
                                            Sub Category
                                        </label>

                                        <select
                                            value={subCategory}
                                            onChange={(e) =>
                                                setSubCategory(e.target.value)
                                            }
                                            disabled={!category}
                                            className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm outline-none disabled:cursor-not-allowed disabled:opacity-50 focus:border-yellow-400 focus:ring-4 focus:ring-yellow-100"
                                        >
                                            <option value="">
                                                All Sub Categories
                                            </option>

                                            {availableSubCategories.map(
                                                (item, index) => (
                                                    <option
                                                        key={`${item}-${index}`}
                                                        value={item}
                                                    >
                                                        {item}
                                                    </option>
                                                )
                                            )}
                                        </select>
                                    </div>

                                    <div>
                                        <label className="mb-2 block text-xs font-bold uppercase tracking-wider text-slate-500">
                                            Minimum Price
                                        </label>

                                        <input
                                            type="number"
                                            min="0"
                                            value={minPrice}
                                            onChange={(e) =>
                                                setMinPrice(e.target.value)
                                            }
                                            placeholder="0.00"
                                            className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm outline-none focus:border-yellow-400 focus:ring-4 focus:ring-yellow-100"
                                        />
                                    </div>

                                    <div>
                                        <label className="mb-2 block text-xs font-bold uppercase tracking-wider text-slate-500">
                                            Maximum Price
                                        </label>

                                        <input
                                            type="number"
                                            min="0"
                                            value={maxPrice}
                                            onChange={(e) =>
                                                setMaxPrice(e.target.value)
                                            }
                                            placeholder="10000.00"
                                            className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm outline-none focus:border-yellow-400 focus:ring-4 focus:ring-yellow-100"
                                        />
                                    </div>

                                    <div>
                                        <label className="mb-2 block text-xs font-bold uppercase tracking-wider text-slate-500">
                                            Discount
                                        </label>

                                        <select
                                            value={discount}
                                            onChange={(e) =>
                                                setDiscount(e.target.value)
                                            }
                                            className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm outline-none focus:border-yellow-400 focus:ring-4 focus:ring-yellow-100"
                                        >
                                            <option value="">
                                                All Products
                                            </option>

                                            <option value="discounted">
                                                Discounted Only
                                            </option>

                                            <option value="no-discount">
                                                No Discount
                                            </option>
                                        </select>
                                    </div>

                                    <div>
                                        <label className="mb-2 block text-xs font-bold uppercase tracking-wider text-slate-500">
                                            Availability
                                        </label>

                                        <select
                                            value={stock}
                                            onChange={(e) =>
                                                setStock(e.target.value)
                                            }
                                            className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm outline-none focus:border-yellow-400 focus:ring-4 focus:ring-yellow-100"
                                        >
                                            <option value="">
                                                All Products
                                            </option>

                                            <option value="in-stock">
                                                In Stock
                                            </option>

                                            <option value="out-of-stock">
                                                Out of Stock
                                            </option>
                                        </select>
                                    </div>

                                    <div>
                                        <label className="mb-2 block text-xs font-bold uppercase tracking-wider text-slate-500">
                                            Pricing Period
                                        </label>

                                        <select
                                            value={priceType}
                                            onChange={(e) =>
                                                setPriceType(e.target.value)
                                            }
                                            className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm outline-none focus:border-yellow-400 focus:ring-4 focus:ring-yellow-100"
                                        >
                                            <option value="hourly">
                                                Hourly
                                            </option>

                                            <option value="daily">
                                                Daily
                                            </option>

                                            <option value="weekly">
                                                Weekly
                                            </option>
                                        </select>
                                    </div>

                                </div>

                                <div className="mt-6 flex flex-wrap gap-2">
                                    {search && (
                                        <span className="rounded-full bg-yellow-50 px-3 py-1.5 text-xs font-semibold text-yellow-700">
                                            Search: {search}
                                        </span>
                                    )}

                                    {category && (
                                        <span className="rounded-full bg-slate-100 px-3 py-1.5 text-xs font-semibold text-slate-600">
                                            Category selected
                                        </span>
                                    )}

                                    {subCategory && (
                                        <span className="rounded-full bg-slate-100 px-3 py-1.5 text-xs font-semibold text-slate-600">
                                            {subCategory}
                                        </span>
                                    )}

                                    {discount === 'discounted' && (
                                        <span className="rounded-full bg-green-50 px-3 py-1.5 text-xs font-semibold text-green-700">
                                            Discounted
                                        </span>
                                    )}

                                    {stock === 'in-stock' && (
                                        <span className="rounded-full bg-green-50 px-3 py-1.5 text-xs font-semibold text-green-700">
                                            In Stock
                                        </span>
                                    )}
                                </div>

                                <div className="mt-6 border-t border-slate-100 pt-5 text-sm text-slate-500">
                                    Showing{' '}
                                    <span className="font-bold text-slate-950">
                                        {filteredProducts.length}
                                    </span>{' '}
                                    of{' '}
                                    <span className="font-bold text-slate-950">
                                        {products.length}
                                    </span>{' '}
                                    products
                                </div>
                            </div>
                        )}
                    </div>
                )}

                {loading ? (
                    <div className="grid grid-cols-2 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                        {Array.from({ length: 8 }).map((_, index) => (
                            <div
                                key={index}
                                className="overflow-hidden rounded-3xl border border-slate-200 bg-white"
                            >
                                <div className="aspect-square animate-pulse bg-slate-200" />

                                <div className="space-y-3 p-5">
                                    <div className="h-3 w-1/3 animate-pulse rounded bg-slate-200" />
                                    <div className="h-5 animate-pulse rounded bg-slate-200" />
                                    <div className="h-5 w-1/2 animate-pulse rounded bg-slate-200" />
                                </div>
                            </div>
                        ))}
                    </div>
                ) : filteredProducts.length === 0 ? (
                    <div className="flex min-h-[420px] items-center justify-center rounded-3xl border border-slate-200 bg-white px-6 text-center">
                        <div>
                            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-yellow-50 text-yellow-600">
                                <svg
                                    className="h-7 w-7"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth="1.8"
                                >
                                    <circle
                                        cx="11"
                                        cy="11"
                                        r="7"
                                    />
                                    <path d="m20 20-4-4" />
                                </svg>
                            </div>

                            <h2 className="mt-5 text-xl font-bold text-slate-950">
                                No products found
                            </h2>

                            <p className="mt-2 text-sm text-slate-500">
                                Try changing your search or filter options.
                            </p>

                            {hasFilters && (
                                <button
                                    type="button"
                                    onClick={clearFilters}
                                    className="mt-5 rounded-xl bg-slate-950 px-5 py-3 text-sm font-bold text-white transition hover:bg-yellow-400 hover:text-slate-950"
                                >
                                    Clear Filters
                                </button>
                            )}
                        </div>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 gap-4 sm:gap-6 lg:grid-cols-3 xl:grid-cols-4">

                        {filteredProducts.map((product) => {
                            const currentPrice = getProductPrice(product)
                            const discountValue = Number(
                                product.discount || 0
                            )

                            return (
                                <article
                                    key={product._id}
                                    className="group overflow-hidden rounded-3xl border border-slate-200 bg-white transition duration-300 hover:-translate-y-1 hover:border-yellow-300 hover:shadow-xl"
                                >
                                    <div className="relative aspect-square overflow-hidden bg-slate-100">

                                        {product.product_imgs?.[0] ? (
                                            <img
                                                src={`${import.meta.env.VITE_APP_API_FILES}/uploads/product/${product.product_imgs[0]}`}
                                                alt={
                                                    product.product ||
                                                    'Product'
                                                }
                                                className="h-full w-full object-cover transition duration-700 group-hover:scale-105"
                                            />
                                        ) : (
                                            <div className="flex h-full items-center justify-center text-sm text-slate-400">
                                                No Image
                                            </div>
                                        )}

                                        <div className="absolute left-4 top-4 flex flex-col gap-2">
                                            {discountValue > 0 && (
                                                <span className="w-fit rounded-full bg-yellow-400 px-3 py-1.5 text-[10px] font-black uppercase tracking-wide text-slate-950">
                                                    Save {discountValue}
                                                </span>
                                            )}

                                            {Number(product.stock || 0) <= 0 && (
                                                <span className="w-fit rounded-full bg-red-500 px-3 py-1.5 text-[10px] font-black uppercase tracking-wide text-white">
                                                    Out of Stock
                                                </span>
                                            )}
                                        </div>

                                        <div className="absolute bottom-4 right-4 rounded-full bg-white/95 px-3 py-1.5 text-[10px] font-bold uppercase tracking-wide text-slate-700 backdrop-blur">
                                            {priceType}
                                        </div>
                                    </div>

                                    <div className="p-5">

                                        <div className="flex items-center justify-between gap-2">
                                            <p className="truncate text-[10px] font-black uppercase tracking-[0.15em] text-yellow-600">
                                                {product.category?.category ||
                                                    'Product'}
                                            </p>

                                            {Number(product.stock || 0) > 0 && (
                                                <span className="shrink-0 text-[10px] font-bold uppercase tracking-wide text-green-600">
                                                    Available
                                                </span>
                                            )}
                                        </div>

                                        <h2 className="mt-2 line-clamp-2 min-h-[48px] text-base font-bold leading-6 text-slate-950 sm:text-lg">
                                            {product.product}
                                        </h2>

                                        {product.tags?.length > 0 && (
                                            <div className="mt-3 flex flex-wrap gap-1.5">
                                                {product.tags
                                                    .slice(0, 2)
                                                    .map((tag, index) => (
                                                        <span
                                                            key={`${tag}-${index}`}
                                                            className="rounded-full bg-slate-100 px-2.5 py-1 text-[10px] font-semibold text-slate-500"
                                                        >
                                                            #{tag}
                                                        </span>
                                                    ))}
                                            </div>
                                        )}

                                        <div className="mt-5 border-t border-slate-100 pt-4">

                                            <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                                                {priceType} rental price
                                            </p>

                                            <div className="mt-1 flex items-end justify-between gap-3">

                                                <div>
                                                    <span className="text-xl font-black text-slate-950 sm:text-2xl">
                                                        ${currentPrice.toFixed(2)}
                                                    </span>

                                                    <span className="ml-1 text-xs text-slate-400">
                                                        /{priceType === 'hourly'
                                                            ? 'hr'
                                                            : priceType === 'weekly'
                                                                ? 'week'
                                                                : 'day'}
                                                    </span>
                                                </div>

                                                <a
                                                    href={`/view-product/${product._id}`}
                                                    className="inline-flex items-center gap-2 rounded-xl bg-slate-950 px-3 py-2.5 text-xs font-bold text-white transition hover:bg-yellow-400 hover:text-slate-950 sm:px-4"
                                                >
                                                    View
                                                    <svg
                                                        className="h-3.5 w-3.5"
                                                        viewBox="0 0 24 24"
                                                        fill="none"
                                                        stroke="currentColor"
                                                        strokeWidth="2"
                                                    >
                                                        <path d="M5 12h14" />
                                                        <path d="m13 6 6 6-6 6" />
                                                    </svg>
                                                </a>

                                            </div>
                                        </div>

                                        <div className="mt-4 flex items-center justify-between border-t border-slate-100 pt-4">
                                            <span className="text-xs text-slate-400">
                                                Stock
                                            </span>

                                            <span
                                                className={`text-xs font-bold ${Number(product.stock || 0) > 0
                                                        ? 'text-slate-700'
                                                        : 'text-red-500'
                                                    }`}
                                            >
                                                {Number(product.stock || 0) > 0
                                                    ? `${product.stock} units`
                                                    : 'Unavailable'}
                                            </span>
                                        </div>
                                    </div>
                                </article>
                            )
                        })}
                    </div>
                )}

            </section>
        </div>
    )
}

export default Products