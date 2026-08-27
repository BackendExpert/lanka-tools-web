import React, { useEffect, useState } from "react";
import {
    FiActivity,
    FiAlertCircle,
    FiCheckCircle,
    FiClock,
    FiLogIn,
    FiShield,
    FiTrash2,
    FiUser,
} from "react-icons/fi";
import API from "../../../services/api";

const MyAudits = () => {
    const token = localStorage.getItem("access_token");
    const [audit, setAudit] = useState([]);

    useEffect(() => {
        const fetchallauditlogs = async () => {
            try {
                const res = await API.get("/profile/my-audits", {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });

                if (res.data.success === true) {
                    setAudit(res.data.result || []);
                }
            } catch (error) {
                console.error(error);
            }
        };

        if (token) {
            fetchallauditlogs();
        }
    }, [token]);

    const getAction = (item) => {
        return (
            item.action ||
            item.event ||
            item.activity ||
            item.type ||
            "System Activity"
        );
    };

    const getDescription = (item) => {
        return (
            item.description ||
            item.message ||
            item.details ||
            "Activity recorded on your account."
        );
    };

    const getDate = (item) => {
        return (
            item.createdAt ||
            item.created_at ||
            item.timestamp ||
            item.date ||
            null
        );
    };

    const formatDate = (value) => {
        if (!value) {
            return "Unknown date";
        }

        const date = new Date(value);

        if (Number.isNaN(date.getTime())) {
            return "Unknown date";
        }

        return date.toLocaleString([], {
            month: "short",
            day: "numeric",
            year: "numeric",
            hour: "2-digit",
            minute: "2-digit",
        });
    };

    const getIcon = (action) => {
        const value = action.toLowerCase();

        if (value.includes("login")) {
            return <FiLogIn />;
        }

        if (value.includes("delete")) {
            return <FiTrash2 />;
        }

        if (value.includes("security")) {
            return <FiShield />;
        }

        if (value.includes("error") || value.includes("fail")) {
            return <FiAlertCircle />;
        }

        if (value.includes("success") || value.includes("create")) {
            return <FiCheckCircle />;
        }

        if (value.includes("user")) {
            return <FiUser />;
        }

        return <FiActivity />;
    };

    const getIconStyle = (action) => {
        const value = action.toLowerCase();

        if (
            value.includes("delete") ||
            value.includes("error") ||
            value.includes("fail")
        ) {
            return "bg-red-50 text-red-600";
        }

        if (value.includes("login") || value.includes("security")) {
            return "bg-blue-50 text-blue-600";
        }

        if (value.includes("success") || value.includes("create")) {
            return "bg-green-50 text-green-600";
        }

        return "bg-yellow-50 text-yellow-600";
    };

    const lastSixAudits = [...audit]
        .sort((a, b) => {
            const dateA = new Date(getDate(a) || 0).getTime();
            const dateB = new Date(getDate(b) || 0).getTime();

            return dateB - dateA;
        })
        .slice(0, 6);

    return (
        <div className="w-full border border-gray-200 bg-white">
            <div className="flex flex-col gap-4 border-b border-gray-200 px-5 py-5 sm:flex-row sm:items-center sm:justify-between">
                <div>
                    <div className="mb-2 flex items-center gap-2">
                        <span className="h-2 w-2 bg-yellow-400" />

                        <p className="text-[10px] font-bold uppercase tracking-[0.25em] text-yellow-500">
                            Account Activity
                        </p>
                    </div>

                    <h2 className="text-xl font-bold text-black">
                        My Audit Logs
                    </h2>

                    <p className="mt-1 text-xs text-gray-400">
                        Your latest account activities
                    </p>
                </div>

                <div className="flex w-fit items-center gap-2 border border-gray-200 px-4 py-2">
                    <FiClock className="text-yellow-500" />

                    <span className="text-[10px] font-bold uppercase tracking-wider text-gray-500">
                        Last 6 Records
                    </span>
                </div>
            </div>

            <div>
                {lastSixAudits.length > 0 ? (
                    lastSixAudits.map((item, index) => {
                        const action = getAction(item);

                        return (
                            <div
                                key={item._id || item.id || index}
                                className="group flex items-start gap-4 border-b border-gray-100 px-5 py-5 transition duration-200 last:border-b-0 hover:bg-gray-50"
                            >
                                <div
                                    className={`flex h-11 w-11 shrink-0 items-center justify-center text-lg ${getIconStyle(
                                        action
                                    )}`}
                                >
                                    {getIcon(action)}
                                </div>

                                <div className="min-w-0 flex-1">
                                    <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
                                        <h3 className="truncate text-sm font-bold text-gray-900">
                                            {action}
                                        </h3>

                                        <span className="shrink-0 text-[11px] font-medium text-gray-400">
                                            {formatDate(getDate(item))}
                                        </span>
                                    </div>

                                    <p className="mt-1 text-xs leading-5 text-gray-500">
                                        {getDescription(item)}
                                    </p>

                                    <div className="mt-2 flex items-center gap-2">
                                        <FiUser className="text-xs text-gray-400" />

                                        <span className="text-[11px] font-medium text-gray-400">
                                            My Account
                                        </span>
                                    </div>
                                </div>
                            </div>
                        );
                    })
                ) : (
                    <div className="flex flex-col items-center justify-center px-5 py-16 text-center">
                        <div className="flex h-12 w-12 items-center justify-center bg-gray-100 text-gray-400">
                            <FiActivity className="text-xl" />
                        </div>

                        <h3 className="mt-4 text-sm font-bold text-gray-800">
                            No Audit Logs Found
                        </h3>

                        <p className="mt-1 text-xs text-gray-400">
                            No recent activity is available for your account.
                        </p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default MyAudits;