import { useState } from "react";

export type ProjectTab = "tasks" | "settings" | "calendar" | "analytics";

export const useProjectTabs = () => {
  const [activeTab, setActiveTab] = useState<ProjectTab>("tasks");

  const isTasks = activeTab === "tasks";
  const isSettings = activeTab === "settings";
  const isCalendar = activeTab === "calendar";
  const isAnalytics = activeTab === "analytics";

  return {
    activeTab,
    setActiveTab,

    isTasks,
    isSettings,
    isCalendar,
    isAnalytics,
  };
};
