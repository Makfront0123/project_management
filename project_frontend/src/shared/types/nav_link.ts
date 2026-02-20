export interface NavLink {
    id: string;
    name: string;
    icon: string;
    path: string;
}

export const navLinks: NavLink[] = [
    {
        id: "projects",
        name: "Proyectos",
        icon: "📋",
        path: "/projects",
    },
    {
        id: "tasks",
        name: "Tareas",
        icon: "📝",
        path: "/tasks",
    },
    {
        id: "Chat",
        name: "Chat",
        icon: "💬",
        path: "/chat",
    }

];