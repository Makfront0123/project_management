import { Link, Outlet } from "react-router"
import { useAuthStore } from "../stores/auth_store"
import NotificationDropdown from "./DropdownNotification"
import { useNotifications } from "../hooks/useNotications";

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


            <div className="relative z-10 flex w-full">

                <aside className="max-w-[30vh] h-screen bg-gray-900 flex px-5 py-10 fixed top-0 left-0 z-50">
                    <div className="flex flex-col items-center justify-between py-2 w-full">

                        <span className="flex flex-col items-center gap-x-2 font-medium text-white">
                            <Link to="/" className="flex flex-col mb-3 items-start gap-x-2 font-medium text-white">Logo</Link>
                            <div className="flex flex-col items-start">
                                <span className="uppercase">Welcome {user?.name}</span>
                                <p className="text-gray-600 font-light">W{user?.email}</p>
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


            <footer className="w-full py-2 fixed bottom-0 flex items-center justify-center text-white bg-gray-900 z-50">
                Derechos de autor © 2023 by <a href="https://github.com/scm0" target="_blank" className="text-blue-600">scm0</a>
            </footer>
        </div>
    );
};

export default MainLayout;

/*
 <aside className="max-w-[30vh] h-full bg-gray-900 flex px-5 py-10 fixed top-0 left-0 z-50">
                <div className="flex flex-col items-center justify-between py-2 ">
                    <span className="flex flex-col items-start gap-x-2 font-medium text-white">
                        <span className="uppercase">Welcome {user?.name}</span>
                        <p className="text-gray-600 font-light">W{user?.email}</p>
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
            <Outlet />
            <footer className="w-full py-2 fixed bottom-0 flex items-center justify-center text-white bg-black">Derechos de autor © 2023 by <a href="https://github.com/scm0" target="_blank" className="text-blue-600">scm0</a></footer>
*/
/*
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
*/