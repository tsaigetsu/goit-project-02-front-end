import { useEffect, useState, useCallback } from "react";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import CalendarPicker from "../CalendarPicker/CalendarPicker";
import "react-datepicker/dist/react-datepicker.css"; //
import SvgIcon from "../SvgIcon/SvgIcon.jsx";
import { useDispatch } from "react-redux";
import { addCard } from "../../redux/cards/operations.js";
import s from "./AddCardPopup.module.css";
// import { useEffect, useState } from "react";

const AddCardPopup = ({ setIsOpen, columnId }) => {
  const [isCalendarOpen, setIsCalendarOpen] = useState(false);
  const dispatch = useDispatch();

  const valuesFields = {
    title: "",
    description: "",
    labelColor: "",
    deadline: null,
  };

  const validateSchema = Yup.object({
    title: Yup.string().required("Required"),
    description: Yup.string(),
    labelColor: Yup.string().required("Required"),
    deadline: Yup.date().required("Required"),
  });

  const setupDate = Date.now();

  const handleAdd = (values) => {
    const { title, description, deadline, priority } = values;
    const data = { title, description, deadline, priority, columnId: columnId };
    dispatch(addCard(data));
    setIsOpen(false);
  };

  const colorPriority = [
    { color: "#8FA1DO", priority: "low" },
    { color: "#E09CB5", priority: "medium" },
    { color: "#BEDBB0", priority: "high" },
    { color: "#1616164D", priority: "without priority" },
  ];

  const formatDate = (date) => {
    const options = {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    };
    const today = new Date();
    const selected = new Date(date);
    if (
      selected.getDate() === today.getDate() &&
      selected.getMonth() === today.getMonth() &&
      selected.getFullYear() === today.getFullYear()
    ) {
      return `Today, ${selected.toLocaleDateString("en-US", options)}`;
    }
    return selected.toLocaleDateString("en-US", options);
  };

   // Функция для переключения календаря
  const toggleDateInput = useCallback(() => {
    setIsCalendarOpen(true);
  }, []);

  useEffect(() => {
    const handleEscape = (event) => {
      if (event.key === "Escape") {
        setIsOpen(false); // Вызываем функцию закрытия модалки
      }
    };

    // Подписываемся на событие `keydown` при монтировании компонента
    document.addEventListener("keydown", handleEscape);

    // Очищаем подписку при размонтировании компонента
    return () => {
      document.removeEventListener("keydown", handleEscape);
    };
  }, [setIsOpen]);

  return (
    <div
      className={s.popupOverlay}
      onClick={(e) => {
        if (e.target === e.currentTarget) setIsOpen();
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
                            values.labelColor === color ? s.active : ""
                          }`}
                          style={{ backgroundColor: color }}
                          onClick={() => {
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

                    <div
                      className={s.CalendarPicker}
                      // onClick={() => {
                      //   setIsCalendarOpen(true);
                      // }}
                      onClick={toggleDateInput}
                    >
                      <CalendarPicker
                        // toggleDateInput={}
                        toggleDateInput={toggleDateInput}
                        isCalendarOpen={isCalendarOpen}
                        selected={values.deadline}
                        onChange={(date) => {
                          setFieldValue("deadline", date);
                          setIsCalendarOpen(false);
                        }}
                        placeholderText="Select Date"
                        formatDate={formatDate}
                        minDate={setupDate}
                        showPopperArrow={false}
                        onFocus={(e) => e.target.blur()}
                        onKeyDown={(e) => e.preventDefault()}
                        calendarClassName={s.dateDisplayCalendar}
                        open={isCalendarOpen}
                        onClickOutside={() => setIsCalendarOpen(false)}
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
                  <SvgIcon
                    id="icon-normalBtnBlack"
                    width="28"
                    height="28"
                    className={s.iconNormalBtnBlack}
                  />
                  Add
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
