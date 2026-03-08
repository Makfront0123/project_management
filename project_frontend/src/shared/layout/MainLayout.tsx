import { UserDropdown } from "../../features/user/components/UserDropdown";
import { SelectGroups } from "../components/SelectGroups";
import { Sidebar } from "./Sidebar";
import { Outlet } from "react-router";
import { ModeToggle } from "../components/ModeToggle";
import NotificationDropdown from "@/features/notification/components/DropdownNotification";

const MainLayout = () => {
    return (
        <div className="min-h-screen w-full">
            <div className="flex w-full min-h-screen">
                <Sidebar />
                <main className="flex-1 w-full ">
                    <header className="flex items-center justify-between w-full py-3 px-10 bg-white dark:bg-black border-b-2 border-gray-200 dark:border-none">
                        <SelectGroups />
                        <div className="flex items-center gap-x-6">
                            <NotificationDropdown />
                            <div className="flex items-center">
                                <UserDropdown />
                                <ModeToggle />
                            </div>
                        </div>

                    </header>
                    <Outlet />
                </main>

            </div>
        </div>
    )
}

export default MainLayout

