import React, { useState } from 'react'
import DefaultButton from '../../component/Buttons/DefaultButton'
import DefaultInput from '../../component/FormSite/DefaultInput'
import useForm from '../../hooks/useForm'
import API from '../../services/api'
import Toast from '../../component/Toast/Toast'
import { useNavigate } from 'react-router-dom'

const ForgetPassword = () => {
    const [loading, setLoading] = useState(false)
    const [toast, setToast] = useState(null)

    const navigate = useNavigate()

    const { values, handleChange } = useForm({
        email: '',
    })

    const handleForgetPassword = async (e) => {
        e.preventDefault()
        setLoading(true)

        try {
            const res = await API.post(
                '/auth/request-password-reset',
                values
            )

            if (res.data.success === true) {
                setToast({
                    success: true,
                    message: res.data.message,
                })

                localStorage.setItem(
                    'reset_token',
                    res.data.token
                )

                setTimeout(() => {
                    navigate('/verify-otp')
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
                            Account Recovery
                        </p>

                        <h1 className="mt-3 text-4xl sm:text-5xl font-black text-white">
                            Forgot Password?
                        </h1>

                        <p className="mt-3 text-white/60">
                            Enter your email address and we'll send you a
                            verification code to reset your password.
                        </p>

                    </div>

                    <div className="bg-[#292929] p-6 sm:p-8 md:p-10">

                        <form
                            onSubmit={handleForgetPassword}
                            method="post"
                            className="space-y-6"
                        >

                            <div>
                                <DefaultInput
                                    label="Enter Email Address"
                                    type="email"
                                    value={values.email}
                                    name="email"
                                    onChange={handleChange}
                                    required
                                    placeholder="username@example.com"
                                />
                            </div>

                            <div className="pt-2">
                                <DefaultButton
                                    type="submit"
                                    label={
                                        loading
                                            ? 'Sending...'
                                            : 'Send Reset OTP'
                                    }
                                />
                            </div>

                        </form>

                        <div className="mt-8 pt-6 border-t border-gray-700">

                            <div className="text-center">
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

                            <div className="mt-4 text-center">
                                <p className="text-sm text-gray-400">
                                    Have backup codes?
                                    <a
                                        href="/verify-backupcodes"
                                        className="ml-2 font-semibold text-yellow-400 hover:text-yellow-300 transition-colors"
                                    >
                                        Verify Backup Code
                                    </a>
                                </p>
                            </div>

                        </div>

                    </div>

                </div>

            </div>

        </div>
    )
}

export default ForgetPassword