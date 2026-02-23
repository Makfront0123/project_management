
import { AppRoutes } from "@/app/routes/AppRoutes";
import { Toaster } from "react-hot-toast";
import '../App.css';
import { useTokenExpiration } from "@/shared/hooks/useTokenExpiration";
import { useNotifications } from "@/features/notification/hooks/useNotications";
import { ThemeProvider } from "@/shared/providers/ThemeProvider";


function App() {
  useTokenExpiration();
  useNotifications()
  return (
    <ThemeProvider>
      <div className="">
        <Toaster />
        <AppRoutes />
      </div>
    </ThemeProvider>
  );
}

export default App;
