import dayjs from "dayjs";
import DateFormatConfig from "../../configs/DateFormatConfig";

export const parseDayjs = (date: string) => {
  return dayjs(date).format(DateFormatConfig.DATE);
  //   return dayjs(date).format(DateFormatConfig.DATE);
};
