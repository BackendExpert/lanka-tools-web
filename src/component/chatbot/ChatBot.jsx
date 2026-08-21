import React, { useState, useRef, useEffect } from "react";
import { MessageCircle, X, Send, Bot } from "lucide-react";
import API from "../../services/api";
import ReactMarkdown from "react-markdown";

const ChatBot = () => {
    const [open, setOpen] = useState(false);
    const [question, setQuestion] = useState("");
    const [loading, setLoading] = useState(false);

    const [messages, setMessages] = useState([
        {
            role: "assistant",
            content: "👋 Hello! I'm your AI Assistant. How can I help you today?"
        }
    ]);

    const messagesEndRef = useRef(null);

    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({
            behavior: "smooth",
        });
    }, [messages, loading]);

    const handleAskQuestion = async (e) => {
        e.preventDefault();

        if (!question.trim() || loading) return;

        const currentQuestion = question;

        setMessages((prev) => [
            ...prev,
            {
                role: "user",
                content: currentQuestion,
            },
        ]);

        setQuestion("");
        setLoading(true);

        try {
            const res = await API.post("/chat/ask", {
                question: currentQuestion,
            });

            setMessages((prev) => [
                ...prev,
                {
                    role: "assistant",
                    content:
                        res.data.answer ||
                        res.data.response ||
                        "No response received.",
                },
            ]);
        } catch (err) {
            setMessages((prev) => [
                ...prev,
                {
                    role: "assistant",
                    content: "Something went wrong. Please try again.",
                },
            ]);
        } finally {
            setLoading(false);
        }
    };

    return (
        <>
            {open && (
                <div className="fixed inset-0 z-50 flex items-end justify-end">
                    <div className="pointer-events-auto mb-20 mr-3 flex h-[70vh] w-[92vw] max-w-[400px] flex-col overflow-hidden rounded-3xl border border-gray-200 bg-white shadow-2xl sm:mr-6 sm:h-[650px] sm:w-[400px]">                        <div className="flex items-center justify-between bg-gradient-to-r from-indigo-600 to-purple-600 px-5 py-4 text-white">
                        <div className="flex items-center gap-3">
                            <div className="flex h-11 w-11 items-center justify-center rounded-full bg-white/20">
                                <Bot size={22} />
                            </div>

                            <div>
                                <h2 className="font-semibold">
                                    AI Assistant
                                </h2>

                                <p className="text-xs text-indigo-100">
                                    Online
                                </p>
                            </div>
                        </div>

                        <button
                            onClick={() => setOpen(false)}
                            className="rounded-full p-2 transition hover:bg-white/20"
                        >
                            <X size={20} />
                        </button>
                    </div>

                        <div className="flex-1 space-y-4 overflow-y-auto bg-gradient-to-b from-slate-50 to-white p-4">

                            {messages.map((message, index) => (
                                <div
                                    key={index}
                                    className={`flex ${message.role === "user"
                                        ? "justify-end"
                                        : "justify-start"
                                        }`}
                                >
                                    {message.role === "assistant" && (
                                        <div className="mr-3 flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-indigo-600 text-white shadow-md">
                                            <Bot size={16} />
                                        </div>
                                    )}

                                    <div
                                        className={`max-w-[85%] rounded-2xl px-4 py-3 text-sm leading-7 ${message.role === "user"
                                            ? "rounded-br-md bg-indigo-600 text-white shadow-lg"
                                            : "rounded-tl-md border border-gray-200 bg-white text-gray-800 shadow"
                                            }`}
                                    >
                                        {message.role === "assistant" ? (
                                            <ReactMarkdown
                                                components={{
                                                    strong: ({ children }) => (
                                                        <strong className="mt-3 mb-2 block font-bold text-gray-900">
                                                            {children}
                                                        </strong>
                                                    ),

                                                    p: ({ children }) => (
                                                        <p className="mb-2 whitespace-pre-line">
                                                            {children}
                                                        </p>
                                                    ),

                                                    ul: ({ children }) => (
                                                        <ul className="mb-2 list-disc space-y-1 pl-5">
                                                            {children}
                                                        </ul>
                                                    ),

                                                    li: ({ children }) => (
                                                        <li className="text-gray-700">
                                                            {children}
                                                        </li>
                                                    ),

                                                    h1: ({ children }) => (
                                                        <h1 className="mt-3 mb-2 text-lg font-bold">
                                                            {children}
                                                        </h1>
                                                    ),

                                                    h2: ({ children }) => (
                                                        <h2 className="mt-3 mb-2 text-base font-bold">
                                                            {children}
                                                        </h2>
                                                    ),
                                                }}
                                            >
                                                {message.content}
                                            </ReactMarkdown>
                                        ) : (
                                            message.content
                                        )}
                                    </div>
                                </div>
                            ))}

                            {loading && (
                                <div className="flex justify-start">
                                    <div className="mr-3 flex h-9 w-9 items-center justify-center rounded-full bg-indigo-600 text-white shadow-md">
                                        <Bot size={16} />
                                    </div>

                                    <div className="rounded-2xl rounded-tl-md border border-gray-200 bg-white px-4 py-3 shadow">
                                        <div className="flex gap-1">
                                            <span className="h-2 w-2 animate-bounce rounded-full bg-indigo-500"></span>
                                            <span className="h-2 w-2 animate-bounce rounded-full bg-indigo-500 [animation-delay:150ms]"></span>
                                            <span className="h-2 w-2 animate-bounce rounded-full bg-indigo-500 [animation-delay:300ms]"></span>
                                        </div>
                                    </div>
                                </div>
                            )}

                            <div ref={messagesEndRef} />

                        </div>

                        <form
                            onSubmit={handleAskQuestion}
                            className="border-t border-gray-200 bg-white p-3 sm:p-4"
                        >
                            <div className="flex items-center gap-2 rounded-2xl border border-gray-200 bg-gray-50 p-2 shadow-sm">

                                <input
                                    type="text"
                                    value={question}
                                    onChange={(e) => setQuestion(e.target.value)}
                                    placeholder="Ask something..."
                                    className="flex-1 bg-transparent px-2 text-sm outline-none placeholder:text-gray-400"
                                />

                                <button
                                    type="submit"
                                    disabled={loading}
                                    className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-indigo-600 text-white transition hover:bg-indigo-700 disabled:opacity-50"
                                >
                                    <Send size={18} />
                                </button>

                            </div>
                        </form>

                    </div>

                </div>
            )}

            <button
                onClick={() => setOpen(!open)}
                className="fixed bottom-5 right-5 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-indigo-600 text-white shadow-2xl transition duration-300 hover:scale-110 sm:bottom-6 sm:right-6 sm:h-16 sm:w-16"
            >
                <MessageCircle size={26} />
            </button>
        </>
    );
};

export default ChatBot;