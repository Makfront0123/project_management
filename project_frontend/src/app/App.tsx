
import { AppRoutes } from "@/app/routes/AppRoutes";
import { Toaster } from "react-hot-toast";
import '../App.css';
import { useTokenExpiration } from "@/shared/hooks/useTokenExpiration";


function App() {
  useTokenExpiration();

  return (
    <>
      <Toaster position="top-right" reverseOrder={false} />
      <AppRoutes />
    </>
  );
}

export default App;
