import React, { useEffect, useState } from 'react'
import useForm from '../../hooks/useForm'
import API from '../../services/api'
import DefaultInput from '../../component/FormSite/DefaultInput'
import DefaultButton from '../../component/Buttons/DefaultButton'
import Toast from '../../component/Toast/Toast'
import { useNavigate } from 'react-router-dom'

const VerifyPassRestOPT = () => {
    const [loading, setLoading] = useState(false)
    const [toast, setToast] = useState(null)

    const navigate = useNavigate()

    const token = localStorage.getItem('reset_token')

    useEffect(() => {
        if (!token) {
            navigate('/login', { replace: true })
        }
    }, [token, navigate])

    const { values, handleChange } = useForm({
        otp: '',
    })

    const handleVerifyOTP = async (e) => {
        e.preventDefault()
        setLoading(true)

        try {
            const res = await API.post(
                '/auth/verify-otp',
                values,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            )

            if (res.data.success === true) {
                localStorage.setItem(
                    'verified_token',
                    res.data.token
                )

                setToast({
                    success: true,
                    message: res.data.message,
                })

                setTimeout(() => {
                    navigate('/update-password')
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
                            Verify OTP
                        </h1>

                        <p className="mt-3 text-white/60">
                            Enter the verification code sent to your email address.
                        </p>

                    </div>

                    <div className="bg-[#292929] p-6 sm:p-8 md:p-10">

                        <form
                            onSubmit={handleVerifyOTP}
                            method="post"
                            className="space-y-6"
                        >

                            <div>
                                <DefaultInput
                                    label="Enter Verification OTP"
                                    type="text"
                                    value={values.otp}
                                    name="otp"
                                    required
                                    placeholder="Enter 6-digit OTP"
                                    onChange={handleChange}
                                />
                            </div>

                            <div className="pt-2">
                                <DefaultButton
                                    type="submit"
                                    label={
                                        loading
                                            ? 'Verifying...'
                                            : 'Verify OTP'
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
                                    Back to Login
                                </a>
                            </p>

                        </div>

                    </div>

                </div>

            </div>

        </div>
    )
}

export default VerifyPassRestOPT