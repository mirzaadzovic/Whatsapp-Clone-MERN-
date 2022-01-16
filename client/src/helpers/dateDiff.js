export default function dateDiff(d1, d2, options) {
  let date1 = new Date(d1);
  let date2 = new Date(d2);

  let differenceInTime = date2.getMilliseconds() - date1.getMilliseconds();
  console.log(date2.getMilliseconds(), date1.getMilliseconds());

  switch (options) {
    case "M":
      return differenceInTime / (1000 * 60);
    case "H":
      return differenceInTime / (1000 * 3600);
    case "h":
      return differenceInTime / (1000 * 3600);
    case "d":
      return differenceInTime / (1000 * 3600 * 24);
    case "D":
      return differenceInTime / (1000 * 3600 * 24);
  }
}
