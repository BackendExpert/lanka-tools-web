import React, { useState } from 'react'
import DefaultButton from '../../component/Buttons/DefaultButton'
import DefaultInput from '../../component/FormSite/DefaultInput'
import useForm from '../../hooks/useForm'
import API from '../../services/api'
import Toast from '../../component/Toast/Toast'
import { useNavigate } from 'react-router-dom'

const Registation = () => {
    const [loading, setLoading] = useState(false)
    const [toast, setToast] = useState(null)
    const navigate = useNavigate()

    const { values, handleChange } = useForm({
        first_name: '',
        last_name: '',
        email: '',
        password: '',
    })

    const handleCreateAccount = async (e) => {
        e.preventDefault()
        setLoading(true)

        try {
            const payload = {
                first_name: values.first_name,
                last_name: values.last_name,
                email: values.email,
                password: values.password,
            }

            const res = await API.post('/auth/register', payload)

            if (res.data.success === true) {
                setToast({
                    success: true,
                    message: res.data.message,
                })

                localStorage.setItem('code_token', res.data.codetoken)

                setTimeout(() => {
                    navigate('/download-codes')
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
                            Get Started
                        </p>

                        <h1 className="mt-3 text-4xl sm:text-5xl font-black text-white">
                            Create Account
                        </h1>

                        <p className="mt-3 text-white/60">
                            Create your account and start managing your rentals.
                        </p>
                    </div>

                    <div className="bg-[#292929] p-6 sm:p-8 md:p-10">

                        <form
                            onSubmit={handleCreateAccount}
                            method="post"
                            className="space-y-6"
                        >

                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">

                                <DefaultInput
                                    label="First Name"
                                    type="text"
                                    name="first_name"
                                    value={values.first_name}
                                    onChange={handleChange}
                                    required
                                    placeholder="John"
                                />

                                <DefaultInput
                                    label="Last Name"
                                    type="text"
                                    name="last_name"
                                    value={values.last_name}
                                    onChange={handleChange}
                                    required
                                    placeholder="Doe"
                                />

                            </div>

                            <div>
                                <DefaultInput
                                    label="Email Address"
                                    type="email"
                                    name="email"
                                    value={values.email}
                                    onChange={handleChange}
                                    required
                                    placeholder="username@example.com"
                                />
                            </div>

                            <div>
                                <DefaultInput
                                    label="Password"
                                    type="password"
                                    name="password"
                                    value={values.password}
                                    onChange={handleChange}
                                    required
                                    placeholder="**************"
                                />
                            </div>

                            <div className="pt-2">
                                <DefaultButton
                                    type="submit"
                                    label={loading ? 'Creating Account...' : 'Create Account'}
                                />
                            </div>

                        </form>

                        <div className="mt-8 pt-6 border-t border-gray-700 text-center">
                            <p className="text-sm text-gray-400">
                                Already have an account?
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

export default Registation