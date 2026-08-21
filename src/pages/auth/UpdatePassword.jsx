import React, { useEffect, useState } from 'react'
import useForm from '../../hooks/useForm'
import DefaultInput from '../../component/FormSite/DefaultInput'
import DefaultButton from '../../component/Buttons/DefaultButton'
import API from '../../services/api'
import Toast from '../../component/Toast/Toast'
import { useNavigate } from 'react-router-dom'

const UpdatePassword = () => {
    const [loading, setLoading] = useState(false)
    const [toast, setToast] = useState(null)

    const navigate = useNavigate()

    const token = localStorage.getItem('verified_token')

    useEffect(() => {
        if (!token) {
            navigate('/login', { replace: true })
        }
    }, [token, navigate])

    const { values, handleChange } = useForm({
        password: '',
    })

    const handleUpdatePassword = async (e) => {
        e.preventDefault()
        setLoading(true)

        try {
            const res = await API.post(
                '/auth/update-password',
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
                    localStorage.removeItem('reset_token')
                    localStorage.removeItem('verified_token')
                    navigate('/login')
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
        <div className="relative min-h-screen bg-[url('https://wallpapercave.com/wp/wp15518710.jpg')] bg-cover bg-center">

            <div className="absolute inset-0 bg-black/65" />

            {toast && (
                <div className="fixed top-8 right-8 z-50">
                    <Toast
                        success={toast.success}
                        message={toast.message}
                        onClose={() => setToast(null)}
                    />
                </div>
            )}

            <div className="relative z-10 min-h-screen flex items-center justify-center px-4 py-12">

                <div className="w-full max-w-md">

                    <div className="text-center mb-8">

                        <p className="text-sm font-bold uppercase tracking-[0.3em] text-yellow-400">
                            Account Security
                        </p>

                        <h1 className="mt-3 text-4xl sm:text-5xl font-black text-white">
                            New Password
                        </h1>

                        <p className="mt-3 text-white/60">
                            Create a new password for your account.
                        </p>

                    </div>

                    <div className="bg-[#292929] p-6 sm:p-8 md:p-10">

                        <form
                            onSubmit={handleUpdatePassword}
                            method="post"
                            className="space-y-6"
                        >

                            <div>
                                <DefaultInput
                                    label="Enter New Password"
                                    type="password"
                                    value={values.password}
                                    name="password"
                                    onChange={handleChange}
                                    required
                                    placeholder="Enter your new password"
                                />
                            </div>

                            <div className="pt-2">
                                <DefaultButton
                                    type="submit"
                                    label={
                                        loading
                                            ? 'Updating...'
                                            : 'Update Password'
                                    }
                                />
                            </div>

                        </form>

                        <div className="mt-8 pt-6 border-t border-gray-700 text-center">

                            <p className="text-sm text-gray-400">
                                Remember your password?
                                <a
                                    href="/login"
                                    className="ml-2 font-semibold text-yellow-400 hover:text-yellow-300 transition-colors"
                                >
                                    Sign In
                                </a>
                            </p>

                        </div>

                    </div>

                </div>

            </div>

        </div>
    )
}

export default UpdatePassword