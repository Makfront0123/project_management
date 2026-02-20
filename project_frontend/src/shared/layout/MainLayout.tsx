
import { icons } from "@/shared/constants/icons";
import { UserDropdown } from "../../components/UserDropdown";
import { SelectGroups } from "../components/SelectGroups";
import { useNotifications } from "@/hooks/useNotications";
import { Sidebar } from "./Sidebar";
import { Outlet } from "react-router";

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
                            <UserDropdown />
                        </div>
                    </header>
                    <Outlet />
                </main>

            </div>
        </div>
    )
}

export default MainLayout

