import {
  PieChart,
  Pie,
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";

import { useProjectAnalytics } from "@/hooks/projectAnalytics/useProjectAnalytics";
import { useProjectStore } from "@/stores/project_store";
import { useEffect } from "react";

type StatCardProps = {
  title: string;
  value: string | number;
};

const StatCard = ({ title, value }: StatCardProps) => {
  return (
    <div className="rounded-xl bg-white p-4 shadow-sm border">
      <p className="text-sm text-gray-500">{title}</p>

      <h3 className="mt-2 text-2xl font-semibold text-gray-900">
        {value}
      </h3>
    </div>
  );
};

const ProjectAnalytics = () => {
  const { stats, tasksByStatus, tasksOverTime } = useProjectAnalytics();
  const { currentProject, getProjectAnalytics } = useProjectStore();

  useEffect(() => {
    if (currentProject?._id && currentProject?.teamId) {
      getProjectAnalytics(currentProject.teamId, currentProject._id);
    }
  }, [currentProject, getProjectAnalytics]);
  if (!stats) {
    return (
      <p className="text-center text-gray-500">
        No hay datos disponibles
      </p>
    );
  }



  return (
    <div className="space-y-6">
      <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">

        <StatCard
          title="Total Tasks"
          value={stats.total}
        />

        <StatCard
          title="Completed Tasks"
          value={stats.completed}
        />

        <StatCard
          title="Pending Tasks"
          value={stats.pending}
        />

        <StatCard
          title="Progress"
          value={`${stats.progress}%`}
        />

      </section>

      <div className="h-72 rounded-xl bg-white p-4 shadow-sm border">
        <h3 className="mb-3 font-medium text-gray-700">
          Tasks Over Time
        </h3>

        <ResponsiveContainer width="100%" height="100%">
          <LineChart
            data={tasksOverTime}
            margin={{ top: 10, right: 20, left: 0, bottom: 10 }}
          >
            <CartesianGrid strokeDasharray="3 3" />

            <XAxis dataKey="date" />
            <YAxis allowDecimals={false} />

            <Tooltip />

            <Line
              type="monotone"
              dataKey="count"
              strokeWidth={2}
              dot={false}
            />
          </LineChart>
        </ResponsiveContainer>

      </div>
      <div className="h-72 rounded-xl bg-white p-4 shadow-sm border">

        <h3 className="mb-3 font-medium text-gray-700">
          Tasks Status
        </h3>

        <ResponsiveContainer width="100%" height="100%">
          <PieChart>

            <Pie
              data={tasksByStatus}
              dataKey="value"
              nameKey="name"
              cx="50%"
              cy="50%"
              outerRadius={90}
              label
            />

            <Tooltip />

          </PieChart>
        </ResponsiveContainer>

      </div>

    </div>
  );
};

export default ProjectAnalytics;
