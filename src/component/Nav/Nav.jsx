import React, { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import DefaultButton from "../Buttons/DefaultButton";
import { useAuth } from "../../context/AuthContext";

const Nav = () => {
    const [open, setOpen] = useState(false);
    const [showNav, setShowNav] = useState(true);

    const { auth } = useAuth();

    const menu = [
        {
            id: 1,
            name: "Home",
            link: "/",
        },
        {
            id: 2,
            name: "Shop",
            link: "/shop",
        },
        {
            id: 3,
            name: "Pricing",
            link: "/pricing",
        },
        {
            id: 4,
            name: "Tools rent Guide",
            link: "/rent-guide",
        },
    ];

    useEffect(() => {
        let lastScrollY = window.scrollY;

        const handleScroll = () => {
            const currentScrollY = window.scrollY;

            if (currentScrollY < 50) {
                setShowNav(true);
            } else if (currentScrollY > lastScrollY) {
                setShowNav(false);
            } else {
                setShowNav(true);
            }

            lastScrollY = currentScrollY;
        };

        window.addEventListener("scroll", handleScroll);

        return () => {
            window.removeEventListener("scroll", handleScroll);
        };
    }, []);

    // Remove @gmail.com / @Gmail.com / any email domain
    const getEmailName = (email) => {
        if (!email) return "";

        return email.split("@")[0];
    };

    return (
        <div
            className={`fixed top-0 left-0 z-50 w-full bg-black/25 backdrop-blur-xl transition-transform duration-300 ${showNav ? "translate-y-0" : "-translate-y-full"
                }`}
        >
            <div className="max-w-7xl mx-auto px-5 lg:px-8">
                <div className="flex items-center justify-between h-20">

                    {/* Logo */}
                    <a
                        href="/"
                        className="text-2xl md:text-3xl font-extrabold tracking-tight text-yellow-400 transition-transform duration-300 hover:scale-105"
                    >
                        Lanka <span className="text-white">Tools</span> Pvt LTD
                    </a>

                    {/* Desktop Navigation */}
                    <nav className="hidden lg:flex items-center space-x-10">
                        {menu.map((data) => (
                            <a
                                key={data.id}
                                href={data.link}
                                className="relative font-medium text-white/90 transition-all duration-300 hover:text-yellow-400 after:absolute after:left-0 after:-bottom-2 after:h-[2px] after:w-0 after:bg-yellow-400 after:transition-all after:duration-300 hover:after:w-full"
                            >
                                {data.name}
                            </a>
                        ))}
                    </nav>

                    {/* Desktop Auth */}
                    <div className="hidden lg:flex items-center gap-7">
                        {auth?.user?.email ? (
                            <a
                                href="/dashboard"
                                className="font-semibold text-white/90 transition-colors duration-300 hover:text-yellow-400"
                            >
                                {getEmailName(auth.user.email)}
                            </a>
                        ) : (
                            <>
                                <a
                                    href="/login"
                                    className="font-semibold text-white/90 transition-colors duration-300 hover:text-yellow-400"
                                >
                                    Sign In
                                </a>

                                <a href="/registation">
                                    <DefaultButton
                                        type="button"
                                        label="Rent a Tool"
                                    />
                                </a>
                            </>
                        )}
                    </div>

                    {/* Mobile Menu Button */}
                    <button
                        onClick={() => setOpen(!open)}
                        className="lg:hidden relative w-10 h-10 flex items-center justify-center"
                        aria-label="Toggle menu"
                    >
                        <motion.span
                            animate={
                                open
                                    ? { rotate: 45, y: 0 }
                                    : { rotate: 0, y: -8 }
                            }
                            transition={{ duration: 0.25 }}
                            className="absolute w-6 h-0.5 bg-yellow-400"
                        />

                        <motion.span
                            animate={
                                open
                                    ? { opacity: 0 }
                                    : { opacity: 1 }
                            }
                            transition={{ duration: 0.2 }}
                            className="absolute w-6 h-0.5 bg-yellow-400"
                        />

                        <motion.span
                            animate={
                                open
                                    ? { rotate: -45, y: 0 }
                                    : { rotate: 0, y: 8 }
                            }
                            transition={{ duration: 0.25 }}
                            className="absolute w-6 h-0.5 bg-yellow-400"
                        />
                    </button>
                </div>
            </div>

            {/* Mobile Menu */}
            <AnimatePresence>
                {open && (
                    <>
                        {/* Overlay */}
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            transition={{ duration: 0.2 }}
                            onClick={() => setOpen(false)}
                            className="fixed inset-0 bg-black/50 lg:hidden"
                        />

                        {/* Mobile Navigation */}
                        <motion.div
                            initial={{ opacity: 0, y: -30 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -30 }}
                            transition={{
                                duration: 0.3,
                                ease: "easeOut",
                            }}
                            className="absolute top-full left-0 w-full backdrop-blur-xl border-t border-white/10 lg:hidden bg-black"
                        >
                            <div className="px-5 py-6 flex flex-col gap-2">

                                {/* Navigation Links */}
                                {menu.map((data, index) => (
                                    <motion.a
                                        key={data.id}
                                        href={data.link}
                                        initial={{
                                            opacity: 0,
                                            x: -20,
                                        }}
                                        animate={{
                                            opacity: 1,
                                            x: 0,
                                        }}
                                        exit={{
                                            opacity: 0,
                                            x: -20,
                                        }}
                                        transition={{
                                            delay: index * 0.08,
                                            duration: 0.25,
                                        }}
                                        onClick={() => setOpen(false)}
                                        className="px-4 py-3 font-medium text-white/90 transition-all hover:bg-yellow-400/10 hover:text-yellow-400"
                                    >
                                        {data.name}
                                    </motion.a>
                                ))}

                                {/* Mobile Auth */}
                                <div className="border-t border-white/10 mt-3 pt-5">

                                    {auth?.user?.email ? (
                                        <motion.a
                                            href="/dashboard"
                                            initial={{
                                                opacity: 0,
                                                x: -20,
                                            }}
                                            animate={{
                                                opacity: 1,
                                                x: 0,
                                            }}
                                            transition={{
                                                delay: 0.2,
                                                duration: 0.25,
                                            }}
                                            onClick={() =>
                                                setOpen(false)
                                            }
                                            className="block px-4 py-3 font-semibold text-yellow-400 transition-all hover:text-yellow-300"
                                        >
                                            {getEmailName(auth.user.email)}
                                        </motion.a>
                                    ) : (
                                        <>
                                            {/* Sign In */}
                                            <motion.a
                                                href="/login"
                                                initial={{
                                                    opacity: 0,
                                                    x: -20,
                                                }}
                                                animate={{
                                                    opacity: 1,
                                                    x: 0,
                                                }}
                                                transition={{
                                                    delay: 0.2,
                                                    duration: 0.25,
                                                }}
                                                onClick={() =>
                                                    setOpen(false)
                                                }
                                                className="block px-4 py-3 font-semibold text-white/90 transition-all hover:text-yellow-400"
                                            >
                                                Sign In
                                            </motion.a>

                                            {/* Rent a Tool */}
                                            <motion.div
                                                initial={{
                                                    opacity: 0,
                                                    y: 15,
                                                }}
                                                animate={{
                                                    opacity: 1,
                                                    y: 0,
                                                }}
                                                transition={{
                                                    delay: 0.3,
                                                }}
                                                className="mt-4"
                                            >
                                                <a href="/registation">
                                                    <DefaultButton
                                                        type="button"
                                                        label="Rent a Tool"
                                                    />
                                                </a>
                                            </motion.div>
                                        </>
                                    )}
                                </div>
                            </div>
                        </motion.div>
                    </>
                )}
            </AnimatePresence>
        </div>
    );
};

export default Nav;