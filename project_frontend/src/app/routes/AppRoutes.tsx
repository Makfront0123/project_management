import { Navigate, Route, Routes } from "react-router";
import { useAuthStore } from "../../features/auth/store/auth_store";
import MainLayout from "../../shared/layout/MainLayout";
import { Loading } from "../../shared/components/Loading";
import LoginPage from "../../pages/LoginPage";
import RegisterPage from "../../pages/RegisterPage";
import DashboardPage from "../../pages/DashboardPage";
import ProjectPage from "../../pages/ProjectPage";
import CreateTeamPage from "../../pages/CreateTeamPage";
import JoinTeamPage from "../../pages/JoinTeamPage";
import TeamMembersPage from "../../pages/TeamMembersPage";
import TeamRequestPage from "../../pages/TeamRequestPage";
import TeamChatPage from "../../pages/TeamChatPage";
import ProjectDetails from "../../pages/ProjectDetails";
import TasksPage from "../../pages/TasksPage";
import ForgotPage from "../../pages/ForgotPage";
import { ResetPasswordPage } from "../../pages/ResetPassword";
import PublicPage from "../../pages/PublicPage";
import SettingsPage from "@/pages/SettingsPage";
import VerifyForgotPage from "@/features/auth/components/VerifyForgotPage";
import VerifyOtpPage from "@/features/auth/components/VerifyOtpPage";
import TeamPage from "@/pages/TeamPage";

export function AppRoutes() {
  const { token, loadingApp, } = useAuthStore();


  if (loadingApp) return <Loading />;


  return (
    <Routes>

      <Route path="/" element={<PublicPage />} />
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
          <Route path="team" element={<TeamPage />} />
          <Route path="team-members" element={<TeamMembersPage />} />
          <Route path="team/:teamId/requests" element={<TeamRequestPage />} />
          <Route path="team/:teamId/chat" element={<TeamChatPage />} />
          <Route path="tasks" element={<TasksPage />} />
          <Route path="settings" element={<SettingsPage />} />
          <Route path="team/:teamId/project/:projectId" element={<ProjectDetails />} />
          <Route index element={<Navigate to="/dashboard" />} />
          <Route path="*" element={<Navigate to="/dashboard" />} />
        </Route>
      )}
    </Routes>
  );
}
