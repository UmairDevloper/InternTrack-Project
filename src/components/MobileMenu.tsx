"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Menu, X } from "lucide-react";

type Props = {
    user: {
        name?: string | null;
        image?: string | null;
    } | null;
    children: React.ReactNode; // Sign Out button comes from Navbar
};

export default function MobileMenu({ user, children }: Props) {
    const [open, setOpen] = useState(false);

    // Prevent background scrolling
    useEffect(() => {
        if (open) {
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "";
        }

        return () => {
            document.body.style.overflow = "";
        };
    }, [open]);

    return (
        <>
            {/* Hamburger */}
            <button
                onClick={() => setOpen(true)}
                className="rounded-lg p-2 transition hover:bg-gray-100 md:hidden"
                aria-label="Open Menu"
            >
                <Menu size={26} />
            </button>

            {/* Overlay */}
            <div
                onClick={() => setOpen(false)}
                className={`fixed inset-0 z-40 bg-black/40 backdrop-blur-sm transition-opacity duration-300 md:hidden ${open
                    ? "opacity-100 visible"
                    : "opacity-0 invisible"
                    }`}
            />

            {/* Drawer */}
            <aside
                className={`fixed right-0 top-0 z-50 h-screen w-72 bg-white shadow-2xl transition-transform duration-300 md:hidden ${open
                    ? "translate-x-0"
                    : "translate-x-full"
                    }`}
            >
                {/* Header */}
                <div className="flex items-center justify-between border-b px-5 py-4">

                    <div>
                        <h2 className="text-lg font-bold">
                            InternTrack
                        </h2>

                        <p className="text-xs text-gray-500">
                            Internship Tracker
                        </p>
                    </div>

                    <button
                        onClick={() => setOpen((prev) => !prev)}
                        className="rounded-lg p-2 hover:bg-gray-100"
                    >
                        <X size={24} />
                    </button>

                </div>

                {/* User */}

                {user && (
                    <div className="flex items-center gap-3 border-b p-5">

                        {user.image ? (
                            <img
                                src={user.image}
                                alt="Profile"
                                className="h-12 w-12 rounded-full object-cover"
                            />
                        ) : (
                            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-blue-600 font-semibold text-white">
                                {user.name?.charAt(0)}
                            </div>
                        )}

                        <div>
                            <p className="font-semibold">
                                {user.name}
                            </p>

                            <p className="text-sm text-gray-500">
                                Logged In
                            </p>
                        </div>

                    </div>
                )}

                {/* Links */}

                <nav className="flex flex-col p-4">

                    <Link
                        href="/dashboard"
                        onClick={() => setOpen(false)}
                        className="rounded-xl px-4 py-3 font-medium text-gray-700 transition hover:bg-blue-50 hover:text-blue-600"
                    >
                        Dashboard
                    </Link>

                    <Link
                        href="/dashboard/add"
                        onClick={() => setOpen(false)}
                        className="rounded-xl px-4 py-3 font-medium text-gray-700 transition hover:bg-blue-50 hover:text-blue-600"
                    >
                        Add Application
                    </Link>

                    <Link
                        href="/companies"
                        onClick={() => setOpen(false)}
                        className="rounded-xl px-4 py-3 font-medium text-gray-700 transition hover:bg-blue-50 hover:text-blue-600"
                    >
                        Companies
                    </Link>

                </nav>

                {/* Bottom */}

                <div className="absolute bottom-0 w-full border-t p-5">
                    {children}
                </div>

            </aside>
        </>
    );
}