import React, { useEffect, useState } from 'react'
import API from '../../services/api'
import TextAreaInput from '../../component/Form/TextAreaInput'
import DefaultButton from '../../component/Buttons/DefaultButton'

const ProductComments = ({ ProductID }) => {
    const token = localStorage.getItem('access_token')
    const [comments, setComments] = useState([])
    const [comment, setComment] = useState('')
    const [loading, setLoading] = useState(false)
    const [fetching, setFetching] = useState(true)
    const [error, setError] = useState('')

    const fetchComments = async () => {
        if (!ProductID) return

        try {
            const res = await API.get(`/product/fetch-commets/${ProductID}`)
            if (res.data.success === true) {
                setComments(res.data.result || [])
            }
        } catch (error) {
            console.error(error)
            setComments([])
        } finally {
            setFetching(false)
        }
    }

    useEffect(() => {
        fetchComments()
    }, [ProductID])

    const handleSubmit = async (e) => {
        e.preventDefault()

        if (!token) {
            setError('Please login to add a comment.')
            return
        }

        if (!comment.trim()) {
            setError('Please enter a comment.')
            return
        }

        setLoading(true)
        setError('')

        try {
            const res = await API.post(
                `/product/create-comment/${ProductID}`,
                { comment: comment.trim() },
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            )

            if (res.data.success === true) {
                setComment('')
                await fetchComments()
            } else {
                setError(res.data.message || 'Failed to create comment.')
            }
        } catch (error) {
            setError(
                error.response?.data?.message ||
                'Failed to create comment.'
            )
        } finally {
            setLoading(false)
        }
    }

    const formatDate = (date) => {
        if (!date) return ''
        return new Date(date).toLocaleDateString('en-GB', {
            day: '2-digit',
            month: 'short',
            year: 'numeric'
        })
    }

    return (
        <div className="mt-10 w-full">
            <div className="mb-6">
                <p className="text-xs font-bold uppercase tracking-[0.2em] text-yellow-600">
                    Community
                </p>
                <h2 className="mt-2 text-2xl font-black tracking-tight text-slate-950">
                    Comments
                </h2>
                <p className="mt-2 text-sm text-slate-500">
                    See what other customers are saying about this product.
                </p>
            </div>

            {token ? (
                <form
                    onSubmit={handleSubmit}
                    className="mb-8 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6"
                >
                    <TextAreaInput
                        label="Add a comment"
                        name="comment"
                        rows={4}
                        value={comment}
                        onChange={(e) => setComment(e.target.value)}
                        placeholder="Write your comment..."
                        required
                    />

                    {error && (
                        <p className="mb-4 text-xs font-semibold text-red-500">
                            {error}
                        </p>
                    )}

                    <DefaultButton
                        type="submit"
                        label={loading ? 'Posting...' : 'Post Comment'}
                        disabled={loading}
                    />
                </form>
            ) : (
                <div className="mb-8 rounded-2xl border border-slate-200 bg-slate-50 p-5 sm:p-6">
                    <p className="text-sm font-bold text-slate-900">
                        Want to leave a comment?
                    </p>
                    <p className="mt-1 text-sm text-slate-500">
                        Please login to create a comment.
                    </p>
                    <a
                        href="/login"
                        className="mt-4 inline-flex bg-yellow-400 px-7 py-3 font-bold text-black transition duration-300 hover:bg-yellow-300"
                    >
                        Login
                    </a>
                </div>
            )}

            <div className="rounded-2xl border border-slate-200 bg-white shadow-sm">
                {fetching ? (
                    <div className="flex justify-center p-10">
                        <div className="h-8 w-8 animate-spin rounded-full border-4 border-slate-200 border-t-yellow-500" />
                    </div>
                ) : comments.length > 0 ? (
                    <div className="divide-y divide-slate-100">
                        {comments.map((item) => (
                            <div key={item._id} className="p-5 sm:p-6">
                                <div className="flex items-start gap-3">
                                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-yellow-100 text-sm font-black text-yellow-700">
                                        {(item.user?.email || 'U').charAt(0).toUpperCase()}
                                    </div>

                                    <div className="min-w-0 flex-1">
                                        <div className="flex flex-col gap-1 sm:flex-row sm:items-center sm:justify-between">
                                            <p className="text-sm font-black text-slate-900">
                                                {item.user?.username || item.user?.email || 'User'}
                                            </p>

                                            <p className="text-xs text-slate-400">
                                                {formatDate(item.createdAt)}
                                            </p>
                                        </div>

                                        <p className="mt-2 whitespace-pre-wrap text-sm leading-6 text-slate-600">
                                            {item.comment}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                ) : (
                    <div className="px-5 py-12 text-center">
                        <p className="text-base font-black text-slate-900">
                            No Comments Yet
                        </p>
                        <p className="mt-1 text-sm text-slate-500">
                            Be the first person to comment on this product.
                        </p>
                    </div>
                )}
            </div>
        </div>
    )
}

export default ProductComments