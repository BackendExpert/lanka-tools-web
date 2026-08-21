import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import API from '../../../../services/api'
import Toast from '../../../../component/Toast/Toast'
import DefaultButton from '../../../../component/Buttons/DefaultButton'
import DefaultInput from '../../../../component/Form/DefaultInput'
import TextAreaInput from '../../../../component/Form/TextAreaInput'
import FileInput from '../../../../component/Form/FileInput'
import useForm from '../../../../hooks/useForm'

const CreateCategory = () => {
    const token = localStorage.getItem('access_token')
    const navigate = useNavigate()

    const [loading, setLoading] = useState(false)
    const [toast, setToast] = useState(false)
    const [subCategory, setSubCategory] = useState('')
    const [subCategories, setSubCategories] = useState([])

    const { values, handleChange } = useForm({
        category: '',
        category_desc: '',
        category_image: null,
        sub_category: [],
    })

    const handleSubCategoryAdd = () => {
        const value = subCategory.trim()

        if (!value) {
            return
        }

        if (subCategories.includes(value)) {
            return
        }

        const updatedSubCategories = [...subCategories, value]

        setSubCategories(updatedSubCategories)
        values.sub_category = updatedSubCategories
        setSubCategory('')
    }

    const handleSubCategoryRemove = (index) => {
        const updatedSubCategories = subCategories.filter(
            (_, subIndex) => subIndex !== index
        )

        setSubCategories(updatedSubCategories)
        values.sub_category = updatedSubCategories
    }

    const handleCategoryImageChange = (e) => {
        values.category_image = e.target.files[0]
    }

    const headleCreateCategory = async (e) => {
        e.preventDefault()
        setLoading(true)

        try {
            const formData = new FormData()

            formData.append('category', values.category)
            formData.append('category_desc', values.category_desc)

            if (values.category_image) {
                formData.append('category_img', values.category_image)
            }

            subCategories.forEach((sub) => {
                formData.append('sub_category[]', sub)
            })

            const res = await API.post(
                '/product/create-category',
                formData,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                        "Content-Type": "multipart/form-data",
                    },
                }
            )

            if (res.data.success === true) {
                setToast({
                    success: true,
                    message: res.data.message,
                })

                setTimeout(() => {
                    navigate('/dashboard/categories')
                }, 3000)
            }
        }
        catch (err) {
            setToast({
                success: false,
                message: err.response?.data?.message || 'Something went wrong',
            })
        }
        finally {
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

            <div className="w-full">

                <form
                    onSubmit={headleCreateCategory}
                    className="w-full bg-white border border-gray-200 p-6"
                >

                    <DefaultInput
                        label="Category"
                        name="category"
                        value={values.category}
                        onChange={handleChange}
                        placeholder="Enter category name"
                        required
                    />

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
                        name="category_image"
                        onChange={handleCategoryImageChange}
                        required
                    />

                    <DefaultInput
                        label="Sub Category"
                        name="sub_category_input"
                        value={subCategory}
                        onChange={(e) => setSubCategory(e.target.value)}
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

                    {subCategories.length > 0 && (
                        <div className="mb-6">

                            <p className="text-xs font-semibold mb-3">
                                Added Sub Categories
                            </p>

                            <div className="space-y-2">

                                {subCategories.map((sub, index) => (
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
                                                handleSubCategoryRemove(index)
                                            }
                                        />

                                    </div>
                                ))}

                            </div>

                        </div>
                    )}

                    <div className="flex justify-end pt-3">

                        <DefaultButton
                            type="submit"
                            label={loading ? "Creating..." : "Create Category"}
                            disabled={loading}
                        />

                    </div>

                </form>

            </div>

        </div>
    )
}

export default CreateCategory