import { Link, Outlet } from "react-router"
import { useAuthStore } from "../stores/auth_store"
import NotificationDropdown from "./DropdownNotification"
import { useNotifications } from "../hooks/useNotications";

const MainLayout = () => {
    const { logout, user } = useAuthStore();
    useNotifications();
    const baseUrl = "http://localhost:3000";


    const getImageUrl = (imagePath: string) => {
        if (!imagePath) return '';
        const normalizedPath = imagePath.replace(/\\/g, '/');
        return `${baseUrl}/${normalizedPath}`;
    };


    return (
        <div className="min-h-screen w-full relative">

            <div
                className="absolute inset-0 z-0"
                style={{
                    background: "radial-gradient(125% 125% at 50% 90%, #000000 40%, #0d1a36 100%)",
                }}
            />


            <div className="relative  flex w-full">

                <aside className="max-w-[30vh] h-screen bg-gray-900 flex px-5 py-5 fixed top-0 left-0 z-90">
                    <div className="flex flex-col items-center justify-between py-2 w-full">

                        <span className="flex flex-col items-center gap-x-2 font-medium text-white">
                            <Link to="/" className="flex flex-col  items-start gap-x-2 font-medium text-white mb-10">Logo</Link>
                            <img
                                src={user?.image ? getImageUrl(user.image) : ''}
                                className="size-36 rounded-full object-cover"

                            />
                            <div className="flex flex-col items-start mt-8">
                                <span className="uppercase">Welcome {user?.name}</span>
                                <p className="text-gray-600 font-light">{user?.email}</p>
                            </div>
                        </span>
                        <div className="flex flex-col items-center gap-8">
                            <NotificationDropdown />
                            <button
                                onClick={logout}
                                className="px-10 bg-blue-600 rounded-lg text-white cursor-pointer hover:opacity-70"
                            >
                                Logout
                            </button>
                        </div>
                    </div>
                </aside>


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
 