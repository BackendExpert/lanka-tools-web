import React, { useEffect, useState } from 'react'
import API from '../../../../services/api'
import useForm from '../../../../hooks/useForm'
import FileInput from '../../../../component/Form/FileInput'
import DefaultButton from '../../../../component/Buttons/DefaultButton'
import Toast from '../../../../component/Toast/Toast'

const AddNewDocs = () => {
    const [loading, setLoading] = useState(false)
    const [toast, setToast] = useState(false)
    const token = localStorage.getItem('access_token')

    const { values, handleChange, setValues } = useForm({
        system_file: null
    });

    const headleAddNewDocs = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {
            const formData = new FormData();
            formData.append("system_file", values.system_file);

            const res = await API.post(
                "/admin/upload-system-files",
                formData,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                        "Content-Type": "multipart/form-data",
                    },
                }
            );

            if (res.data.success === true) {
                setToast({
                    success: true,
                    message: res.data.message,
                });
                setTimeout(() => window.location.reload(), 3000);
            }
        }
        catch (err) {
            console.log(err)
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
        <div className="px-4">
            {toast && (
                <div className="fixed top-8 right-8 z-50">
                    <Toast
                        success={toast.success}
                        message={toast.message}
                        onClose={() => setToast(null)}
                    />
                </div>
            )}
            <div className="max-w-7xl mx-auto bg-white p-4 rounded shadow">
                <div className="">
                    <div className="mb-8">
                        <h1 className="text-2xl font-bold text-slate-900">
                            Upload Knowledge Base Documents
                        </h1>

                        <p className="mt-2 text-sm text-slate-600 leading-7">
                            Upload PDF documents that will be used as the knowledge source for the
                            AI ChatBot. Every uploaded document is processed, indexed, and stored in
                            the vector database so the assistant can retrieve relevant information
                            and generate accurate responses based only on the uploaded content.
                        </p>

                        <p className="mt-4 text-sm text-slate-600 leading-7">
                            Only PDF documents are supported. For the best results, upload
                            well-structured documents such as user manuals, company policies,
                            research papers, technical documentation, product guides, employee
                            handbooks, academic materials, or any other knowledge resources that you
                            want the AI assistant to understand and answer questions from.
                        </p>

                        <div className="mt-5 rounded-lg border border-amber-200 bg-amber-50 p-4">
                            <h2 className="font-semibold text-amber-800">
                                Before uploading
                            </h2>

                            <ul className="mt-2 list-disc pl-5 text-sm text-amber-700 space-y-1">
                                <li>Only PDF (.pdf) files are accepted.</li>
                                <li>Upload clear, readable documents with selectable text.</li>
                                <li>Avoid password-protected or scanned PDFs whenever possible.</li>
                                <li>Each uploaded document will become searchable by the AI assistant.</li>
                                <li>Duplicate uploads may create duplicate knowledge entries.</li>
                            </ul>
                        </div>
                    </div>
                    <form onSubmit={headleAddNewDocs} method="post">
                        <div className="">
                            <FileInput
                                label="Select System Document (PDF)"
                                name="system_file"
                                accept=".pdf,application/pdf"
                                required={true}
                                onChange={(e) =>
                                    handleChange({
                                        target: {
                                            name: "system_file",
                                            value: e.target.files[0],
                                        },
                                    })
                                }
                            />
                        </div>

                        <div className="">
                            <DefaultButton
                                type='submit'
                                label={loading ? 'Uploading Docs...' : 'Upload System Docs'}
                            />
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default AddNewDocs