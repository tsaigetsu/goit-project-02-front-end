/* eslint-disable react/prop-types */
import { useState } from 'react';
import s from "./AddCardPopup.module.css";

const AddCardPopup = ({ onClose, onAdd }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [labelColor, setLabelColor] = useState(''); 
  const [deadline, setDeadline] = useState('');

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

  return (
    <div className={s.popup}>
      <div className={s.popupContent}>
        <button className={s.closeButton} onClick={onClose}>×</button>
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
          <input
            type="date"
            value={deadline}
            onChange={(e) => setDeadline(e.target.value)}
          />
        </div>
        <button className={s.addButton} onClick={handleAdd}>Add</button>
      </div>
    </div>
  );
};

export default AddCardPopup;