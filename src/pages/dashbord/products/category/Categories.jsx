import React, { useEffect, useState } from 'react'
import API from '../../../../services/api'
import { FaUser } from 'react-icons/fa'
import DefaultButton from '../../../../component/Buttons/DefaultButton'
import Toast from '../../../../component/Toast/Toast'
import { FaTag } from 'react-icons/fa6'

const Categories = () => {
    const token = localStorage.getItem('access_token')
    const [categories, setCategoris] = useState([])
    const [loading, setLoading] = useState(false)
    const [toast, setToast] = useState(false)

    useEffect(() => {
        const fetchcategories = async () => {
            try {
                const res = await API.get('/product/fetch-categories', {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                })

                if (res.data.success === true) {
                    setCategoris(res.data.result)
                }
            } catch (error) {
                console.error(error)
            }
        }

        if (token) {
            fetchcategories()
        }
    }, [token])


    const headleUpdateStatus = async (e, id) => {
        e.preventDefault()
        setLoading(true)

        try {
            const res = await API.patch(`/product/update-category-status/${id}`, {}, {
                headers: {
                    Authorization: `Bearer ${token}`,
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
            <div className="grid lg:grid-cols-4 md:grid-cols-2 gap-4">
                {categories.map((data, index) => {
                    return (
                        <div
                            className="bg-white p-4 rounded shadow"
                            key={index}
                        >
                            <div className="flex items-center">
                                <div>
                                    {data.category_img ? (
                                        <img
                                            src={`${import.meta.env.VITE_APP_API_FILES}/uploads/category/${data.category_img}`}
                                            alt={data.category || 'Category'}
                                            className="w-16 h-16 object-cover rounded-full"
                                        />
                                    ) : (
                                        <div className="w-16 h-16 flex items-center justify-center">
                                            <FaTag className="text-4xl text-gray-400" />
                                        </div>
                                    )}
                                </div>

                                <div className="ml-4">
                                    <h1 className="font-semibold">
                                        {data.category}
                                    </h1>

                                    <p className="text-sm text-gray-500">
                                        Sub Categories {data.sub_category?.length || 0}
                                    </p>


                                    {data.category_stats === true ? (
                                        <div>
                                            <p className="text-green-600 font-semibold">
                                                Active
                                            </p>
                                        </div>
                                    ) : (
                                        <div>
                                            <p className="text-red-600 font-semibold">
                                                Deactive
                                            </p>
                                        </div>
                                    )}
                                </div>
                            </div>

                            <div className="flex justify-between items-center mt-8">
                                <div>
                                    <a href={`category/view/${data._id}`}>
                                        <DefaultButton
                                            type="button"
                                            label="View Category"
                                        />
                                    </a>
                                </div>

                                <div>
                                    <div>
                                        <button
                                            type="button"
                                            onClick={(e) => headleUpdateStatus(e, data._id)}
                                            className="px-3 py-2 text-sm font-semibold border border-gray-300 rounded hover:bg-gray-100"
                                        >
                                            {data.category_stats === true ? 'Disable' : 'Enable'}
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )
                })}
            </div>
        </div>
    )
}

export default Categories