import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import css from './CalendarPicker.module.css';

const CalendarPicker = ({
  selected,
  onChange,
  isCalendarOpen,
  toggleDateInput,
  formatDate,
  calendarClassName,
}) => {
  return (
    <div className={css.datePickerBox}>
      <div
        onClick={e => {
          e.stopPropagation();
          toggleDateInput();
        }}
        className={calendarClassName}
      >
        {selected ? formatDate(selected) : 'Select a date'}
      </div>
      {isCalendarOpen && (
        <div className={css.datePickerWrapper}>
          <DatePicker
            formatDate={formatDate}
            selected={selected}
            onChange={date => {
              onChange(date);
              toggleDateInput();
            }}
            minDate={new Date()}
            onClickOutside={toggleDateInput}
            inline
          />
        </div>
      )}
    </div>
  );
};

export default CalendarPicker;
