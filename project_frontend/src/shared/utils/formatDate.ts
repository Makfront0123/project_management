export const formatDateNumeric = (dateString: string): string => {
  const date = new Date(dateString);


  return date.toLocaleString("es-CO", {
    dateStyle: "short",
    timeStyle: "short",
  });
};


export function formatDateShort(dateString: string) {
  const date = new Date(dateString);

  return new Intl.DateTimeFormat("en-US", {
    month: "short",
    day: "2-digit",
    year: "numeric"
  }).format(date);
}

export function formatDateWithTime(dateString: string) {
  const date = new Date(dateString);

  return new Intl.DateTimeFormat("en-US", {
    month: "short",
    day: "2-digit",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit"
  }).format(date);
}