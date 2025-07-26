import { Link, Outlet } from "react-router"
import { useAuthStore } from "../stores/auth_store"
import { icons } from "../core/icons"
 


const MainLayout = () => {
    const { logout } = useAuthStore()
    return (

        <main className="w-full h-full flex flex-col">
            <nav className="w-full py-3 bg-black flex items-center z-80 justify-between px-10 fixed top-0 overflow-hidden">
                <div className="flex justify-evenly items-center min-w-2xl">
                    <Link to="/" className="text-white">Logo</Link>

                </div>
                <div className="flex items-center gap-x-8">
                    <span className="flex items-center gap-x-2 text-white"><img src={icons.user} className="size-4" alt="" /> User</span>
                    <button
                        onClick={logout}
                        className="px-10  bg-blue-600 rounded-lg text-white cursor-pointer hover:opacity-70">Logout</button>
                </div>
            </nav>
            <Outlet />
            <footer className="w-full py-2 fixed bottom-0 bg-black">Derechos de autor © 2023 by <a href="https://github.com/scm0" target="_blank" className="text-blue-600">scm0</a></footer>
        </main>

    )
}

export default MainLayout

