import { Link } from "react-router"

export const Footer = () => {
    return (
        <footer className="bg-ink text-gray-300 mt-16">
            <div className="max-w-7xl mx-auto px-4 py-10 flex flex-col md:flex-row md:items-center md:justify-between gap-6">
                <div>
                    <p className="text-white text-lg font-bold mb-1">مدونتي</p>
                    <p className="text-sm">مقالات عن البرمجة والتصميم والتقنية، بالعربي.</p>
                </div>

                <ul className="flex gap-6 text-sm">
                    <li><Link to="/" className="hover:text-accent transition-colors">الرئيسية</Link></li>
                    <li><Link to="/blog" className="hover:text-accent transition-colors">المدونة</Link></li>
                    <li><Link to="/articles/new" className="hover:text-accent transition-colors">اكتب مقال</Link></li>
                </ul>
            </div>

            <div className="border-t border-white/10">
                <p className="max-w-7xl mx-auto px-4 py-4 text-xs text-gray-400">جميع الحقوق محفوظة © 2026</p>
            </div>
        </footer>
    )
}
