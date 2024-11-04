
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

const CalendarPicker = ({ selectedDate, onDateChange, showDateInput, toggleDateInput, formatDate, calendarClassName }) => {
  return (
    <div>
      <div onClick={toggleDateInput} className={calendarClassName}>
        {selectedDate ? formatDate(selectedDate) : 'Select a date'}
      </div>
      {showDateInput && (
        <DatePicker
          selected={selectedDate}
          onChange={(date) => {
            onDateChange(date);
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