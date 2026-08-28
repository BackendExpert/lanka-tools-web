import React, { useEffect, useRef, useState } from 'react'
import { FaArrowUp, FaRobot, FaUser } from 'react-icons/fa6'
import useForm from '../../../hooks/useForm'
import API from '../../../services/api'
import Toast from '../../../component/Toast/Toast'

const UseAI = () => {
    const token = localStorage.getItem('access_token')
    const [loading, setLoading] = useState(false)
    const [toast, setToast] = useState(null)
    const [messages, setMessages] = useState([])
    const messagesEndRef = useRef(null)

    const { values, handleChange } = useForm({
        question: '',
    })

    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
    }, [messages, loading])

    useEffect(() => {
        if (!toast) return

        const timer = setTimeout(() => {
            setToast(null)
        }, 4000)

        return () => clearTimeout(timer)
    }, [toast])

    const headleUseAI = async (e) => {
        e.preventDefault()

        const question = values.question?.trim()

        if (!question || loading) return

        setMessages((prev) => [
            ...prev,
            {
                id: Date.now(),
                role: 'user',
                content: question,
            },
        ])

        handleChange({
            target: {
                name: 'question',
                value: '',
            },
        })

        setLoading(true)

        try {
            const res = await API.post(
                '/chat/genarate-ai',
                { question },
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            )

            if (res.data?.answer) {
                setMessages((prev) => [
                    ...prev,
                    {
                        id: Date.now() + 1,
                        role: 'assistant',
                        content: res.data.answer,
                    },
                ])
            } else {
                setToast({
                    success: false,
                    message: res.data?.message || 'Unable to generate an answer',
                })
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

    const handleKeyDown = (e) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault()
            headleUseAI(e)
        }
    }

    const suggestions = [
        'What tool is best for drilling concrete?',
        'How should a power tool be maintained?',
        'What safety equipment is needed?',
    ]

    const selectSuggestion = (question) => {
        handleChange({
            target: {
                name: 'question',
                value: question,
            },
        })
    }

    return (
        <div className="flex h-[calc(100vh-64px)] min-h-[500px] w-full flex-col bg-white">
            {toast && (
                <div className="fixed top-20 right-8 z-50">
                    <Toast
                        success={toast.success}
                        message={toast.message}
                        onClose={() => setToast(null)}
                    />
                </div>
            )}

            <div className="border-b border-gray-200 bg-white px-4 py-4 sm:px-6">
                <div className="flex items-center gap-3">
                    <div className="flex h-11 w-11 shrink-0 items-center justify-center bg-yellow-400 text-gray-900">
                        <FaRobot className="text-xl" />
                    </div>

                    <div className="min-w-0">
                        <h1 className="text-lg font-bold text-gray-900 sm:text-xl">
                            AI Assistant
                        </h1>

                        <p className="text-xs text-gray-500 sm:text-sm">
                            Ask anything about construction tools and equipment rental
                        </p>
                    </div>
                </div>
            </div>

            <div className="relative flex-1 overflow-y-auto bg-gray-50 px-3 py-5 sm:px-6 sm:py-6">
                {messages.length === 0 ? (
                    <div className="flex min-h-full items-center justify-center">
                        <div className="w-full max-w-2xl px-2 text-center">
                            <div className="mx-auto mb-5 flex h-16 w-16 items-center justify-center bg-yellow-400 text-gray-900">
                                <FaRobot className="text-3xl" />
                            </div>

                            <h2 className="text-xl font-bold text-gray-900 sm:text-2xl">
                                How can I help you?
                            </h2>

                            <p className="mx-auto mt-2 max-w-lg text-sm leading-6 text-gray-500">
                                Ask questions about construction tools, equipment, rentals, usage, maintenance, safety, and other construction-related topics.
                            </p>

                            <div className="mt-6 grid grid-cols-1 gap-2 sm:grid-cols-2">
                                {suggestions.map((item) => (
                                    <button
                                        key={item}
                                        type="button"
                                        onClick={() => selectSuggestion(item)}
                                        className="border border-gray-200 bg-white p-3 text-left text-xs text-gray-600 transition hover:border-yellow-400 hover:bg-yellow-50 sm:text-sm"
                                    >
                                        {item}
                                    </button>
                                ))}
                            </div>
                        </div>
                    </div>
                ) : (
                    <div className="mx-auto w-full max-w-4xl space-y-5">
                        {messages.map((message) => (
                            <div
                                key={message.id}
                                className={`flex w-full ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
                            >
                                <div
                                    className={`flex max-w-[92%] gap-2 sm:max-w-[80%] ${message.role === 'user' ? 'flex-row-reverse' : 'flex-row'}`}
                                >
                                    <div
                                        className={`flex h-8 w-8 shrink-0 items-center justify-center ${message.role === 'user' ? 'bg-gray-900 text-white' : 'bg-yellow-400 text-gray-900'}`}
                                    >
                                        {message.role === 'user' ? (
                                            <FaUser className="text-xs" />
                                        ) : (
                                            <FaRobot className="text-sm" />
                                        )}
                                    </div>

                                    <div
                                        className={`border px-4 py-3 ${message.role === 'user' ? 'border-gray-900 bg-gray-900 text-white' : 'border-gray-200 bg-white text-gray-800'}`}
                                    >
                                        <p className="whitespace-pre-wrap break-words text-sm leading-6">
                                            {message.content}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        ))}

                        {loading && (
                            <div className="flex justify-start">
                                <div className="flex gap-2">
                                    <div className="flex h-8 w-8 shrink-0 items-center justify-center bg-yellow-400 text-gray-900">
                                        <FaRobot className="text-sm" />
                                    </div>

                                    <div className="border border-gray-200 bg-white px-4 py-3">
                                        <div className="flex items-center gap-1.5">
                                            <span className="h-2 w-2 animate-bounce rounded-full bg-gray-400" />
                                            <span className="h-2 w-2 animate-bounce rounded-full bg-gray-400 [animation-delay:150ms]" />
                                            <span className="h-2 w-2 animate-bounce rounded-full bg-gray-400 [animation-delay:300ms]" />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}

                        <div ref={messagesEndRef} />
                    </div>
                )}
            </div>

            <div className="border-t border-gray-200 bg-white px-3 py-3 sm:px-6 sm:py-4">
                <form onSubmit={headleUseAI} className="mx-auto w-full max-w-4xl">
                    <div className="flex items-end border border-gray-300 bg-white transition focus-within:border-yellow-400">
                        <textarea
                            name="question"
                            value={values.question}
                            onChange={handleChange}
                            onKeyDown={handleKeyDown}
                            disabled={loading}
                            rows={1}
                            placeholder="Ask about construction tools or equipment..."
                            className="max-h-32 min-h-[48px] flex-1 resize-none bg-transparent px-4 py-3 text-sm text-gray-900 outline-none placeholder:text-gray-400 disabled:cursor-not-allowed disabled:bg-gray-50"
                        />

                        <button
                            type="submit"
                            disabled={loading || !values.question?.trim()}
                            className="m-1 flex h-10 w-10 shrink-0 items-center justify-center bg-yellow-400 text-gray-900 transition hover:bg-yellow-300 disabled:cursor-not-allowed disabled:opacity-40"
                        >
                            <FaArrowUp className="text-sm" />
                        </button>
                    </div>

                    <p className="mt-2 text-center text-[10px] text-gray-400 sm:text-xs">
                        AI responses may not always be accurate. Verify important rental and safety information.
                    </p>
                </form>
            </div>
        </div>
    )
}

export default UseAI