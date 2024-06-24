export const actualDate = new Date();

export const currentDate: string = `${actualDate.getFullYear()}-${(
  actualDate.getMonth() + 1
)
  .toString()
  .padStart(2, "0")}-${actualDate.getDate().toString().padStart(2, "0")}`;

export const currentTime: string = `${actualDate
  .getHours()
  .toString()
  .padStart(2, "0")}:${actualDate.getMinutes().toString().padStart(2, "0")}`;
