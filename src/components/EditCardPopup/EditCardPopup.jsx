import { useState } from 'react';
import SvgIcon from '../SvgIcon/SvgIcon';
import s from "./EditCardPopup.module.css";

const EditCardPopup = ({ onClose, onEdit, card }) => {
  const [title, setTitle] = useState(card.title);
  const [description, setDescription] = useState(card.description);
  const [labelColor, setLabelColor] = useState(card.labelColor);
  const [deadline, setDeadline] = useState(card.deadline);
  const [showDateInput, setShowDateInput] = useState(false);

  // Функція для перемикання відображення поля вибору дати
  const toggleDateInput = () => {
    setShowDateInput(!showDateInput);
  };

  // Форматування дати для відображення
  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  const handleEdit = () => {
    const updatedCard = {
      ...card,
      title,
      description,
      labelColor,
      deadline,
    };
    onEdit(updatedCard);
    onClose();
  };

  return (
    <div className={s.popup}>
      <div className={s.popupContent}>
        <button className={s.closeButton} onClick={onClose}>
          <SvgIcon
            id="icon-x-close"
            className={s.svgCloseIcon}
            width="18"
            height="18"
          />
        </button>
        <p className={s.labelTitle}>Edit Card</p>
        <input
          className={s.inputTitle}
          type="text"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <textarea
          className={s.inputTitle}
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <div className={s.labelColor}>
          <p className={s.labelTitle}>Label color</p>
          <div>
            {['violet', 'pink', 'green', 'black'].map((color) => (
              <label key={color}>
                <input
                  type="radio"
                  name="labelColor"
                  value={color}
                  checked={labelColor === color}
                  onChange={() => setLabelColor(color)}
                />
                <span className={`${s.colorCircle} ${s[color]}`} />
              </label>
            ))}
          </div>
        </div>
        <div className={s.deadline}>
          <p className={s.deadlineLabel}>Deadline</p>
          <div onClick={toggleDateInput} className={s.dateDisplay}>
            {deadline ? formatDate(deadline) : 'Select a date'}
            <SvgIcon id="icon-dropdown" className={s.dropdownIcon} width="14" height="14" />
          </div>
          {showDateInput && (
           <input
           type="date"
           value={deadline}
           min={new Date().toISOString().split("T")[0]} // забороняє вибір минулих дат
           onChange={(e) => {
             setDeadline(e.target.value);
             setShowDateInput(false);
           }}
           className={s.dateInput}
         />
          )}
        </div>
        <button className={s.addButton} onClick={handleEdit}>
          <SvgIcon
            id="icon-normalBtnBlack"
            className={s.createIcon}
            width="28"
            height="28"
          />
          Edit
        </button>
      </div>
    </div>
  );
};

export default EditCardPopup;