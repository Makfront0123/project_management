const StatusBadge = ({ status }: { status: string }) => {

  const colors: Record<string, string> = {
    pending: "bg-yellow-100 text-yellow-700",
    completed: "bg-green-100 text-green-700",
  };

  return (
    <span
      className={`px-2 py-1 rounded text-xs ${
        colors[status] ?? "bg-gray-100 dark:bg-gray-800"
      }`}
    >
      {status}
    </span>
  );
};

export default StatusBadge;