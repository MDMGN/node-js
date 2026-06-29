export function DateFormat(date) {
  return new Intl.DateTimeFormat("es", {
    dateStyle: "medium",
  }).format(date);
}
