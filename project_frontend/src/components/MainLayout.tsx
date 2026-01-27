import { Outlet } from "react-router"
import { useNotifications } from "../hooks/useNotications";
import { Sidebar } from "./Sidebar";

const MainLayout = () => {
    useNotifications()

    return (
        <div className="min-h-screen w-full">
            <div className="flex w-full min-h-screen">

                {/* Sidebar con ancho fijo */}
                <Sidebar />

                {/* Contenido principal */}
                <main className="flex-1 w-full">
                    <Outlet />
                </main>

            </div>
        </div>
    )
}

export default MainLayout

