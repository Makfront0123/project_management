import { Navigate, Route, Routes } from 'react-router';
import './App.css'
import { useAuthStore } from './stores/auth_store';
import LoginPage from './pages/LoginPage';
import MainLayout from './components/MainLayout';
import DashboardPage from './pages/DashboardPage';
import ProjectPage from './pages/ProjectPage';

function App() {
  const { token, loading } = useAuthStore()
  console.log(token, loading)
  

  if (loading) return <div>Loading...</div>

  return (
    <Routes>
      {!token ? (
        <Route path="*" element={<LoginPage />} />
      ) : (
        <Route path="/*" element={<MainLayout />}>
          <Route path="dashboard" element={<DashboardPage />} />
          <Route path="projects" element={<ProjectPage />} />
          <Route index element={<Navigate to="/dashboard" />} />
        </Route>
      )}
    </Routes>
  )
}

export default App
