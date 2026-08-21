import React, { useEffect, useState } from "react";
import DefaultButton from "../../component/Buttons/DefaultButton";
import { useNavigate } from "react-router-dom";

const DownloadCodes = () => {
    const navigate = useNavigate();
    const [downloaded, setDownloaded] = useState(false);
    const [codes, setCodes] = useState([]);

    useEffect(() => {
        const codeToken = localStorage.getItem("code_token");

        if (!codeToken) {
            navigate("/login", { replace: true });
            return;
        }

        try {
            const payload = JSON.parse(atob(codeToken.split(".")[1]));
            setCodes(payload.codes || []);
        } catch (err) {
            setCodes([]);
        }
    }, [navigate]);

    const copyCode = (code) => {
        navigator.clipboard.writeText(code);
    };

    const downloadCodes = () => {
        const text = codes
            .map((item, index) => `${index + 1}. ${item}`)
            .join("\n");

        const blob = new Blob([text], { type: "text/plain" });
        const url = URL.createObjectURL(blob);

        const a = document.createElement("a");
        a.href = url;
        a.download = "backup-codes.txt";
        a.click();

        URL.revokeObjectURL(url);

        setDownloaded(true);
    };

    const DownloadandContinue = () => {
        if (!downloaded) {
            alert("Please download your backup codes before continuing.");
            return;
        }

        localStorage.removeItem("code_token");
        navigate("/login");
    };

    return (
        <div className="relative min-h-screen bg-[url('https://wallpapercave.com/wp/wp15518710.jpg')] bg-cover bg-center">

            <div className="absolute inset-0 bg-black/65" />

            <div className="relative z-10 min-h-screen flex items-center justify-center px-4 py-12">

                <div className="w-full max-w-4xl">

                    <div className="text-center mb-8">
                        <p className="text-sm font-bold uppercase tracking-[0.3em] text-yellow-400">
                            Account Security
                        </p>

                        <h1 className="mt-3 text-4xl sm:text-5xl font-black text-white">
                            Backup Codes
                        </h1>

                        <p className="mt-3 text-white/60">
                            Save these codes somewhere safe. Each code can only be used once.
                        </p>
                    </div>

                    <div className="bg-[#292929] p-6 sm:p-8 md:p-10">

                        {codes.length > 0 ? (
                            <>
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">

                                    {codes.map((data, index) => (
                                        <div
                                            key={index}
                                            className="flex items-center justify-between border border-gray-700 bg-[#202020] p-4"
                                        >
                                            <div>
                                                <p className="text-xs uppercase tracking-widest text-gray-500">
                                                    Code {index + 1}
                                                </p>

                                                <p className="mt-1 font-mono text-lg font-bold tracking-wider text-white">
                                                    {data}
                                                </p>
                                            </div>

                                            <button
                                                type="button"
                                                onClick={() => copyCode(data)}
                                                className="px-4 py-2 bg-yellow-500 text-black font-semibold hover:bg-yellow-400 transition-colors"
                                            >
                                                Copy
                                            </button>
                                        </div>
                                    ))}

                                </div>

                                <div className="mt-8 flex flex-wrap gap-4">

                                    <button
                                        type="button"
                                        onClick={downloadCodes}
                                        className="px-6 py-3 bg-yellow-500 text-black font-semibold hover:bg-yellow-400 transition-colors"
                                    >
                                        Download TXT
                                    </button>

                                    <button
                                        type="button"
                                        onClick={() => window.print()}
                                        className="px-6 py-3 bg-white text-black font-semibold hover:bg-gray-200 transition-colors"
                                    >
                                        Print
                                    </button>

                                </div>
                            </>
                        ) : (
                            <div className="border border-red-500/30 bg-red-500/10 p-8 text-center">

                                <h2 className="text-xl font-bold text-red-400">
                                    No Backup Codes Found
                                </h2>

                                <p className="mt-2 text-red-400/70">
                                    Your backup code token is missing, expired, or invalid.
                                </p>

                            </div>
                        )}

                        <div className="mt-8">
                            <DefaultButton
                                onClick={DownloadandContinue}
                                type="button"
                                label="Continue"
                            />
                        </div>

                    </div>

                </div>

            </div>

        </div>
    );
};

export default DownloadCodes;