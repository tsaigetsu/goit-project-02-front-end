import { useState } from 'react';
import SvgIcon from "../SvgIcon/SvgIcon";
import s from "./AddCardPopup.module.css";

const AddCardPopup = ({ onClose, onAdd }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [labelColor, setLabelColor] = useState(''); 
  const [deadline, setDeadline] = useState('');
  const [showDateInput, setShowDateInput] = useState(false);

  const handleAdd = () => {
    const newCard = {
      title,
      description,
      labelColor,
      deadline,
    };
    onAdd(newCard);
    onClose();
  };

  const toggleDateInput = () => {
    setShowDateInput(!showDateInput);
  };

  const formatDate = (date) => {
    const options = { month: 'long', day: 'numeric' };
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
        <p className={s.labelTitle}>Add Card</p>
        <input
          className={s.inputTitle}
          type="text"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <textarea
          className={s.inputTitle}
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <div className={s.labelColor}>
          <p className={s.labelTitle}>Label color</p>
          <div>
            <label>
              <input
                type="radio"
                name="labelColor"
                value="violet"
                onChange={() => setLabelColor('violet')}
              />
              <span className={`${s.colorCircle} ${s.violet}`} />
            </label>
            <label>
              <input
                type="radio"
                name="labelColor"
                value="pink"
                onChange={() => setLabelColor('pink')}
              />
              <span className={`${s.colorCircle} ${s.pink}`} />
            </label>
            <label>
              <input
                type="radio"
                name="labelColor"
                value="green"
                onChange={() => setLabelColor('green')}
              />
              <span className={`${s.colorCircle} ${s.green}`} />
            </label>
            <label>
              <input
                type="radio"
                name="labelColor"
                value="black"
                onChange={() => setLabelColor('black')}
              />
              <span className={`${s.colorCircle} ${s.black}`} />
            </label>
          </div>
        </div>
        <div className={s.deadline}>
          <p className={s.deadlineLabel}>Deadline</p>
          <div onClick={toggleDateInput} className={s.dateDisplay}>
            {deadline ? formatDate(deadline) : 'Select a date'}
            <SvgIcon id="icon-arrow-circle-broken-right" className={s.dropdownIcon} width="14" height="14" />
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
        <button className={s.addButton} onClick={handleAdd}>
          <SvgIcon
            id="icon-normalBtnBlack"
            className={s.createIcon}
            width="28"
            height="28"
          />
          Add
        </button>
      </div>
    </div>
  );
};

export default AddCardPopup;