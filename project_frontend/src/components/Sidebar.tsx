import { NavLink } from "react-router";
import { navLinks } from "../data/navLinks";
import { icons } from "../core/icons";



export const Sidebar = () => (
  <aside className="min-w-[280px] min-h-screen p-0 border-r-2 border-gray-200 text-white">
    <div className="py-4 bg-white flex items-center border-b-2 border-gray-200 px-5">
      <img src={icons.logo} alt="Logo" className="size-8" />
      <h1 className="text-xl font-bold text-gray-900">
        Team Flow
      </h1>
    </div>
    <div className="flex flex-col items-start justify-center p-5 w-full gap-3">
      {
        navLinks.map((link) => (
          <NavLink key={link.name} to={link.path} className={({ isActive }) =>
            `flex items-center gap-x-2 w-full px-3 py-2 rounded-sm transition
    ${isActive
              ? "bg-gray-200 text-black"
              : "text-black hover:bg-gray-100"
            }`
          }>
            <img src={link.icon} alt={link.name} className="size-5" />
            <span>{link.name}</span>
          </NavLink>
        ))
      }
    </div>
  </aside>
);


/*
export const Sidebar = ({ user, logout }: { user: User | null; logout: () => void }) => (
  <aside className="min-w-[280px] min-h-screen bg-white border-r-2 border-gray-200 text-white">
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

*/