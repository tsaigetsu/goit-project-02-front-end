import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const CalendarPicker = ({
  selected,
  onChange,
  isCalendarOpen,
  toggleDateInput,
  formatDate,
  calendarClassName,
}) => {
  // //
  // console.log("selected", selected);
  // console.log("formatDate", formatDate);
  // console.log("isCalendarOpen", isCalendarOpen);
  // console.log("toggleDateInput", toggleDateInput);

  return (
    <div>
      <div onClick={toggleDateInput} className={calendarClassName}>
        {selected ? formatDate(selected) : "Select a date"}
      </div>
      {isCalendarOpen && (
        <DatePicker
          formatDate={formatDate}
          selected={selected}
          onChange={(date) => {
            onChange(date);
            toggleDateInput();
          }}
          minDate={new Date()}
          inline
        />
      )}
    </div>
  );
};

export default CalendarPicker;
