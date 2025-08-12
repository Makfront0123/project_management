 
import { Link } from "react-router";
import type { User } from "../types/auth";
import NotificationDropdown from "./DropdownNotification";

export const Sidebar = ({ user, logout }: { user: User | null; logout: () => void }) => (
  <aside className="max-w-[30vh] h-screen bg-gray-900 flex px-5 py-5 fixed top-0 left-0 z-50">
    <div className="flex flex-col items-center justify-between py-2 w-full">
      <span className="flex flex-col items-center gap-x-2 font-medium text-white">
        <Link to="/" className="relative inline-block ... hover:after:scale-x-100">
          Home
        </Link>
        <img src={user?.image} alt={`${user?.name} avatar`} className="size-36 rounded-full object-cover" />
        <div className="flex flex-col items-start mt-8">
          <span className="uppercase">Welcome {user?.name}</span>
          <p className="text-gray-600 font-light">{user?.email}</p>
        </div>
      </span>
      <div className="flex flex-col items-center gap-8">
        <NotificationDropdown />
        <button
          onClick={logout}
          aria-label="Logout"
          className="px-10 bg-blue-600 rounded-lg text-white cursor-pointer hover:opacity-70"
        >
          Logout
        </button>
      </div>
    </div>
  </aside>
);
