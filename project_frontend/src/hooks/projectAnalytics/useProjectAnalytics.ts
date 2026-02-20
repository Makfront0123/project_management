import { useMemo } from "react";
import { useProjectStore } from "@/features/project/store/project_store";

export const useProjectAnalytics = () => {
  const { analytics, isLoadingAnalytics } = useProjectStore();

  const tasksByStatus = useMemo(() => {
    if (!analytics) return [];

    return [
      { name: "Completadas", value: analytics.completedTasks, fill: "#4ade80" },
      { name: "Pendientes", value: analytics.pendingTasks, fill: "#facc15" },
    ];
  }, [analytics]);

  if (!analytics) {
    return {
      loading: isLoadingAnalytics,
      stats: null,
      tasksByStatus: [],
      tasksOverTime: [],
    };
  }

  return {
    loading: isLoadingAnalytics,

    stats: {
      total: analytics.totalTasks,
      completed: analytics.completedTasks,
      pending: analytics.pendingTasks,
      members: analytics.membersCount,
      progress: analytics.progress,
    },

    tasksByStatus,

    tasksOverTime: analytics.tasksTimeline,
  };
};
