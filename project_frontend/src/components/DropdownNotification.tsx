import { useState } from "react";
import { icons } from "../core/icons";
import useNotificationStore from "../stores/notification_store";
import { useNavigate } from "react-router";
import type { NotificationType } from "../types/notification";


const NotificationDropdown = () => {
  const { notifications, isLoading, markNotificationAsRead } = useNotificationStore();
  const [open, setOpen] = useState(false);
  const [filter, setFilter] = useState<"unread" | "read">("unread");
  const navigate = useNavigate();

  const validNotifications = notifications ?? [];
  const unreadNotifications = validNotifications.filter((n) => !n.read);
  const readNotifications = validNotifications.filter((n) => n.read);

  const filteredList = filter === "unread" ? unreadNotifications : readNotifications;

  const handleNotificationClick = async (notif: NotificationType) => {
    const redirectUrl =
      notif.metadata?.redirectTo ||
      (notif.type === "join_request" && notif.metadata?.teamId
        ? `/team/${notif.metadata.teamId}/requests`
        : null);

    if (!notif.read) {
      await markNotificationAsRead(notif._id);
    }

    if (redirectUrl) {
      navigate(redirectUrl);
    }
  };

  return (
    <div className="relative">
      {/* Botón principal */}
      <button onClick={() => setOpen(!open)} className="relative flex items-center gap-x-2">
        <div className="relative">
          <img src={icons.notification} className="size-4" alt="Notificaciones" />
          {unreadNotifications.length > 0 && (
            <span className="absolute -top-1 -right-2 bg-red-600 z-80 text-white text-xs font-bold px-1 rounded-full animate-bounce">
              {unreadNotifications.length}
            </span>
          )}
        </div>
        <span className="text-white uppercase">Notifications</span>
      </button>

      {/* Dropdown */}
      {open && (
        <div className="absolute left-[110%] bottom-[10%] mt-2 w-64 z-90 bg-white shadow-lg rounded-lg max-h-80 flex flex-col">
          {/* Controles de filtro */}
          <div className="flex border-b border-gray-200">
            <button
              onClick={() => setFilter("unread")}
              className={`flex-1 py-2 text-sm font-semibold ${filter === "unread" ? "bg-gray-100 text-blue-600" : "text-gray-500"
                }`}
            >
              No leídas
            </button>
            <button
              onClick={() => setFilter("read")}
              className={`flex-1 py-2 text-sm font-semibold ${filter === "read" ? "bg-gray-100 text-blue-600" : "text-gray-500"
                }`}
            >
              Leídas
            </button>
          </div>


          <div className="overflow-y-auto max-h-72">
            {isLoading ? (
              <div className="p-4 text-gray-500 text-sm">Loading notifications...</div>
            ) : filteredList.length === 0 ? (
              <div className="p-4 text-gray-500 text-sm">
                {filter === "unread"
                  ? "No Have notifications"
                  : "No Have read notifications"}
              </div>
            ) : (
              filteredList.map((notif) => (
                <div
                  key={notif._id}
                  className={`p-3 border-b border-gray-200 text-sm cursor-pointer ${notif.read
                      ? "text-gray-500"
                      : "font-semibold text-gray-800 bg-gray-50 hover:bg-gray-100"
                    }`}
                  onClick={() => handleNotificationClick(notif)}
                >
                  {notif.message}
                </div>
              ))
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default NotificationDropdown;
