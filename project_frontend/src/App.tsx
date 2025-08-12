import './App.css';
import { Toaster } from 'react-hot-toast';
import { useTokenExpiration } from './hooks/useTokenExpiration';
import { AppRoutes } from './routes/AppRoutes';
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
