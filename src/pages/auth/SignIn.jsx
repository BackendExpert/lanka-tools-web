import React, { useState } from 'react'
import DefaultButton from '../../component/Buttons/DefaultButton'
import DefaultInput from '../../component/FormSite/DefaultInput'
import useForm from '../../hooks/useForm'
import API from '../../services/api'
import Toast from '../../component/Toast/Toast'
import { useAuth } from '../../context/AuthContext'
import { useNavigate } from 'react-router-dom'

const SignIn = () => {
    const [loading, setLoading] = useState(false)
    const [toast, setToast] = useState(null)

    const { login } = useAuth()
    const navigate = useNavigate()

    const { values, handleChange } = useForm({
        email: '',
        password: '',
    })

    const handleLogin = async (e) => {
        e.preventDefault()
        setLoading(true)

        try {
            const res = await API.post('/auth/login', values)

            if (res.data.success === true) {
                login(
                    res.data.access_token,
                    res.data.refresh_token
                )

                setToast({
                    success: true,
                    message: res.data.message,
                })

                setTimeout(() => {
                    navigate('/dashboard')
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
        <div className="relative min-h-screen bg-[url('https://wallpapercave.com/wp/wp15518710.jpg')] bg-cover bg-center">

            <div className="absolute inset-0 bg-black/65" />

            {toast && (
                <div className="fixed top-20 right-8 z-50">
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
                            Welcome Back
                        </p>

                        <h1 className="mt-3 text-4xl sm:text-5xl font-black text-white">
                            Sign In
                        </h1>

                        <p className="mt-3 text-white/60">
                            Sign in to continue managing your rentals.
                        </p>
                    </div>

                    <div className="bg-[#292929] p-6 sm:p-8 md:p-10">

                        <form
                            onSubmit={handleLogin}
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

                            <div>
                                <DefaultInput
                                    label="Enter Password"
                                    type="password"
                                    value={values.password}
                                    name="password"
                                    onChange={handleChange}
                                    required
                                    placeholder="**************"
                                />
                            </div>

                            <div className="pt-2">
                                <DefaultButton
                                    type="submit"
                                    label={loading ? 'Signing In...' : 'Sign In'}
                                />
                            </div>

                        </form>

                        <div className="mt-4 text-right">
                            <a
                                href="/forget-password"
                                className="text-sm text-yellow-500 font-semibold transition-all duration-500 hover:underline"
                            >
                                Forgot Password?
                            </a>
                        </div>

                        <div className="mt-8 pt-6 border-t border-gray-700 text-center">
                            <p className="text-sm text-gray-400">
                                Don't have an account?
                                <a
                                    href="/registation"
                                    className="ml-2 font-semibold text-yellow-400 hover:text-yellow-300 transition-colors"
                                >
                                    Create Account
                                </a>
                            </p>
                        </div>

                    </div>

                </div>

            </div>

        </div>
    )
}

export default SignIn