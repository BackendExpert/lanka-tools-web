import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import API from '../../../../services/api'
import Toast from '../../../../component/Toast/Toast'
import DefaultButton from '../../../../component/Buttons/DefaultButton'
import DefaultInput from '../../../../component/Form/DefaultInput'
import TextAreaInput from '../../../../component/Form/TextAreaInput'
import FileInput from '../../../../component/Form/FileInput'
import Dropdown from '../../../../component/Form/Dropdown'
import useForm from '../../../../hooks/useForm'

const CreateProduct = () => {
    const token = localStorage.getItem('access_token')
    const navigate = useNavigate()

    const [loading, setLoading] = useState(false)
    const [toast, setToast] = useState(false)
    const [categories, setCategories] = useState([])
    const [subCategories, setSubCategories] = useState([])
    const [tag, setTag] = useState('')
    const [tags, setTags] = useState([])

    const { values, handleChange } = useForm({
        product: '',
        description: '',
        category: '',
        sub_category: [],
        price: '',
        discount: '',
        stock: '',
        tags: [],
        files: [],
    })

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
        setSubCategories([])

        const category = categories.find(
            (item) => item._id === e.target.value
        )

        if (category?.sub_category) {
            setSubCategories(category.sub_category)
        }
    }

    const handleSubCategoryChange = (e) => {
        values.sub_category = [e.target.value]
    }

    const handleTagAdd = () => {
        const value = tag.trim()

        if (!value || tags.includes(value)) {
            return
        }

        const updatedTags = [...tags, value]

        setTags(updatedTags)
        values.tags = updatedTags
        setTag('')
    }

    const handleTagRemove = (index) => {
        const updatedTags = tags.filter(
            (_, i) => i !== index
        )

        setTags(updatedTags)
        values.tags = updatedTags
    }

    const handleProductImagesChange = (e) => {
        values.files = Array.from(e.target.files || [])
    }

    const handleCreateProduct = async (e) => {
        e.preventDefault()

        if (values.files.length < 2) {
            setToast({
                success: false,
                message: 'Please select at least 2 images',
            })
            return
        }

        setLoading(true)

        try {
            const formData = new FormData()

            formData.append('product', values.product)
            formData.append('description', values.description)
            formData.append('category', values.category)
            formData.append('price', values.price)
            formData.append('stock', values.stock)

            if (values.discount !== '') {
                formData.append('discount', values.discount)
            }

            values.sub_category.forEach((sub) => {
                formData.append('sub_category[]', sub)
            })

            values.tags.forEach((tag) => {
                formData.append('tags[]', tag)
            })

            values.files.forEach((file) => {
                formData.append('files', file)
            })

            const res = await API.post(
                '/product/create-product',
                formData,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                        'Content-Type': 'multipart/form-data',
                    },
                }
            )

            if (res.data.success === true) {
                setToast({
                    success: true,
                    message: res.data.message,
                })

                setTimeout(() => {
                    navigate('/dashboard/products')
                }, 3000)
            }
        } catch (err) {
            setToast({
                success: false,
                message:
                    err.response?.data?.message ||
                    'Something went wrong',
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
                <div className="fixed top-20 right-8 z-50">
                    <Toast
                        success={toast.success}
                        message={toast.message}
                        onClose={() => setToast(null)}
                    />
                </div>
            )}

            <form
                onSubmit={handleCreateProduct}
                className="w-full bg-white border border-gray-200 p-6"
            >

                <DefaultInput
                    label="Product"
                    name="product"
                    value={values.product}
                    onChange={handleChange}
                    placeholder="Enter product name"
                    required
                />

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

                <DefaultInput
                    label="Price"
                    name="price"
                    type="number"
                    value={values.price}
                    onChange={handleChange}
                    placeholder="Enter product price"
                    required
                />

                <DefaultInput
                    label="Discount"
                    name="discount"
                    type="number"
                    value={values.discount}
                    onChange={handleChange}
                    placeholder="Enter discount"
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

                <DefaultInput
                    label="Tag"
                    name="tag"
                    value={tag}
                    onChange={(e) => setTag(e.target.value)}
                    placeholder="Enter product tag"
                />

                <div className="flex justify-end mb-5">
                    <DefaultButton
                        type="button"
                        label="Add Tag"
                        onClick={handleTagAdd}
                        disabled={!tag.trim()}
                    />
                </div>

                {tags.length > 0 && (
                    <div className="mb-6">
                        <p className="text-xs font-semibold mb-3">
                            Added Tags
                        </p>

                        <div className="space-y-2">
                            {tags.map((item, index) => (
                                <div
                                    key={`${item}-${index}`}
                                    className="flex items-center justify-between px-4 py-3 bg-gray-50 border border-gray-200"
                                >
                                    <span className="text-sm font-semibold text-gray-800">
                                        {item}
                                    </span>

                                    <DefaultButton
                                        type="button"
                                        label="Remove"
                                        onClick={() =>
                                            handleTagRemove(index)
                                        }
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
                    required
                />

                <div className="flex justify-end pt-3">
                    <DefaultButton
                        type="submit"
                        label={loading ? 'Creating...' : 'Create Product'}
                        disabled={loading}
                    />
                </div>

            </form>
        </div>
    )
}

export default CreateProduct