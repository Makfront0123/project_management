import { Link, Outlet } from "react-router"
import { useAuthStore } from "../stores/auth_store"
import { icons } from "../core/icons"

import NotificationDropdown from "./DropdownNotification"
import { useProjectDetails } from "../hooks/useProjectDetails";
import { useNotifications } from "../hooks/useNotications";




const MainLayout = () => {
    const { logout, user } = useAuthStore();

    // Llama al hook que obtiene los detalles del proyecto (incluyendo teamId)
    const { teamId } = useProjectDetails();

    // Llama al hook de notificaciones, pasándole el teamId
    useNotifications(teamId);

    return (
        <main className="w-full h-full flex flex-col">
            <nav className="w-full py-3 bg-black flex items-center justify-between px-10 fixed top-0 ">
                <div className="flex justify-evenly items-center min-w-2xl">
                    <Link to="/" className="text-white">Logo</Link>
                </div>
                <div className="flex items-center gap-x-8">
                    <NotificationDropdown />
                    <span className="flex items-center gap-x-2 font-medium text-white">
                        <img src={icons.user} className="size-4" alt="" />
                        Welcome <span className="uppercase">{user?.name}</span>
                    </span>
                    <button
                        onClick={logout}
                        className="px-10 bg-blue-600 rounded-lg text-white cursor-pointer hover:opacity-70">Logout</button>
                </div>
            </nav>
            <Outlet />
            <footer className="w-full py-2 fixed bottom-0 bg-black">Derechos de autor © 2023 by <a href="https://github.com/scm0" target="_blank" className="text-blue-600">scm0</a></footer>
        </main>
    );
};

export default MainLayout;