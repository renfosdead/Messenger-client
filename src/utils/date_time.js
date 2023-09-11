import moment from "moment";

const DATE_FORMAT = "DD.MM.YY H:mm:ss";

export const getDateFormatted = (value) => {
  if (!value) return "-";
  const result = moment(value);
  return result.format(DATE_FORMAT);
};
