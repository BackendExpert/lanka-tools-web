import React, { useEffect, useState } from 'react'
import API from '../../../../services/api'
import Toast from '../../../../component/Toast/Toast'
import DefaultButton from '../../../../component/Buttons/DefaultButton'
import DefaultInput from '../../../../component/Form/DefaultInput'
import TextAreaInput from '../../../../component/Form/TextAreaInput'
import FileInput from '../../../../component/Form/FileInput'
import Dropdown from '../../../../component/Form/Dropdown'
import useForm from '../../../../hooks/useForm'

const UpdateProduct = ({ productID, productdata }) => {
    const token = localStorage.getItem('access_token')

    const [loading, setLoading] = useState(false)
    const [toast, setToast] = useState(null)
    const [categories, setCategories] = useState([])
    const [subCategories, setSubCategories] = useState([])
    const [tag, setTag] = useState('')

    const { values, handleChange } = useForm({
        description: '',
        category: '',
        sub_category: [],
        hourly_price: '',
        daily_price: '',
        weekly_price: '',
        discount: '',
        stock: '',
        tags: [],
        product_status: true,
        files: [],
    })

    useEffect(() => {
        if (!productdata) {
            return
        }

        values.description = productdata.description || ''
        values.category = productdata.category?._id || productdata.category || ''
        values.sub_category = productdata.sub_category || []
        values.hourly_price = productdata.hourly_price ?? ''
        values.daily_price = productdata.daily_price ?? ''
        values.weekly_price = productdata.weekly_price ?? ''
        values.discount = productdata.discount ?? ''
        values.stock = productdata.stock ?? ''
        values.tags = productdata.tags || []
        values.product_status = productdata.product_status ?? true

        const categoryId = productdata.category?._id || productdata.category
        const selectedCategory = categories.find((item) => item._id === categoryId)

        if (selectedCategory?.sub_category) {
            setSubCategories(selectedCategory.sub_category)
        }
    }, [productdata, categories])

    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const res = await API.get('/product/fetch-categories', {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                })

                if (res.data.success === true) {
                    setCategories(res.data.result)
                }
            } catch (error) {
                console.error(error)
            }
        }

        if (token) {
            fetchCategories()
        }
    }, [token])

    const handleCategoryChange = (e) => {
        values.category = e.target.value
        values.sub_category = []

        const category = categories.find((item) => item._id === e.target.value)

        if (category?.sub_category) {
            setSubCategories(category.sub_category)
        } else {
            setSubCategories([])
        }
    }

    const handleSubCategoryChange = (e) => {
        values.sub_category = [e.target.value]
    }

    const handleTagAdd = () => {
        const value = tag.trim()

        if (!value || values.tags.includes(value)) {
            return
        }

        values.tags = [...values.tags, value]
        setTag('')
    }

    const handleTagRemove = (index) => {
        values.tags = values.tags.filter((_, i) => i !== index)
    }

    const handleProductImagesChange = (e) => {
        values.files = Array.from(e.target.files || [])
    }

    const handleStatusChange = (e) => {
        values.product_status = e.target.value === 'true'
    }

    const handleUpdateProduct = async (e) => {
        e.preventDefault()

        if (!productID) {
            setToast({
                success: false,
                message: 'Product ID is missing',
            })
            return
        }

        setLoading(true)

        try {
            const formData = new FormData()

            formData.append('description', values.description)
            formData.append('category', values.category)
            formData.append('hourly_price', String(Number(values.hourly_price)))
            formData.append('daily_price', String(Number(values.daily_price)))
            formData.append('weekly_price', String(Number(values.weekly_price)))
            formData.append('stock', String(Number(values.stock)))
            formData.append('product_status', values.product_status === true ? 'true' : 'false')

            if (values.discount !== '') {
                formData.append('discount', String(Number(values.discount)))
            }

            values.sub_category.forEach((sub) => {
                formData.append('sub_category[]', sub)
            })

            values.tags.forEach((item) => {
                formData.append('tags[]', item)
            })

            values.files.forEach((file) => {
                formData.append('files', file)
            })

            const res = await API.patch(`/product/update-product/${productID}`, formData, {
                headers: {
                    Authorization: `Bearer ${token}`,
                    'Content-Type': 'multipart/form-data',
                },
            })

            if (res.data.success === true) {
                setToast({
                    success: true,
                    message: res.data.message,
                })

                setTimeout(() => {
                    window.location.reload()
                }, 3000)
            }
        } catch (err) {
            setToast({
                success: false,
                message: err.response?.data?.message || 'Something went wrong',
            })
        } finally {
            setLoading(false)
        }
    }

    const categoryOptions = categories
        .filter((category) => category.category_stats !== false)
        .map((category) => ({
            value: category._id,
            label: category.category,
        }))

    const subCategoryOptions = subCategories.map((sub) => ({
        value: sub,
        label: sub,
    }))

    return (
        <div className="w-full">
            {toast && (
                <div className="fixed right-8 top-20 z-50">
                    <Toast
                        success={toast.success}
                        message={toast.message}
                        onClose={() => setToast(null)}
                    />
                </div>
            )}

            <form
                onSubmit={handleUpdateProduct}
                className="w-full border border-gray-200 bg-white p-6"
            >
                <TextAreaInput
                    label="Product Description"
                    name="description"
                    value={values.description}
                    onChange={handleChange}
                    placeholder="Enter product description"
                    rows={5}
                    required
                />

                <Dropdown
                    label="Category"
                    name="category"
                    value={values.category}
                    onChange={handleCategoryChange}
                    required
                    options={categoryOptions}
                />

                {subCategories.length > 0 && (
                    <Dropdown
                        label="Sub Category"
                        name="sub_category"
                        value={values.sub_category[0] || ''}
                        onChange={handleSubCategoryChange}
                        options={subCategoryOptions}
                    />
                )}

                <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
                    <DefaultInput
                        label="Hourly Price"
                        name="hourly_price"
                        type="number"
                        value={values.hourly_price}
                        onChange={handleChange}
                        placeholder="Enter hourly price"
                        required
                    />

                    <DefaultInput
                        label="Daily Price"
                        name="daily_price"
                        type="number"
                        value={values.daily_price}
                        onChange={handleChange}
                        placeholder="Enter daily price"
                        required
                    />

                    <DefaultInput
                        label="Weekly Price"
                        name="weekly_price"
                        type="number"
                        value={values.weekly_price}
                        onChange={handleChange}
                        placeholder="Enter weekly price"
                        required
                    />
                </div>

                <DefaultInput
                    label="Discount"
                    name="discount"
                    type="number"
                    value={values.discount}
                    onChange={handleChange}
                    placeholder="Enter product discount"
                />

                <DefaultInput
                    label="Stock"
                    name="stock"
                    type="number"
                    value={values.stock}
                    onChange={handleChange}
                    placeholder="Enter stock quantity"
                    required
                />

                <div className="mb-5">
                    <label className="mb-2 block text-sm font-medium text-gray-700">
                        Product Status
                    </label>

                    <select
                        name="product_status"
                        value={String(values.product_status)}
                        onChange={handleStatusChange}
                        className="w-full border border-gray-300 px-3 py-2.5 text-sm outline-none"
                    >
                        <option value="true">Active</option>
                        <option value="false">Inactive</option>
                    </select>
                </div>

                <DefaultInput
                    label="Tag"
                    name="tag"
                    value={tag}
                    onChange={(e) => setTag(e.target.value)}
                    placeholder="Enter product tag"
                />

                <div className="mb-5 flex justify-end">
                    <DefaultButton
                        type="button"
                        label="Add Tag"
                        onClick={handleTagAdd}
                        disabled={!tag.trim()}
                    />
                </div>

                {values.tags.length > 0 && (
                    <div className="mb-6">
                        <p className="mb-3 text-xs font-semibold">
                            Product Tags
                        </p>

                        <div className="space-y-2">
                            {values.tags.map((item, index) => (
                                <div
                                    key={`${item}-${index}`}
                                    className="flex items-center justify-between border border-gray-200 bg-gray-50 px-4 py-3"
                                >
                                    <span className="text-sm font-semibold text-gray-800">
                                        {item}
                                    </span>

                                    <DefaultButton
                                        type="button"
                                        label="Remove"
                                        onClick={() => handleTagRemove(index)}
                                    />
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                <FileInput
                    label="Product Images"
                    name="files"
                    onChange={handleProductImagesChange}
                    multiple
                />

                <div className="flex justify-end pt-3">
                    <DefaultButton
                        type="submit"
                        label={loading ? 'Updating...' : 'Update Product'}
                        disabled={loading}
                    />
                </div>
            </form>
        </div>
    )
}

export default UpdateProduct