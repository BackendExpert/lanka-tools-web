import React, { useState } from 'react'
import API from '../../../../services/api'
import useForm from '../../../../hooks/useForm'
import Toast from '../../../../component/Toast/Toast'
import DefaultButton from '../../../../component/Buttons/DefaultButton'
import DefaultInput from '../../../../component/Form/DefaultInput'

const CreateBranch = () => {
    const token = localStorage.getItem('access_token')
    const [loading, setLoading] = useState(false)
    const [toast, setToast] = useState(false)

    const { values, handleChange } = useForm({
        admin_email: "",
        admin_first_name: "",
        admin_last_name: "",
        branch_name: "",
        branch_address: "",
        branch_google_location: "",
    })

    const handleCreateBranch = async (e) => {
        e.preventDefault()
        setLoading(true)

        try {
            const res = await API.post(
                '/admin/create-branch',
                values,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
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
                message: err.response?.data?.message || 'Something went wrong',
            })
        } finally {
            setLoading(false)
        }
    }

    return (
        <div className="w-full min-h-screen px-4 sm:px-6 lg:px-4">

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
                <div className="mb-6">
                    <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">
                        Create Branch
                    </h1>
                    <p className="mt-1 text-sm text-gray-500">
                        Create a new rental branch and assign its administrator.
                    </p>
                </div>

                <form
                    onSubmit={handleCreateBranch}
                    className="w-full bg-white border border-gray-200 p-4 sm:p-6 lg:p-8"
                >
                    <div className="mb-8">
                        <h2 className="text-lg font-semibold text-gray-900">
                            Branch Information
                        </h2>
                        <p className="mt-1 text-sm text-gray-500">
                            Enter the basic information for the new branch.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                        <DefaultInput
                            label="Branch Name"
                            name="branch_name"
                            value={values.branch_name}
                            onChange={handleChange}
                            placeholder="Enter branch name"
                            required
                        />

                        <DefaultInput
                            label="Branch Address"
                            name="branch_address"
                            value={values.branch_address}
                            onChange={handleChange}
                            placeholder="Enter branch address"
                            required
                        />

                        <div className="sm:col-span-2">
                            <DefaultInput
                                label="Google Location"
                                name="branch_google_location"
                                value={values.branch_google_location}
                                onChange={handleChange}
                                placeholder="Enter Google Maps location"
                            />
                        </div>
                    </div>

                    <div className="my-8 border-t border-gray-200" />

                    <div className="mb-6">
                        <h2 className="text-lg font-semibold text-gray-900">
                            Branch Administrator
                        </h2>
                        <p className="mt-1 text-sm text-gray-500">
                            Enter the administrator details for this branch.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                        <DefaultInput
                            label="First Name"
                            name="admin_first_name"
                            value={values.admin_first_name}
                            onChange={handleChange}
                            placeholder="Enter first name"
                            required
                        />

                        <DefaultInput
                            label="Last Name"
                            name="admin_last_name"
                            value={values.admin_last_name}
                            onChange={handleChange}
                            placeholder="Enter last name"
                            required
                        />

                        <div className="sm:col-span-2">
                            <DefaultInput
                                label="Email Address"
                                type="email"
                                name="admin_email"
                                value={values.admin_email}
                                onChange={handleChange}
                                placeholder="Enter administrator email"
                                required
                            />
                        </div>
                    </div>

                    <div className="mt-8 flex justify-end">
                        <DefaultButton
                            type="submit"
                            disabled={loading}
                            label={loading ? 'Creating...' : 'Create Branch'}
                        />
                    </div>
                </form>
            </div>
        </div>
    )
}

export default CreateBranch