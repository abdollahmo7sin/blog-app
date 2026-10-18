import { useState } from "react"
import { Link, NavLink } from "react-router"
import { useAuthStore } from "../stores/authStore"
import { useLogout } from "../hooks/useAuth"

const navLinkClass = ({ isActive }: { isActive: boolean }) =>
    `block py-2 md:py-0 transition-colors ${isActive ? "text-primary font-semibold" : "text-ink hover:text-primary"}`

export const Header = () => {
    const [menuOpen, setMenuOpen] = useState(false)
    const { user, isLoading } = useAuthStore()
    const { mutate: logout } = useLogout()
    const isLoggedIn = !!user
    const displayName = user?.user_metadata.display_name
    return (
        <header className="bg-white/90 backdrop-blur border-b border-line sticky top-0 z-40">
            <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between gap-6">

                <div className="flex items-center gap-10">
                    {/* Logo */}
                    <Link to="/" className="flex items-center gap-2 text-xl font-bold">
                        <span className="size-9 rounded-xl bg-primary text-white flex items-center justify-center" aria-hidden="true">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="size-5">
                                <path strokeLinecap="round" strokeLinejoin="round" d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L6.832 19.82a4.5 4.5 0 0 1-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 0 1 1.13-1.897L16.863 4.487Z" />
                            </svg>
                        </span>
                        مدونتي
                    </Link>

                    {/* Navigation */}
                    <nav
                        className={`absolute top-full inset-x-0 bg-white border-b border-line px-4 py-3 md:static md:border-0 md:p-0 md:bg-transparent ${menuOpen ? "block" : "hidden"} md:block`}
                    >
                        <ul className="flex flex-col md:flex-row md:gap-8">
                            <li><NavLink to="/" end className={navLinkClass} onClick={() => setMenuOpen(false)}>الرئيسية</NavLink></li>
                            <li><NavLink to="/blog" className={navLinkClass} onClick={() => setMenuOpen(false)}>المدونة</NavLink></li>
                        </ul>
                    </nav>
                </div>

                <div className="flex items-center gap-3">
                    {isLoading ? (
                        <div className="hidden sm:flex items-center gap-3">
                            <div className="animate-pulse bg-gray-200 rounded-full h-8 w-8"></div>
                            <div className="animate-pulse bg-gray-200 rounded-full h-8 w-32"></div>
                        </div>
                    ) : isLoggedIn ? (
                        <div className="hidden sm:flex items-center gap-3">
                            <Link to="/my-articles" className="flex items-center gap-2 text-sm font-medium hover:text-primary transition-colors cursor-pointer">
                                <span className="size-8 rounded-full bg-accent text-ink flex items-center justify-center font-semibold" aria-hidden="true">
                                    {displayName.charAt(0)}
                                </span>
                                {displayName}
                            </Link>
                            <button
                                onClick={() => logout()}
                                type="button"
                                className="text-sm text-gray-500 hover:text-red-700 transition-colors cursor-pointer"
                            >
                                خروج
                            </button>
                        </div>
                    ) : (
                        <Link to="/login" className="hidden sm:block text-sm hover:text-primary transition-colors">
                            تسجيل الدخول
                        </Link>
                    )}
                    <Link to="/articles/new" className="bg-primary text-white text-sm font-semibold px-4 py-2.5 rounded-xl hover:bg-ink transition-colors">
                        اكتب مقال
                    </Link>

                    {/* Hamburger */}
                    <button
                        type="button"
                        onClick={() => setMenuOpen(!menuOpen)}
                        aria-label="فتح القائمة"
                        aria-expanded={menuOpen}
                        className="md:hidden size-10 flex items-center justify-center rounded-lg border border-line cursor-pointer"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.8} stroke="currentColor" className="size-5">
                            <path strokeLinecap="round" strokeLinejoin="round" d={menuOpen ? "M6 18 18 6M6 6l12 12" : "M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"} />
                        </svg>
                    </button>
                </div>
            </div>
        </header>
    )
}
