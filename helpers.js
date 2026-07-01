export function DateFormat(date) {
  return new Intl.DateTimeFormat("es", {
    dateStyle: "long",
    timeStyle: "short",
  }).format(date);
}
