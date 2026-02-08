import { Outlet } from "react-router"
import { useNotifications } from "../hooks/useNotications";
import { Sidebar } from "./Sidebar";

import { DropdownMenuOptions } from "./DropdownMenu";
import { icons } from "@/core/icons";
import { SelectGroups } from "./SelectGroups";

const MainLayout = () => {
    useNotifications()

    return (
        <div className="min-h-screen w-full">
            <div className="flex w-full min-h-screen">
                <Sidebar />
                <main className="flex-1 w-full">
                    <header className="flex items-center justify-between w-full py-3 px-10 bg-white border-b-2 border-gray-200">
                        <SelectGroups />
                        <div className="flex items-center gap-x-5">
                            <img src={icons.notifications} alt="Logo" className="size-10 p-2 border-2 cursor-pointer hover:opacity-70 rounded-sm" />
                            <DropdownMenuOptions />
                        </div>
                    </header>
                    <Outlet />
                </main>

            </div>
        </div>
    )
}

export default MainLayout

