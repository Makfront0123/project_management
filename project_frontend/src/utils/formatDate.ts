export const formatDate = (dateString: string): string => {
  const date = new Date(dateString);

 
  return date.toLocaleString("es-CO", {
    dateStyle: "short",
    timeStyle: "short",
  });
};
