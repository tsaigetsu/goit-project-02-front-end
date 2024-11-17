import DatePicker from 'react-datepicker';
import css from './CalendarPicker.module.css';

const CalendarPicker = ({
  selected,
  onChange,
  isCalendarOpen,
  toggleDateInput,
  formatDate,
  calendarClassName,
}) => {
  const displayDate =
    selected instanceof Date ? formatDate(selected) : 'Select a date';
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
            selected={selected instanceof Date ? selected : null}
            onChange={date => {
              if (date instanceof Date) {
                onChange(date);
              }
              toggleDateInput();
            }}
            formatDate={formatDate}
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
