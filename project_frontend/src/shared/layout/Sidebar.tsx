import { icons } from "@/shared/constants/icons";
import { navLinks } from "@/shared/constants/navLinks";
import { NavLink } from "react-router";



export const Sidebar = () => (
  <aside className="min-w-[250px] min-h-screen p-0 border-r-2 border-gray-200 dark:border-gray-900 shadow-lg text-white">
    <div className="py-4 bg-white dark:bg-black flex items-center border-b-2 border-gray-200 dark:border-none px-5">
      <img src={icons.logo} alt="Logo" className="size-8" />
      <h1 className="text-xl font-bold text-gray-900 dark:text-white">
        Team Flow
      </h1>
    </div>
    <div className="flex flex-col items-start justify-center p-5 w-full gap-3">
      {
        navLinks.map((link) => (
          <NavLink
            key={link.name}
            to={link.path}
            className={({ isActive }) =>
              `flex items-center gap-x-2 w-full px-3 py-2 rounded-sm transition
    ${isActive
                ? "bg-muted text-foreground"
                : "text-muted-foreground hover:bg-muted"
              }`
            }
          >
            {({ isActive }) => (
              <>
                <img src={link.icon} alt={link.name} className="size-5" />
                <span className={isActive ? "font-medium" : ""}>
                  {link.name}
                </span>
              </>
            )}
          </NavLink>
        ))
      }
    </div>
  </aside>
);