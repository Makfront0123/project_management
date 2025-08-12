import { Navigate, Route, Routes } from "react-router";
import { useAuthStore } from "../stores/auth_store";
import MainLayout from "../components/MainLayout";
import { Loading } from "../components/Loading";
import LoginPage from "../pages/LoginPage";
import RegisterPage from "../pages/RegisterPage";
import DashboardPage from "../pages/DashboardPage";
import ProjectPage from "../pages/ProjectPage";
import CreateTeamPage from "../pages/CreateTeamPage";
import JoinTeamPage from "../pages/JoinTeamPage";
import TeamPage from "../pages/TeamPage";
import TeamRequestPage from "../pages/TeamRequestPage";
import TeamChatPage from "../pages/TeamChatPage";
import ProjectDetails from "../pages/ProjectDetails";
import TasksPage from "../pages/TasksPage";
import VerifyOtpPage from "../pages/VerifyOtpPage";
import ForgotPage from "../pages/ForgotPage";
import VerifyForgotPage from "../pages/VerifyForgotPage";
import { ResetPasswordPage } from "../pages/ResetPassword";

export function AppRoutes() {
  const { token, loading } = useAuthStore();

  if (loading) return <Loading />;

  return (
    <Routes>
      {!token ? (
        <>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/verify" element={<VerifyOtpPage />} />
          <Route path="/forgot" element={<ForgotPage />} />
          <Route path="/verify-forgot-otp" element={<VerifyForgotPage />} />
          <Route path="/reset-password" element={<ResetPasswordPage />} />
          <Route path="*" element={<Navigate to="/login" />} />
        </>
      ) : (
        <Route path="/*" element={<MainLayout />}>
          <Route path="dashboard" element={<DashboardPage />} />
          <Route path="projects" element={<ProjectPage />} />
          <Route path="create-team" element={<CreateTeamPage />} />
          <Route path="join-team" element={<JoinTeamPage />} />
          <Route path="team/:teamId" element={<TeamPage />} />
          <Route path="team/:teamId/requests" element={<TeamRequestPage />} />
          <Route path="team/:teamId/chat" element={<TeamChatPage />} />
          <Route path="tasks" element={<TasksPage />} />
          <Route path="team/:teamId/project/:projectId" element={<ProjectDetails />} />
          <Route index element={<Navigate to="/dashboard" />} />
          <Route path="*" element={<Navigate to="/dashboard" />} />
        </Route>
      )}
    </Routes>
  );
}
