export function parseDate(date, withTime) {
  const dateObj = new Date(date),
    day = dateObj.getDate(),
    month = dateObj.getMonth(),
    year = dateObj.getFullYear(),
    hrs = ("0" + dateObj.getHours()).slice(-2),
    mins = ("0" + dateObj.getMinutes()).slice(-2),
    seconds = ("0" + dateObj.getSeconds()).slice(-2);

  return `${day}/${month + 1}/${year}${
    withTime ? `  ${hrs}:${mins}:${seconds}` : ""
  }`;
}
