import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import CalendarPicker from '../CalendarPicker/CalendarPicker';
import 'react-datepicker/dist/react-datepicker.css'; //
import SvgIcon from '../SvgIcon/SvgIcon.jsx';
import { useDispatch } from 'react-redux';
import { addCard } from '../../redux/cards/operations.js';
import s from './AddCardPopup.module.css';
import { useCallback, useEffect, useState } from 'react';

const AddCardPopup = ({ setIsOpen, columnId }) => {
  const [isCalendarOpen, setIsCalendarOpen] = useState(false);
  const [selectedDate, setSelectedDate] = useState(null);
  const dispatch = useDispatch();

  const valuesFields = {
    title: '',
    description: '',
    deadline: new Date(),
    priority: 'without priority',
  };

  const validateSchema = Yup.object({
    title: Yup.string()
      .required('Title is required')
      .min(2, 'Title must be at least 2 characters')
      .max(32, 'Title cannot exceed 32 characters'),
    description: Yup.string()
      .required('Description is required')
      .min(2, 'Description must be at least 2 characters')
      .max(300, 'Description cannot exceed 300 characters'),
    deadline: Yup.date().required('Deadline is required'),
  });

  const colorPriority = [
    { color: ' #8fa1d0', priority: 'low' },
    { color: '#E09CB5', priority: 'medium' },
    { color: '#BEDBB0', priority: 'high' },
    { color: '#B7B7B7', priority: 'without priority' },
  ];

  const setupDate = Date.now();

  const formatDate = date => {
    if (!(date instanceof Date)) {
      return 'Invalid date';
    }

    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = String(date.getFullYear()).slice(-2);

    return `${day}/${month}/${year}`;
  };

  const handleAdd = values => {
    const { title, description, priority } = values;
    const data = {
      title,
      description,
      deadline: selectedDate || new Date(),
      priority,
      columnId,
    };

    dispatch(addCard(data));
    setIsOpen(false);
  };

  const toggleDateInput = useCallback(() => {
    setIsCalendarOpen(!isCalendarOpen);
  }, [isCalendarOpen]);

  useEffect(() => {
    const handleEscape = event => {
      if (event.key === 'Escape') {
        setIsOpen(false);
      }
    };

    document.addEventListener('keydown', handleEscape);

    return () => {
      document.removeEventListener('keydown', handleEscape);
    };
  }, [setIsOpen]);

  return (
    <div
      className={s.popupOverlay}
      onClick={e => {
        if (e.target === e.currentTarget) setIsOpen(false);
      }}
    >
      <div className={s.popup}>
        <div className={s.popupContent}>
          <h2 className={s.titleCard}>Add card</h2>
          <button
            className={s.closeButton}
            onClick={() => {
              setIsOpen(false);
            }}
          >
            <SvgIcon id="icon-x-close" width="18" height="18" />
          </button>

          <Formik
            initialValues={valuesFields}
            validationSchema={validateSchema}
            onSubmit={handleAdd}
          >
            {({ setFieldValue, values }) => (
              <Form className={s.formCard}>
                <div className={s.inputWrapper}>
                  <Field
                    name="title"
                    placeholder="Title"
                    className={s.inputTitle}
                    autoFocus
                  />
                  <ErrorMessage
                    name="title"
                    component="span"
                    className={s.errorMessage}
                  />
                </div>

                <div className={s.inputWrapper}>
                  <Field
                    as="textarea"
                    name="description"
                    placeholder="Description"
                    className={s.textareaDesk}
                  />
                  <ErrorMessage
                    name="description"
                    component="span"
                    className={s.errorMessageTextarea}
                  />
                </div>
                <div className={s.box}>
                  <div className={s.labelColor}>
                    <label className={s.labelTitle}>Label color</label>
                    <div className={s.labelColors}>
                      {colorPriority.map(({ color, priority }) => (
                        <button
                          key={color}
                          type="button"
                          title={priority}
                          className={`${s.colorCircle} ${
                            values.priority === priority ? s.active : ''
                          }`}
                          style={{ backgroundColor: color }}
                          onClick={() => {
                            setFieldValue('labelColor', color);
                            setFieldValue('priority', priority);
                          }}
                        />
                      ))}
                    </div>
                    <ErrorMessage
                      name="priority"
                      component="div"
                      className={s.errorMessage}
                    />
                  </div>
                  <div className={s.deadlineWrapper}>
                    <label htmlFor="deadline" className={s.deadline}>
                      Deadline
                    </label>

                    <div className={s.CalendarPicker} onClick={toggleDateInput}>
                      <CalendarPicker
                        selected={values.deadline}
                        onChange={date => {
                          if (date instanceof Date) {
                            setFieldValue('deadline', date);
                            setSelectedDate(date);
                          }

                          setIsCalendarOpen(false);
                        }}
                        formatDate={formatDate}
                        minDate={setupDate}
                        toggleDateInput={toggleDateInput}
                        showPopperArrow={false}
                        onFocus={e => e.target.blur()}
                        onKeyDown={e => e.preventDefault()}
                        calendarClassName={s.dateDisplayCalendar}
                        isCalendarOpen={isCalendarOpen}
                        placeholderText="Select Date"
                        open={isCalendarOpen}
                        // onClickOutside={() => setIsCalendarOpen(false)}
                        // setIsCalendarOpen={setIsCalendarOpen}
                      />
                      <SvgIcon
                        id="icon-chevron-down"
                        className={s.iconChevronDown}
                        width="14"
                        height="14"
                      />
                    </div>
                    <ErrorMessage
                      name="deadline"
                      component="span"
                      className={s.errorMessageDeadline}
                    />
                  </div>
                </div>

                <button type="submit" className={s.addButton}>
                  <div className={s.btnDiv}>
                    <SvgIcon
                      id="icon-normalBtnBlack"
                      width="28"
                      height="28"
                      className={s.iconNormalBtnBlack}
                    />
                  </div>
                  <p className={s.btnText}>Add</p>
                </button>
              </Form>
            )}
          </Formik>
        </div>
      </div>
    </div>
  );
};

export default AddCardPopup;
