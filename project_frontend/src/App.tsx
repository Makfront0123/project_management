import { Navigate, Route, Routes } from 'react-router';
import './App.css'
import { useAuthStore } from './stores/auth_store';
import LoginPage from './pages/LoginPage';
import MainLayout from './components/MainLayout';
import DashboardPage from './pages/DashboardPage';
import ProjectPage from './pages/ProjectPage';
import { Toaster } from 'react-hot-toast'
import { Loading } from './components/Loading';
import RegisterPage from './pages/RegisterPage';
import CreateTeamPage from './pages/CreateTeamPage';
import JoinTeamPage from './pages/JoinTeamPage';
import TeamPage from './pages/TeamPage';
 
import { useEffect } from 'react';
import ProjectDetails from './pages/ProjectDetails';
import TeamRequestPage from './pages/TeamRequestPage';

function App() {
  const { token, loading, checkTokenExpiration } = useAuthStore()
  console.log(token, loading)

  useEffect(() => {
    checkTokenExpiration()
  }, [checkTokenExpiration])

  if (loading) return <Loading />

  return (
    <>
      <Toaster position="top-right" reverseOrder={false} />
      <Routes>
        {!token ? (
          <>
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
            <Route path="*" element={<Navigate to="/login" />} />
          </>
        ) : (
          <Route path="/*" element={<MainLayout />}>
            <Route path="dashboard" element={<DashboardPage />} />
            <Route path="projects" element={<ProjectPage />} />
            <Route path="team/:teamId/requests" element={<TeamRequestPage />} />
            <Route path="create-team" element={<CreateTeamPage />} />
            <Route path="join-team" element={<JoinTeamPage />} />
            <Route path="team/:teamId" element={<TeamPage />} />
            <Route path="team/:teamId/project/:projectId" element={<ProjectDetails />} />
            <Route index element={<Navigate to="/dashboard" />} />
            <Route path="*" element={<Navigate to="/dashboard" />} />
          </Route>
        )}
      </Routes>
    </>
  )
}


export default App
