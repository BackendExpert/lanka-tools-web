import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import API from '../../../../services/api'
import { FaTag } from 'react-icons/fa6'
import useForm from '../../../../hooks/useForm'
import Toast from '../../../../component/Toast/Toast'
import DefaultButton from '../../../../component/Buttons/DefaultButton'
import DefaultInput from '../../../../component/Form/DefaultInput'
import TextAreaInput from '../../../../component/Form/TextAreaInput'
import FileInput from '../../../../component/Form/FileInput'

const ViewCategory = () => {
    const { id } = useParams()
    const token = localStorage.getItem('access_token')

    const [loading, setLoading] = useState(false)
    const [toast, setToast] = useState(false)
    const [category, setCategory] = useState('')
    const [subCategory, setSubCategory] = useState('')
    const [categoryImage, setCategoryImage] = useState(null)

    const { values, handleChange, setValues } = useForm({
        category_desc: '',
        sub_category: [],
    })

    useEffect(() => {
        const fetchcategory = async () => {
            try {
                const res = await API.get(`/product/fetch-category/${id}`, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                })

                if (res.data.success === true) {
                    setCategory(res.data.result)

                    setValues({
                        category_desc: res.data.result.category_desc || '',
                        sub_category: res.data.result.sub_category || [],
                    })
                }
            } catch (err) {
                setToast({
                    success: false,
                    message:
                        err.response?.data?.message ||
                        'Something went wrong',
                })
            }
        }

        if (token && id) {
            fetchcategory()
        }
    }, [token, id])

    const handleCategoryImageChange = (e) => {
        setCategoryImage(e.target.files[0])
    }

    const handleSubCategoryAdd = () => {
        const value = subCategory.trim()

        if (!value) {
            return
        }

        if (values.sub_category.includes(value)) {
            return
        }

        setValues({
            ...values,
            sub_category: [...values.sub_category, value],
        })

        setSubCategory('')
    }

    const handleSubCategoryRemove = (index) => {
        const updatedSubCategories = values.sub_category.filter(
            (_, subIndex) => subIndex !== index
        )

        setValues({
            ...values,
            sub_category: updatedSubCategories,
        })
    }

    const headleUpdateCategory = async (e) => {
        e.preventDefault()
        setLoading(true)

        try {
            const formData = new FormData()

            formData.append('category_desc', values.category_desc)

            values.sub_category.forEach((sub) => {
                formData.append('sub_category[]', sub)
            })

            if (categoryImage) {
                formData.append('category_img', categoryImage)
            }

            const res = await API.patch(
                `/product/update-category/${id}`,
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
                    window.location.reload()
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

    return (
        <div>
            {toast && (
                <div className="fixed top-20 right-8 z-50">
                    <Toast
                        success={toast.success}
                        message={toast.message}
                        onClose={() => setToast(null)}
                    />
                </div>
            )}

            <div className="bg-white p-6 rounded-lg shadow">
                <div className="flex gap-6">
                    <div className="w-1/4">
                        {category?.category_img ? (
                            <img
                                src={`${import.meta.env.VITE_APP_API_FILES}/uploads/category/${category.category_img}`}
                                alt={category?.category || 'Category'}
                                className="w-40 h-40 object-cover rounded-md border border-gray-200"
                            />
                        ) : (
                            <div className="w-40 h-40 flex items-center justify-center bg-gray-100 rounded-md">
                                <FaTag className="text-4xl text-gray-400" />
                            </div>
                        )}
                    </div>

                    <div>
                        <h1 className="text-2xl font-semibold text-gray-800">
                            {category?.category}
                        </h1>

                        <p className="text-gray-500 mt-2 leading-6">
                            {category?.category_desc}
                        </p>

                        <div className="mt-6">
                            <h2 className="font-semibold text-gray-700">
                                Sub Categories
                            </h2>

                            <div className="flex flex-wrap gap-2 mt-3">
                                {category?.sub_category?.map(
                                    (subCategory, index) => {
                                        return (
                                            <div
                                                key={index}
                                                className="px-3 py-2 bg-gray-100 text-gray-700 rounded-md text-sm"
                                            >
                                                {subCategory}
                                            </div>
                                        )
                                    }
                                )}
                            </div>
                        </div>
                    </div>
                </div>

                <form
                    onSubmit={headleUpdateCategory}
                    className="mt-8"
                >
                    <TextAreaInput
                        label="Category Description"
                        name="category_desc"
                        value={values.category_desc}
                        onChange={handleChange}
                        placeholder="Enter category description"
                        rows={5}
                        required
                    />

                    <FileInput
                        label="Category Image"
                        name="category_img"
                        onChange={handleCategoryImageChange}
                    />

                    <DefaultInput
                        label="Sub Category"
                        name="sub_category_input"
                        value={subCategory}
                        onChange={(e) =>
                            setSubCategory(e.target.value)
                        }
                        placeholder="Enter sub category"
                    />

                    <div className="flex justify-end mb-5">
                        <DefaultButton
                            type="button"
                            label="Add Sub Category"
                            onClick={handleSubCategoryAdd}
                            disabled={!subCategory.trim()}
                        />
                    </div>

                    {values.sub_category.length > 0 && (
                        <div className="mb-6">
                            <p className="text-xs font-semibold mb-3">
                                Sub Categories
                            </p>

                            <div className="space-y-2">
                                {values.sub_category.map(
                                    (sub, index) => {
                                        return (
                                            <div
                                                key={`${sub}-${index}`}
                                                className="flex items-center justify-between px-4 py-3 bg-gray-50 border border-gray-200"
                                            >
                                                <span className="text-sm font-semibold text-gray-800">
                                                    {sub}
                                                </span>

                                                <DefaultButton
                                                    type="button"
                                                    label="Remove"
                                                    onClick={() =>
                                                        handleSubCategoryRemove(
                                                            index
                                                        )
                                                    }
                                                />
                                            </div>
                                        )
                                    }
                                )}
                            </div>
                        </div>
                    )}

                    <div className="flex justify-end pt-3">
                        <DefaultButton
                            type="submit"
                            label={
                                loading
                                    ? 'Updating...'
                                    : 'Update Category'
                            }
                            disabled={loading}
                        />
                    </div>
                </form>
            </div>
        </div>
    )
}

export default ViewCategory