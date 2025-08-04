import { Navigate, Route } from "react-router";
import MainLayout from "../components/MainLayout";
import CreateTeamPage from "../pages/CreateTeamPage";
import DashboardPage from "../pages/DashboardPage";
import JoinTeamPage from "../pages/JoinTeamPage";
import ProjectDetails from "../pages/ProjectDetails";
import ProjectPage from "../pages/ProjectPage";
import TasksPage from "../pages/TasksPage";
import TeamChatPage from "../pages/TeamChatPage";
import TeamPage from "../pages/TeamPage";
import TeamRequestPage from "../pages/TeamRequestPage";



export const PrivateRoutes = (
    <Route path="/*" element={<MainLayout />}>
        <Route path="dashboard" element={<DashboardPage />} />
        <Route path="projects" element={<ProjectPage />} />
        <Route path="project" element={<ProjectPage />} />
        <Route path="team/:teamId" element={<TeamPage />} />
        <Route path="team/:teamId/requests" element={<TeamRequestPage />} />
        <Route path="team/:teamId/chat" element={<TeamChatPage />} />
        <Route path="team/:teamId/project/:projectId" element={<ProjectDetails />} />
        <Route path="create-team" element={<CreateTeamPage />} />
        <Route path="join-team" element={<JoinTeamPage />} />
        <Route path="tasks" element={<TasksPage />} />
        <Route index element={<Navigate to="/dashboard" />} />
        <Route path="*" element={<Navigate to="/dashboard" />} />
    </Route>
);
