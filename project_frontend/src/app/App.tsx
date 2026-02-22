
import { AppRoutes } from "@/app/routes/AppRoutes";
import { Toaster } from "react-hot-toast";
import '../App.css';
import { useTokenExpiration } from "@/shared/hooks/useTokenExpiration";
import { useNotifications } from "@/features/notification/hooks/useNotications";


function App() {
  useTokenExpiration();
  useNotifications()
  return (
    <>
      <Toaster position="top-right" reverseOrder={false} />
      <AppRoutes />
    </>
  );
}

export default App;
