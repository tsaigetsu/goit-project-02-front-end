import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import CalendarPicker from "../CalendarPicker/CalendarPicker";
import "react-datepicker/dist/react-datepicker.css"; //
import SvgIcon from "../SvgIcon/SvgIcon.jsx";
import { useDispatch } from "react-redux";
import { updateCard } from "../../redux/cards/operations.js";
import s from "./EditCardPopup.module.css";
import { useCallback, useEffect, useState } from "react";

const EditCardPopup = ({ card, setIsEdit }) => {
  const { _id, title, description, deadline, priority, columnId } = card;
  const [isCalendarOpen, setIsCalendarOpen] = useState(false);
  const dispatch = useDispatch();

  const valuesFields = {
    title: title,
    description: description,
    // labelColor: "",
    deadline: deadline,
    priority: priority,
  };

  const validateSchema = Yup.object({
    title: Yup.string().min(3).max(32).required('Required'),
    description: Yup.string().min(3).max(300).required('Required'),
    labelColor: Yup.string().required('Required'),
    deadline: Yup.date().required('Required'),
    priority: Yup.string().required('Required'),
  });

  const setupDate = Date.now();

  const colorPriority = [
    { color: " #8fa1d0", priority: "low" },
    { color: "#E09CB5", priority: "medium" },
    { color: '#bedbb0', priority: 'high' },
    { color: '#ffffff4d', priority: 'without priority' },
  ];

  const formatDate = (date) => {
    const options = {day: '2-digit',
      month: 'long',  // Показує повну назву місяця
      year: 'numeric',};
    const today = new Date();
    const selectedDate = new Date(date);
    if (
      selectedDate.getDate() === today.getDate() &&
      selectedDate.getMonth() === today.getMonth() &&
      selectedDate.getFullYear() === today.getFullYear()
    ) {
      return `Today, ${selectedDate.toLocaleDateString("en-US", options)}`;
    }
    return selectedDate.toLocaleDateString("en-US", options);
  };


  const handleEdit = (values) => {
    const { title, description, deadline, priority } = values;
    const data = { title, description, deadline, priority, columnId };
    console.log("data", data);

    dispatch(updateCard({ _id, data }));
    setIsEdit(false);
  };
  // Функция для переключения календаря
  const toggleDateInput = useCallback(() => {
    setIsCalendarOpen(true);
  }, []);
  // Функция для обработки изменения даты

  useEffect(() => {
    const handleEscape = (event) => {
      if (event.key === "Escape") {
        setIsEdit(false); // Вызываем функцию закрытия модалки
      }
    };

    // Подписываемся на событие `keydown` при монтировании компонента
    document.addEventListener("keydown", handleEscape);

    // Очищаем подписку при размонтировании компонента
    return () => {
      document.removeEventListener("keydown", handleEscape);
    };
  }, [setIsEdit]);

  return (
    <div
      className={s.popupOverlay}
      onClick={(e) => {
        if (e.target === e.currentTarget) setIsEdit();
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
                            values.labelColor === color ? s.active : ""
                          }`}
                          style={{ backgroundColor: color }}
                          onClick={() => {
                            // console.log("Color:", color);
                            // console.log("Priority:", priority);
                            setFieldValue("labelColor", color);
                            setFieldValue("priority", priority);
                          }}
                        />
                      ))}
                    </div>
                  </div>
                  <div className={s.deadlineWrapper}>
                    <label htmlFor="deadline" className={s.labelTitle}>
                      Deadline
                    </label>

                    <div className={s.CalendarPicker} onClick={toggleDateInput}>
                      <CalendarPicker
                        selected={values.deadline}
                        onChange={(date) => {
                          setFieldValue("deadline", date);
                          setIsCalendarOpen(false);
                        }}
                        formatDate={formatDate}
                        minDate={setupDate}
                        toggleDateInput={toggleDateInput}
                        showPopperArrow={false}
                        onFocus={(e) => e.target.blur()}
                        onKeyDown={(e) => e.preventDefault()}
                        calendarClassName={s.dateDisplayCalendar}
                        isCalendarOpen={isCalendarOpen}
                        placeholderText="Select Date"
                        open={isCalendarOpen}
                        onClickOutside={() => setIsCalendarOpen(false)}
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

export default EditCardPopup;
