import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import CalendarPicker from '../CalendarPicker/CalendarPicker';
import 'react-datepicker/dist/react-datepicker.css'; //
import SvgIcon from '../SvgIcon/SvgIcon.jsx';
import { useDispatch } from 'react-redux';
import { updateCard } from '../../redux/cards/operations.js';
import s from './EditCardPopup.module.css';
import { useCallback, useEffect, useState } from 'react';

const EditCardPopup = ({ card, setIsEdit }) => {
  const { _id, title, description, deadline, priority, columnId } = card;
  const [isCalendarOpen, setIsCalendarOpen] = useState(false);
  const [selectedDate, setSelectedDate] = useState(
    deadline ? new Date(deadline) : null
  );
  const dispatch = useDispatch();

  const valuesFields = {
    title: title || '',
    description: description || '',
    deadline: deadline ? new Date(deadline) : null,
    priority: priority || 'without priority',
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
    { color: 'rgba(255, 255, 255, 0.3)', priority: 'without priority' },
  ];

  const setupDate = Date.now();

  const formatDate = date => {
    if (!(date instanceof Date) || isNaN(date.getTime())) {
      return 'Invalid date';
    }

    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = String(date.getFullYear()).slice(-2);

    return `${day}/${month}/${year}`;
  };

  const handleEdit = values => {
    const { title, description, priority } = values;
    const data = {
      title,
      description,
      deadline: selectedDate ? selectedDate.toISOString() : null,
      priority,
      columnId,
    };

    dispatch(updateCard({ _id, data }));
    setIsEdit(false);
  };

  useEffect(() => {
    if (deadline && !selectedDate) {
      setSelectedDate(new Date(deadline));
    }
  }, [deadline, selectedDate]);

  const toggleDateInput = useCallback(() => {
    setIsCalendarOpen(!isCalendarOpen);
  });

  useEffect(() => {
    const handleEscape = event => {
      if (event.key === 'Escape') {
        setIsEdit(false);
      }
    };

    document.addEventListener('keydown', handleEscape);

    return () => {
      document.removeEventListener('keydown', handleEscape);
    };
  }, [setIsEdit]);

  return (
    <div
      className={s.popupOverlay}
      onClick={e => {
        if (e.target === e.currentTarget) setIsEdit(false);
      }}
    >
      <div className={s.popup}>
        <div className={s.popupContent}>
          <h2 className={s.TitleCard}>Edit card</h2>
          <button
            className={s.closeButton}
            onClick={() => {
              setIsEdit(false);
            }}
          >
            <SvgIcon id="icon-x-close" width="18" height="18" />
          </button>

          <Formik
            initialValues={valuesFields}
            validationSchema={validateSchema}
            onSubmit={handleEdit}
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
                          className={`${s.colorCircle} ${
                            values.priority === priority ? s.active : ''
                          }`}
                          style={{ backgroundColor: color }}
                          onClick={() => {
                            // console.log("Color:", color);
                            // console.log("Priority:", priority);
                            setFieldValue('labelColor', color);
                            setFieldValue('priority', priority);
                            // setSelectedPriority(priority);
                          }}
                        />
                      ))}
                    </div>
                    <ErrorMessage
                      name="priority"
                      component="span"
                      className={s.errorMessage}
                    />
                  </div>
                  <div className={s.deadlineWrapper}>
                    <label htmlFor="deadline" className={s.deadline}>
                      Deadline
                    </label>

                    <div className={s.CalendarPicker} onClick={toggleDateInput}>
                      <CalendarPicker
                        selected={
                          values.deadline ? new Date(values.deadline) : null
                        }
                        onChange={date => {
                          if (date instanceof Date && !isNaN(date.getTime())) {
                            setFieldValue('deadline', date);
                            setSelectedDate(date);
                          }

                          setIsCalendarOpen(false);
                        }}
                        formatDate={formatDate}
                        minDate={setupDate}
                        toggleDateInput={toggleDateInput}
                        calendarClassName={s.dateDisplayCalendar}
                        isCalendarOpen={isCalendarOpen}
                      />
                      <SvgIcon
                        id="icon-chevron-down"
                        className={s.iconChevronDown}
                        width="14"
                        height="14"
                      />
                      <ErrorMessage
                        name="deadline"
                        component="span"
                        className={s.errorMessage}
                      />
                    </div>
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

export default EditCardPopup;
