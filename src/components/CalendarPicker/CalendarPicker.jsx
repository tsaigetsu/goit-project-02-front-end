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
  //
  console.log("toggleDateInput", toggleDateInput);

  return (
    <div>
      <div onClick={toggleDateInput} className={calendarClassName}>
        {selected ? formatDate(selected) : "Select a date"}
      </div>
      {isCalendarOpen && (
        <DatePicker
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
