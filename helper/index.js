import dayjs from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat";
import relativeTime from "dayjs/plugin/relativeTime";
import advancedFormat from "dayjs/plugin/advancedFormat";
import utc from "dayjs/plugin/utc";
import isSameOrAfter from "dayjs/plugin/isSameOrAfter";
import isSameOrBefore from "dayjs/plugin/isSameOrBefore";
dayjs.extend(customParseFormat);
dayjs.extend(relativeTime);
dayjs.extend(advancedFormat);
dayjs.extend(utc);
dayjs.extend(isSameOrAfter);
dayjs.extend(isSameOrBefore);

const dayJsMod = (date, format, strict) => {
  if (!date || typeof date === "undefined") {
    return dayjs();
  } else {
    const stringifyDate = date.toString();
    if (!format || typeof format === "undefined") {
      return dayjs(stringifyDate);
    }

    if (typeof strict === "boolean") {
      return dayjs(stringifyDate, format, strict);
    } else {
      return dayjs(stringifyDate, format);
    }
  }
};

export { dayJsMod };