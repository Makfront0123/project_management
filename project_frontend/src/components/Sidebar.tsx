import { NavLink } from "react-router";

import { icons } from "../core/icons";
import { navLinks } from "@/data/navLinks";




export const Sidebar = () => (
  <aside className="min-w-[250px] min-h-screen p-0 border-r-2 border-gray-200 text-white">
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