import React, { useState } from 'react'
import useForm from '../../../../hooks/useForm'
import Toast from '../../../../component/Toast/Toast'
import API from '../../../../services/api'
import DefaultInput from '../../../../component/Form/DefaultInput'
import DefaultButton from '../../../../component/Buttons/DefaultButton'
import Dropdown from '../../../../component/Form/Dropdown'

const CreateUser = () => {
    const token = localStorage.getItem("access_token")
    const [loading, setLoading] = useState(false)
    const [toast, setToast] = useState(false)

    const { values, handleChange } = useForm({
        email: '',
        role: ''
    });

    const headleCreatePlatfromUser = async (e) => {
        e.preventDefault();
        setLoading(true)

        try {
            const res = await API.post('/admin/create-platfrom-user', values, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            })

            if (res.data.success === true) {
                setToast({
                    success: true,
                    message: res.data.message,
                });
                setTimeout(() => navigate("/dashboard/platfrom-users"), 3000);
            }
        }
        catch (err) {
            setToast({
                success: false,
                message: err.response?.data?.message || "Something went wrong",
            });
        }
        finally {
            setLoading(false)
        }
    }

    return (
        <div className="w-full max-w-7xl mx-auto">

            {toast && (
                <div className="fixed top-8 right-8 z-50">
                    <Toast
                        success={toast.success}
                        message={toast.message}
                        onClose={() => setToast(null)}
                    />
                </div>
            )}

            <div className="bg-white border border-gray-200 p-6 md:p-8">

                <div className="mb-8">
                    <h2 className="text-3xl font-bold text-gray-800">
                        Create Platform User
                    </h2>

                    <p className="text-gray-500 mt-2">
                        Invite a new platform administrator by entering their email address and selecting the appropriate role.
                    </p>
                </div>

                <form onSubmit={headleCreatePlatfromUser} method="post">

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

                        <div>
                            <DefaultInput
                                label={"Enter Platfrom User Email"}
                                value={values.email}
                                name={'email'}
                                required
                                onChange={handleChange}
                                placeholder={'username@example.com'}
                            />
                        </div>

                        <div>
                            <Dropdown
                                label="Platform Role"
                                name="role"
                                required
                                onChange={handleChange}
                                options={[
                                    {
                                        label: "Staff",
                                        value: "staff"
                                    },              
                                ]}
                            />
                        </div>

                    </div>

                    <div className="mt-8 flex justify-end">
                        <div className="w-full md:w-auto">
                            <DefaultButton
                                type="submit"
                                label={loading ? "Creating Platform User..." : "Create Platform User"}
                            />
                        </div>
                    </div>

                </form>

            </div>

        </div>
    )
}

export default CreateUser