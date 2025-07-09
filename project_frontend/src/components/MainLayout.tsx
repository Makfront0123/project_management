import { Outlet } from "react-router"
import { useAuthStore } from "../stores/auth_store"

const MainLayout = () => {
    const { logout } = useAuthStore()
    return (
        <div className="min-h-screen w-full bg-[#fef9f7] relative">
            <div
                className="absolute inset-0 z-0"
                style={{
                    backgroundImage: `
        radial-gradient(circle at 20% 80%, rgba(255, 160, 146, 0.25) 0%, transparent 50%),
        radial-gradient(circle at 80% 20%, rgba(255, 244, 228, 0.3) 0%, transparent 50%),
        radial-gradient(circle at 40% 40%, rgba(255, 160, 146, 0.15) 0%, transparent 50%)`,
                }}
            />
            <button
                onClick={logout}
                className="px-10 py-2 bg-blue-600 rounded-lg text-white">Logout</button>
            <h1>Main Layout</h1>
            <main>
                <Outlet />
            </main>
        </div>
    )
}

export default MainLayout

