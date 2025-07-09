import { Outlet } from "react-router"
import { useAuthStore } from "../stores/auth_store"

const MainLayout = () => {
    const { logout } = useAuthStore()
    return (
        <div>
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