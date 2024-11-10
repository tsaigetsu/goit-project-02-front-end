

import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import CalendarPicker from '../CalendarPicker/CalendarPicker';
import "react-datepicker/dist/react-datepicker.css"; //
import SvgIcon from "../SvgIcon/SvgIcon.jsx";
import { useDispatch } from "react-redux";
import { updateCard } from "../../redux/cards/operations.js";
import s from "./EditCardPopup.module.css";

const EditCardPopup = ({cardTask, closeModal, cardId }) => {

  const valuesFields = {
    title: cardTask.title,
    description: cardTask.description,
    labelColor: cardTask.labelColor,
    deadline: cardTask.deadline,
  };


  const validatSchema = Yup.object({
    title: Yup.string().required("Required"),
    description: Yup.string(),
    labelColor: Yup.string().required("Required"),
    deadline: Yup.date().required("Required"),
  });

  const setupDate = Date.now();

  const dispatch = useDispatch();

  const handleAdd = (values) => {
    const { title, description, deadline, priority } = values;
    const data = { title, description, deadline, priority };
    dispatch(updateCard ({ cardId, data }));
    closeModal();
  };

  const colorPriority = [
    { color: "#8FA1DO", priority: "Low" },
    { color: "#E09CB5", priority: "Medium" },
    { color: "#BEDBB0", priority: "High" },
    { color: "#1616164D", priority: "Without priority" },
  ];

    const formatDate = (date) => {
    const options = { month: 'long', day: 'numeric' };
    const today = new Date();
    const selectedDate = new Date(date);
    if (
      selectedDate.getDate() === today.getDate() &&
      selectedDate.getMonth() === today.getMonth() &&
      selectedDate.getFullYear() === today.getFullYear()
    ) {
      return `Today, ${selectedDate.toLocaleDateString('en-US', options)}`;
    }
    return selectedDate.toLocaleDateString('en-US', options);
  };

  return (
    <div
      className={s.popupOverlay}
      onClick={(e) => {
        if (e.target === e.currentTarget) closeModal();
      }}
    >
      <div className={s.popup}>
        <div className={s.popupContent}>
          <h2 className={s.TitleCard}>Edit card</h2>
          <button className={s.closeButton} onClick={closeModal}>
            <SvgIcon id="icon-close" className={s.svgCloseIcon} />
          </button>

          <Formik
            valuesFields={valuesFields}
            validatSchema={validatSchema}
            onSubmit={handleAdd}
          >
            {({ setFieldValue, values }) => (
              <Form className={s.formCard}>
                <div className={s.inputWrapper}>
                  <Field name="title" placeholder="Title" className={s.inputTitle} />
                </div>

                <div className={s.inputWrapper}>
                  <Field
                    as="textarea"
                    name="description"
                    placeholder="Description"
                    className={s.textareaDeskr}
                  />
                </div>

                <div className={s.inputWrapper}>
                <div className={s.inputWrapper}>
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

                </div>
                

                <div className={s.inputWrapper}>
                  <label htmlFor="deadline" className={s}>Deadline</label>
                  <div className={s.CalendarPicker}>
                    <CalendarPicker
                     selected={values.deadline}
                     onChange={(date) => setFieldValue("deadline", date)}
                     placeholderText="Select Date"
                     dateFormat={formatDate}
                     minDate={setupDate}
                     showPopperArrow={false}
                     onFocus={(e) => e.target.blur()}
                     onKeyDown={(e) => e.preventDefault()}
                     calendarClassName={s.dateDisplayCalendar}
                    /> 
                   <SvgIcon id="icon-chevron-down" className={s.iconChevronDown} width="14" height="14" />

                  </div>
                </div>

                <button type="submit" className={s.addButton} >
                <div className={s.btnDiv}>
                  <SvgIcon id="icon-plus" className={s.iconNormalBtnBlack} />
                </div> 
                <p className={s.btntext}>Edit</p>
                </button>
              </Form>
            )}
          </Formik>
        </div>
      </div>
    </div>
  );
};

export default  EditCardPopup;