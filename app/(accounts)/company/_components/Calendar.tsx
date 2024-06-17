import { useState } from "react";
import {
  format,
  startOfMonth,
  endOfMonth,
  eachDayOfInterval,
  isSameMonth,
  isSameDay,
  addMonths,
  subMonths,
  differenceInCalendarDays,
} from "date-fns";
import { Toaster, toast } from "sonner";
import { useDateRangeStore } from "@/lib/store/DateRangeStore";

type CalendarProps = {
  startDate: Date | null;
  setStartDate: React.Dispatch<React.SetStateAction<Date | null>>;
  endDate: Date | null;
  setEndDate: React.Dispatch<React.SetStateAction<Date | null>>;
};

const Calendar = ({
  startDate,
  setStartDate,
  endDate,
  setEndDate,
}: CalendarProps) => {
  const [currentMonth, setCurrentMonth] = useState(new Date());

  const handleDateSelect = (date: Date) => {
    // If there is no start date or an end date is already selected, set the new date as the start date.
    if (!startDate || endDate) {
      setStartDate(date);
      useDateRangeStore.setState({
        startDate: date,
      });
      setEndDate(null);
      useDateRangeStore.setState({
        endDate: null,
      });
    } else {
      // Calculate the difference in days between the start date and the selected date.
      const dayDifference = differenceInCalendarDays(date, startDate);

      // Check if the difference is at least 7 days.
      if (dayDifference >= 7) {
        setEndDate(date);
        useDateRangeStore.setState({
          endDate: date,
        });
      } else {
        // If the range is less than 7 days, prompt the user or handle as needed.
        toast.error("Please select a range of at least 7 days.");
      }
    }
  };

  // Save date range in local storage
  localStorage.setItem(
    "DateRange",
    JSON.stringify(
      startDate &&
        endDate &&
        `${format(startDate, "MMMM d")} - ${format(endDate, "MMMM d")}`
    )
  );

  const nextMonth = () => {
    setCurrentMonth(addMonths(currentMonth, 1));
  };

  const prevMonth = () => {
    setCurrentMonth(subMonths(currentMonth, 1));
  };

  const daysInMonth = eachDayOfInterval({
    start: startOfMonth(currentMonth),
    end: endOfMonth(currentMonth),
  });

  return (
    <div className="w-full bg-white drop-shadow-2xl p-4">
      <Toaster richColors />
      <div className="flex justify-between items-center mb-4">
        <button onClick={prevMonth} className="p-2 border">
          Prev
        </button>
        <span>{format(currentMonth, "MMMM yyyy")}</span>
        <button onClick={nextMonth} className="p-2 border">
          Next
        </button>
      </div>
      <div className="grid grid-cols-7 gap-4">
        {daysInMonth.map((day, index) => (
          <button
            key={index}
            onClick={() => handleDateSelect(day)}
            className={`flex items-center justify-center py-2 px-4 border text-sm ${
              !isSameMonth(day, currentMonth) ? "text-gray-500" : ""
            } ${
              (startDate && isSameDay(day, startDate)) ||
              (endDate && isSameDay(day, endDate))
                ? "bg-primary text-white"
                : ""
            }`}
          >
            {format(day, "d")}
          </button>
        ))}
      </div>
    </div>
  );
};

export default Calendar;
