"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Menu, X } from "lucide-react";

type Props = {
    user: {
        name?: string | null;
        image?: string | null;
    } | null;
    children: React.ReactNode;
};

export default function MobileMenu({ user, children }: Props) {
    const [open, setOpen] = useState(false);

    useEffect(() => {
        document.body.style.overflow = open ? "hidden" : "";
        return () => { document.body.style.overflow = "" }
    }, [open]);

    return (
        <>
            {/* Hamburger — no md:hidden here, parent controls that */}
            <button
                onClick={() => setOpen(true)}
                className="rounded-lg p-2 transition text-black hover:bg-gray-100"
                aria-label="Open Menu"
            >
                <Menu size={24} />
            </button>

            {/* Overlay */}
            <div
                onClick={() => setOpen(false)}
                className={`fixed inset-0 z-40 bg-black/40 backdrop-blur-sm transition-opacity duration-300 ${open ? "opacity-100 visible" : "opacity-0 invisible pointer-events-none"
                    }`}
            />

            {/* Drawer */}
            <aside
                className={`fixed right-0 top-0 z-50 h-screen w-72 bg-white shadow-2xl transition-transform duration-300 ${open ? "translate-x-0" : "translate-x-full"
                    }`}
            >
                {/* Header */}
                <div className="flex items-center justify-between border-b px-5 py-4">
                    <div>
                        <h2 className="text-lg font-bold text-gray-900">InternTrack</h2>
                        <p className="text-xs text-gray-500">Internship Tracker</p>
                    </div>
                    <button
                        onClick={() => setOpen(false)}
                        className="rounded-lg p-2 text-black hover:bg-gray-100"
                        aria-label="Close Menu"
                    >
                        <X size={22} />
                    </button>
                </div>

                {/* User */}
                {user && (
                    <div className="flex items-center gap-3 border-b p-5">
                        {user.image ? (
                            <img
                                src={user.image}
                                alt="Profile"
                                className="h-12 w-12 rounded-full object-cover border border-gray-200"
                            />
                        ) : (
                            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-blue-600 font-semibold text-white text-lg">
                                {user.name?.charAt(0)}
                            </div>
                        )}
                        <div>
                            <p className="font-semibold text-gray-900">{user.name}</p>
                            <p className="text-sm text-gray-500">Logged in</p>
                        </div>
                    </div>
                )}

                {/* Links */}
                <nav className="flex flex-col gap-1 p-4">
                    {[
                        { href: "/dashboard", label: "Dashboard" },
                        { href: "/dashboard/add", label: "Add Application" },
                        { href: "/companies", label: "Companies" },
                    ].map((link) => (
                        <Link
                            key={link.href}
                            href={link.href}
                            onClick={() => setOpen(false)}
                            className="flex items-center rounded-xl px-4 py-3 font-medium text-gray-700 transition hover:bg-blue-50 hover:text-blue-600"
                        >
                            {link.label}
                        </Link>
                    ))}
                </nav>

                {/* Bottom — Sign out */}
                <div className="absolute bottom-0 w-full border-t p-5">
                    {children}
                </div>
            </aside>
        </>
    );
}