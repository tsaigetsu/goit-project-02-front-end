import { Formik, Form, Field } from 'formik';
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
  // const [selectedDate, setSelectedDate] = useState(null);
  const dispatch = useDispatch();
  console.log('setIsOpen', setIsOpen);

  const valuesFields = {
    title: '',
    description: '',
    labelColor: '',
    deadline: null,
    priority: '',
  };

  const validateSchema = Yup.object({
    title: Yup.string().required('Required'),
    description: Yup.string(),
    labelColor: Yup.string().required('Required'),
    deadline: Yup.date().required('Required'),
    priority: Yup.string().required('Required'),
  });

  const setupDate = Date.now();

  const colorPriority = [
    { color: ' #8fa1d0', priority: 'low' },
    { color: '#E09CB5', priority: 'medium' },
    { color: '#BEDBB0', priority: 'high' },
    { color: 'rgba(255, 255, 255, 0.3)', priority: 'without priority' },
  ];
  // Функция для форматирования даты, которую будем использовать и в календаре, и в карточке
  const formatDate = date => {
    const options = {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
    };
    const today = new Date();
    const selected = new Date(date);
    if (
      selected.getDate() === today.getDate() &&
      selected.getMonth() === today.getMonth() &&
      selected.getFullYear() === today.getFullYear()
    ) {
      return `Today, ${selected.toLocaleDateString('en-US', options)}`;
    }
    return selected.toLocaleDateString('en-US', options);
  };
  const handleAdd = values => {
    const { title, description, deadline, priority } = values;

    console.log('values', values);
    const data = {
      title,
      description,
      deadline,
      priority,
      columnId,
    };
    dispatch(addCard(data));
    setIsOpen(false);
  };

  // Функция для переключения календаря
  const toggleDateInput = useCallback(() => {
    setIsCalendarOpen(prev => !prev);
  }, []);
  // Функция для обработки изменения даты

  useEffect(() => {
    const handleEscape = event => {
      if (event.key === 'Escape') {
        setIsOpen(false); // Вызываем функцию закрытия модалки
      }
    };

    // Подписываемся на событие `keydown` при монтировании компонента
    document.addEventListener('keydown', handleEscape);

    // Очищаем подписку при размонтировании компонента
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
                </div>
                <div className={s.inputWrapper}>
                  <Field
                    as="textarea"
                    name="description"
                    placeholder="Description"
                    className={s.textareaDesk}
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
                            values.labelColor === color ? s.active : ''
                          }`}
                          style={{ backgroundColor: color }}
                          onClick={() => {
                            console.log('Color:', color);
                            console.log('Priority:', priority);
                            setFieldValue('labelColor', color);
                            setFieldValue('priority', priority);
                          }}
                        />
                      ))}
                    </div>
                  </div>
                  <div className={s.deadlineWrapper}>
                    <label htmlFor="deadline" className={s}>
                      Deadline
                    </label>

                    <div className={s.CalendarPicker} onClick={toggleDateInput}>
                      <CalendarPicker
                        selected={values.deadline}
                        onChange={date => {
                          setFieldValue('deadline', date);
                          setIsCalendarOpen(false);
                        }}
                        formatDate={formatDate}
                        minDate={setupDate}
                        toggleDateInput={toggleDateInput}
                        onFocus={e => e.target.blur()}
                        onKeyDown={e => e.preventDefault()}
                        calendarClassName={s.dateDisplayCalendar}
                        isCalendarOpen={isCalendarOpen}
                        placeholderText="Select Date"
                        open={isCalendarOpen}
                        // showPopperArrow={false}
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
