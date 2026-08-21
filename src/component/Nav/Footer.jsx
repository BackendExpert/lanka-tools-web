import React from 'react'
import {
    FaFacebookF,
    FaTwitter,
    FaLinkedinIn,
    FaInstagram,
    FaEnvelope,
    FaPhoneAlt,
    FaMapMarkerAlt,
    FaArrowRight
} from 'react-icons/fa'

const Footer = () => {
    const footer_quicklinks = [
        {
            title: "Quick Links",
            menus: [
                { name: "Tool Categories", links: "#" },
                { name: "Available Tools", links: "#" },
                { name: "How It Works", links: "#" },
                { name: "Rental Guide", links: "#" },
            ]
        },
    ]

    const branches = [
        {
            name: "Kandy",
            address: "24 Dalada Veediya, Kandy, Sri Lanka",
        },
        {
            name: "Colombo",
            address: "142 Galle Road, Colombo 03, Sri Lanka",
        },
        {
            name: "Galle",
            address: "18 Wakwella Road, Galle, Sri Lanka",
        },
    ]

    return (
        <footer className="bg-black text-white">
            <div className="max-w-7xl mx-auto px-6 py-20">

                <div className="grid lg:grid-cols-4 md:grid-cols-2 gap-x-12 gap-y-16">

                    <div>
                        <h1 className="text-3xl font-black tracking-tight">
                            Lanka<span className="text-yellow-400">Tools</span>
                        </h1>

                        <p className="mt-6 max-w-sm text-sm leading-7 text-white/50">
                            Professional tools and equipment available when
                            you need them. Simple rentals, reliable equipment,
                            and flexible rental periods.
                        </p>

                        <div className="mt-8 flex gap-3">
                            {[FaFacebookF, FaTwitter, FaLinkedinIn, FaInstagram].map(
                                (Icon, index) => (
                                    <a
                                        key={index}
                                        href="#"
                                        className="flex h-10 w-10 items-center justify-center border border-white/10 bg-white/5 text-white/60 transition-all duration-300 hover:border-yellow-400 hover:bg-yellow-400 hover:text-black"
                                    >
                                        <Icon size={14} />
                                    </a>
                                )
                            )}
                        </div>
                    </div>

                    <div>
                        <h2 className="mb-7 text-lg font-bold">
                            Quick Links
                        </h2>

                        <div className="space-y-4">
                            {footer_quicklinks[0].menus.map((item, index) => (
                                <a
                                    key={index}
                                    href={item.links}
                                    className="group flex items-center gap-3 text-sm text-white/50 transition-colors duration-300 hover:text-yellow-400"
                                >
                                    <FaArrowRight className="text-xs transition-transform duration-300 group-hover:translate-x-1 group-hover:text-yellow-400" />
                                    {item.name}
                                </a>
                            ))}
                        </div>
                    </div>

                    <div>
                        <h2 className="mb-7 text-lg font-bold">
                            Head Office
                        </h2>

                        <div className="space-y-6">

                            <div className="flex gap-4">
                                <div className="flex h-10 w-10 shrink-0 items-center justify-center bg-yellow-400 text-black">
                                    <FaMapMarkerAlt size={14} />
                                </div>

                                <div>
                                    <h3 className="font-semibold">
                                        Kandy
                                    </h3>

                                    <p className="mt-1 text-sm leading-6 text-white/50">
                                        24 Dalada Veediya,
                                        <br />
                                        Kandy, Sri Lanka
                                    </p>
                                </div>
                            </div>

                            <div className="flex gap-4">
                                <div className="flex h-10 w-10 shrink-0 items-center justify-center bg-yellow-400 text-black">
                                    <FaPhoneAlt size={14} />
                                </div>

                                <div>
                                    <h3 className="font-semibold">
                                        Contact
                                    </h3>

                                    <p className="mt-1 text-sm text-white/50">
                                        +94 71 175 8851
                                    </p>
                                </div>
                            </div>

                            <div className="flex gap-4">
                                <div className="flex h-10 w-10 shrink-0 items-center justify-center bg-yellow-400 text-black">
                                    <FaEnvelope size={14} />
                                </div>

                                <div>
                                    <h3 className="font-semibold">
                                        Email
                                    </h3>

                                    <p className="mt-1 text-sm text-white/50">
                                        support@toolrent.lk
                                    </p>
                                </div>
                            </div>

                        </div>
                    </div>

                    <div>
                        <h2 className="mb-7 text-lg font-bold">
                            Our Branches
                        </h2>

                        <div className="space-y-6">
                            {branches.map((branch, index) => (
                                <a
                                    href="#"
                                    key={index}
                                    className="group flex gap-4"
                                >
                                    <div className="flex h-10 w-10 shrink-0 items-center justify-center border border-yellow-400/30 bg-yellow-400/10 text-yellow-400 transition-all duration-300 group-hover:bg-yellow-400 group-hover:text-black">
                                        <FaMapMarkerAlt size={14} />
                                    </div>

                                    <div>
                                        <h3 className="font-semibold transition-colors duration-300 group-hover:text-yellow-400">
                                            {branch.name}
                                        </h3>

                                        <p className="mt-1 text-sm leading-6 text-white/50">
                                            {branch.address}
                                        </p>
                                    </div>
                                </a>
                            ))}
                        </div>
                    </div>

                </div>

                <div className="mt-16 border-t border-white/10 pt-8">
                    <div className="flex flex-col gap-5 md:flex-row md:items-center md:justify-between">

                        <p className="text-sm text-white/35">
                            © {new Date().getFullYear()} ToolRent. All Rights Reserved.
                        </p>

                        <div className="flex flex-wrap gap-6 text-sm text-white/40">
                            <a
                                href="#"
                                className="transition hover:text-yellow-400"
                            >
                                Privacy Policy
                            </a>

                            <a
                                href="#"
                                className="transition hover:text-yellow-400"
                            >
                                Terms of Service
                            </a>

                            <a
                                href="#"
                                className="transition hover:text-yellow-400"
                            >
                                Cookies
                            </a>
                        </div>

                    </div>
                </div>

            </div>
        </footer>
    )
}

export default Footer