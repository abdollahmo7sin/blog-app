import { Footer } from "../components/Footer"
import { Header } from "../components/Header"
import { Outlet } from "react-router"
export const RootLayout = () => {
    return (
        <>
            <Header />
            <main className="max-w-7xl mx-auto px-4 py-10">
                <Outlet />
            </main>
            <Footer />
        </>
    )
}