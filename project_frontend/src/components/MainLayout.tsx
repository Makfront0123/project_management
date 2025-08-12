import { Outlet } from "react-router"
import { useAuthStore } from "../stores/auth_store"
import { useNotifications } from "../hooks/useNotications";
import { Sidebar } from "./Sidebar";

const MainLayout = () => {
    const { logout, user } = useAuthStore();
    useNotifications();

    return (
        <div className="min-h-screen w-full relative">
            <div
                className="absolute inset-0 z-0"
                style={{
                    background: "radial-gradient(125% 125% at 50% 90%, #000000 40%, #0d1a36 100%)",
                }}
            />
            <div className="relative  flex w-full">

                <Sidebar user={user} logout={logout} />
                <div className="flex-1 ml-[30vh] p-8">
                    <Outlet />
                </div>
            </div>

            <footer className="w-full py-2 fixed bottom-0 flex items-center justify-center text-white bg-gray-900 -z-0">
                Derechos de autor © 2025-<a href="https://github.com/Makfront0123" target="_blank" className="text-blue-600">Makfront0123</a>
            </footer>
        </div>
    );
};

export default MainLayout;
