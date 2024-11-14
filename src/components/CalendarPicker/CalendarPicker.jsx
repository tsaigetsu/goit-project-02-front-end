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
  //
  console.log('selected', selected);
  console.log('formatDate', formatDate);
  console.log('isCalendarOpen', isCalendarOpen);
  console.log('toggleDateInput', toggleDateInput);

  return (
    <div className={css.datepickerBox}>
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
        <div className={css.datepickerWrapper}>
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
