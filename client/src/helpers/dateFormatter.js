export default function dateFormatter(date) {
  date = new Date(date);
  let options = {
    weekday: "short",
    year: "numeric",
    month: "short",
    day: "numeric",
  };
  return date.toLocaleDateString("en-US", options);
}
