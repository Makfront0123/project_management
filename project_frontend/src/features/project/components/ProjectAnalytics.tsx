"use client";

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
  Cell,
} from "recharts";

import { useProjectAnalytics } from "@/features/project/hooks/useProjectAnalytics";
import { useProjectStore } from "@/features/project/store/project_store";
import { useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/shared/components/ui/card";



type StatCardProps = {
  title: string;
  value: string | number;
};

const StatCard = ({ title, value }: StatCardProps) => {
  return (
    <Card>
      <CardContent className="p-5">
        <p className="text-sm text-muted-foreground">{title}</p>
        <div className="mt-2 text-3xl font-bold tracking-tight">
          {value}
        </div>
      </CardContent>
    </Card>
  );
};

const CustomTooltip = ({ active, payload, label }: any) => {
  if (!active || !payload?.length) return null;

  return (
    <div className="rounded-lg border bg-background p-3 shadow-md">
      <p className="text-sm font-medium">{label}</p>
      <p className="text-sm text-muted-foreground">
        {payload[0].value} tasks
      </p>
    </div>
  );
};

const ProjectAnalytics = () => {
  const { stats, tasksByStatus, tasksOverTime } = useProjectAnalytics();
  const { currentProject, getProjectAnalytics } = useProjectStore();

  console.log("tasksOverTime", tasksOverTime);

  useEffect(() => {
    if (currentProject?._id && currentProject?.teamId) {
      getProjectAnalytics(currentProject.teamId, currentProject._id);
    }
  }, [currentProject, getProjectAnalytics]);

  if (!stats) {
    return (
      <p className="text-center text-muted-foreground">
        No hay datos disponibles
      </p>
    );
  }


  return (
    <div className="space-y-8">
      <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard title="Total Tasks" value={stats.total} />
        <StatCard title="Completed Tasks" value={stats.completed} />
        <StatCard title="Pending Tasks" value={stats.pending} />
        <StatCard title="Progress" value={`${stats.progress}%`} />
      </section>

      <div className="grid gap-6 lg:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Tasks Over Time</CardTitle>
          </CardHeader>

          <CardContent className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart
                data={tasksOverTime}
                margin={{ top: 10, right: 20, left: 0, bottom: 10 }}
              >
                <CartesianGrid
                  stroke="hsl(var(--muted))"
                  strokeDasharray="3 3"
                />

                <XAxis
                  dataKey="date"
                  tick={{ fill: "hsl(var(--muted-foreground))", fontSize: 12 }}
                />

                <YAxis
                  allowDecimals={false}
                  tick={{ fill: "hsl(var(--muted-foreground))", fontSize: 12 }}
                />

                <Tooltip content={<CustomTooltip />} />

                <Line
                  type="monotone"
                  dataKey="count"
                  stroke="#3b82f6"
                  strokeWidth={2}
                  dot={false}
                />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Tasks Status</CardTitle>
          </CardHeader>

          <CardContent className="h-[300px] flex flex-col">
            <div className="flex-1">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={tasksByStatus}
                    dataKey="value"
                    nameKey="name"
                    innerRadius={70}
                    outerRadius={100}
                    paddingAngle={4}
                    stroke="none"
                  >
                    {tasksByStatus.map((entry, index) => (
                      <Cell
                        key={`cell-${index}`}
                        fill={entry.fill}
                      />
                    ))}
                  </Pie>

                  <Tooltip content={<CustomTooltip />} />
                </PieChart>
              </ResponsiveContainer>
            </div>

            <div className="mt-4 space-y-2">
              {tasksByStatus.map((item) => (
                <div
                  key={item.name}
                  className="flex items-center justify-between text-sm"
                >
                  <div className="flex items-center gap-2">
                    <span
                      className="h-3 w-3 rounded-full"
                      style={{ backgroundColor: item.fill }}
                    />
                    <span className="text-muted-foreground">
                      {item.name}
                    </span>
                  </div>

                  <span className="font-medium">
                    {item.value}
                  </span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default ProjectAnalytics;