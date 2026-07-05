import Link from "next/link"
import MobileMenu from "@/components/MobileMenu"
import { auth, signOut } from "@/lib/auth"

export default async function Navbar() {
    const session = await auth()

    return (
        <nav className="sticky top-0 z-50 w-full border-b border-gray-200/80 bg-white/90 backdrop-blur-md">
            <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">

                {/* Logo */}
                <Link href="/" className="flex items-center gap-2 transition hover:opacity-90">
                    <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-blue-600 text-base font-bold text-white shadow-sm">
                        I
                    </div>
                    <div className="flex flex-col">
                        <span className="text-base font-bold tracking-tight text-gray-900 leading-tight">
                            InternTrack
                        </span>
                        <span className="text-xs text-gray-500 leading-tight">
                            Internship Tracker
                        </span>
                    </div>
                </Link>

                {/* Desktop nav links — hidden on mobile */}
                {session?.user && (
                    <div className="hidden md:flex items-center gap-1 rounded-full border border-gray-200 bg-gray-50 p-1">
                        <Link href="/dashboard" className="rounded-full px-4 py-2 text-sm font-medium text-gray-600 transition hover:bg-white hover:text-blue-600">Dashboard</Link>
                        <Link href="/dashboard/add" className="rounded-full px-4 py-2 text-sm font-medium text-gray-600 transition hover:bg-white hover:text-blue-600">Add Application</Link>
                        <Link href="/companies" className="rounded-full px-4 py-2 text-sm font-medium text-gray-600 transition hover:bg-white hover:text-blue-600">Companies</Link>
                    </div>
                )}

                {/* Right side */}
                <div className="flex items-center gap-3">

                    {/* Desktop user + sign out — hidden on mobile */}
                    {session?.user ? (
                        <div className="hidden md:flex items-center gap-3">
                            <div className="flex items-center gap-3 rounded-full border border-gray-200 bg-gray-50 px-3 py-1.5">
                                {session.user.image ? (
                                    <img
                                        src={session.user.image}
                                        alt="Profile"
                                        className="h-8 w-8 rounded-full border object-cover"
                                    />
                                ) : (
                                    <div className="flex h-8 w-8 items-center justify-center rounded-full bg-blue-600 font-semibold text-white text-sm">
                                        {session.user.name?.charAt(0)}
                                    </div>
                                )}
                                <div className="leading-tight">
                                    <p className="text-sm font-semibold text-gray-900">{session.user.name}</p>
                                    <p className="text-xs text-gray-500">Welcome back</p>
                                </div>
                            </div>

                            <form action={async () => { "use server"; await signOut({ redirectTo: "/" }) }}>
                                <button
                                    type="submit"
                                    className="rounded-xl border border-gray-200 bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-sm transition hover:border-red-200 hover:bg-red-50 hover:text-red-600"
                                >
                                    Sign Out
                                </button>
                            </form>
                        </div>
                    ) : (
                        <Link
                            href="/auth"
                            className="hidden md:inline-flex rounded-xl bg-blue-600 px-5 py-2.5 text-sm font-semibold text-white shadow-md transition hover:bg-blue-700"
                        >
                            Sign In
                        </Link>
                    )}

                    {/* Mobile hamburger — ONLY visible on mobile, hidden on md+ */}
                    <div className="flex md:hidden">
                        <MobileMenu
                            user={session?.user ? { name: session.user.name, image: session.user.image } : null}
                        >
                            {session?.user ? (
                                <form action={async () => { "use server"; await signOut({ redirectTo: "/" }) }}>
                                    <button
                                        type="submit"
                                        className="w-full rounded-xl bg-red-500 px-4 py-3 font-medium text-white transition hover:bg-red-600"
                                    >
                                        Sign Out
                                    </button>
                                </form>
                            ) : (
                                <Link
                                    href="/auth"
                                    className="block w-full rounded-xl bg-blue-600 px-4 py-3 text-center font-medium text-white hover:bg-blue-700"
                                >
                                    Sign In
                                </Link>
                            )}
                        </MobileMenu>
                    </div>

                </div>
            </div>
        </nav>
    )
}