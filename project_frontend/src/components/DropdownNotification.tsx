import { useState } from "react";
import { icons } from "../core/icons";
import useNotificationStore from "../stores/notification_store";

const NotificationDropdown = () => {
    const { notifications } = useNotificationStore();
    const [open, setOpen] = useState(false);

    

    return (
        <div className="relative">
            <button onClick={() => setOpen(!open)} className="relative flex items-center gap-x-2">
                {/* Contenedor del ícono de la campana con el contador */}
                <div className="relative">
                    <img src={icons.notification} className="size-4" alt="Notificaciones" />
                    
                </div>
                
                <span className="text-white uppercase">Notificaciones</span>
            </button>

            {open && (
                <div className="absolute right-0 mt-2 w-64 z-90 bg-white shadow-lg rounded-lg   max-h-80 overflow-y-auto">
                    {notifications.length === 0 ? (
                        <div className="p-4 text-gray-500 text-sm">Sin notificaciones</div>
                    ) : (
                        notifications.map((notif) => (
                            <div 
                                key={notif._id} 
                                className={`p-3 border-b border-gray-200 text-sm ${notif.read ? 'text-gray-500' : 'font-semibold text-gray-800'}`}
                            >
                                {notif.message}
                            </div>
                        ))
                    )}
                </div>
            )}
        </div>
    );
};

export default NotificationDropdown;