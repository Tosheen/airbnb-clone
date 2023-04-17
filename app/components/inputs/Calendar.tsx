"use client";

import { DateRange, Range, RangeKeyDict } from "react-date-range";

import "react-date-range/dist/styles.css";

import "react-date-range/dist/theme/default.css";

type CalendarProps = {
  value: Range;
  onChange: (value: RangeKeyDict) => void;
  disabledDates?: Date[];
};

export const Calendar = (props: CalendarProps) => {
  return (
    <DateRange
      rangeColors={["#262626"]}
      ranges={[props.value]}
      date={new Date()}
      onChange={props.onChange}
      direction="vertical"
      minDate={new Date()}
      disabledDates={props.disabledDates}
    />
  );
};
