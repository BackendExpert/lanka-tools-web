import React, { useEffect, useState } from 'react'
import Toast from '../../../../component/Toast/Toast'
import useForm from '../../../../hooks/useForm'
import API from '../../../../services/api'

const ChatBotManage = () => {
    const [systemfiles, setSystemFiles] = useState([])
    const [selectedFile, setSelectedFile] = useState("all")
    const token = localStorage.getItem('access_token')

    useEffect(() => {
        const fetchsystemfiles = async (e) => {
            const res = await API.get('/admin/fetch-system-files',
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            )
            if (res.data.success === true) {
                setSystemFiles(res.data.result)
            }
        }

        if (token) fetchsystemfiles()
    }, [token])

    const files = [
        ...new Map(
            systemfiles.map(item => [
                item.fileId?._id,
                item.fileId
            ])
        ).values()
    ];

    const filteredFiles =
        selectedFile === "all"
            ? systemfiles
            : systemfiles.filter(
                item => item.fileId?._id === selectedFile
            );

    return (
        <div>
            <div className="bg-white border border-slate-200 rounded-2xl p-6">

                <div className="md:flex items-center justify-between mb-6">
                    <h2 className="text-xl md:mb-0 mb-4 font-semibold text-slate-800">
                        System Chunks
                    </h2>

                    <select
                        value={selectedFile}
                        onChange={(e) => setSelectedFile(e.target.value)}
                        className="px-4 py-2 border border-slate-300 rounded-xl outline-none focus:border-indigo-500"
                    >
                        <option value="all">
                            All Files
                        </option>

                        {files.map((file) => (
                            <option
                                key={file._id}
                                value={file._id}
                            >
                                {file.filename}
                            </option>
                        ))}
                    </select>
                </div>
                <div className="grid gap-5">
                    {
                        systemfiles.map((data, index) => {
                            return (
                                <div
                                    key={index}
                                    className="border border-slate-200 rounded-2xl overflow-hidden"
                                >
                                    <div className="flex items-center justify-between bg-slate-50 border-b border-slate-200 px-5 py-3">
                                        <div>
                                            <p className="text-xs uppercase tracking-wider text-slate-500">
                                                Chunk
                                            </p>
                                            <h2 className="font-semibold text-slate-800">
                                                #{data.chunkIndex}
                                            </h2>
                                        </div>

                                        <div className="text-right">
                                            <p className="text-xs uppercase tracking-wider text-slate-500">
                                                File
                                            </p>
                                            <h2 className="font-medium text-slate-700 max-w-xs truncate">
                                                {data?.fileId?.filename}
                                            </h2>
                                        </div>
                                    </div>

                                    <div className="p-5">
                                        <div className="bg-slate-50 border border-slate-200 rounded-xl p-4 max-h-64 overflow-y-auto">
                                            <p className="text-sm leading-7 text-slate-700 whitespace-pre-wrap break-words">
                                                {data.text}
                                            </p>
                                        </div>

                                        <div className="flex items-center justify-between mt-4 text-xs text-slate-500">
                                            <span>
                                                {data.text?.length || 0} Characters
                                            </span>

                                            <span>
                                                {(data.text?.split(/\s+/).length || 0)} Words
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            )
                        })
                    }
                </div>
            </div>
        </div>
    )
}

export default ChatBotManage