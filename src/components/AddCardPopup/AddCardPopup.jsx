import { useState } from 'react';
import PropTypes from 'prop-types';
import css from "./AddCardPopup.module.css";

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
    <div className={css.popup}>
      <div className={css.popupContent}>
        <button className={css.closeButton} onClick={onClose}>×</button>
        <h2>Add Card</h2>
        <input
          className={css.inputTitle}
          type="text"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <textarea
          className={css.inputTitle}
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <div className={css.labelColor}>
          <p>Label color</p>
          <div>
            <label>
              <input
                type="radio"
                name="labelColor"
                value="pink"
                onChange={() => setLabelColor('pink')}
              />
              <span className={`${css.colorCircle} ${css.pink}`} />
            </label>
            <label>
              <input
                type="radio"
                name="labelColor"
                value="green"
                onChange={() => setLabelColor('green')}
              />
              <span className={`${css.colorCircle} ${css.green}`} />
            </label>
            <label>
              <input
                type="radio"
                name="labelColor"
                value="black"
                onChange={() => setLabelColor('black')}
              />
              <span className={`${css.colorCircle} ${css.black}`} />
            </label>
          </div>
        </div>
        <div className={css.deadline}>
          <p>Deadline</p>
          <input
            type="date"
            value={deadline}
            onChange={(e) => setDeadline(e.target.value)}
          />
        </div>
        <button className={css.addButton} onClick={handleAdd}>Add</button>
      </div>
    </div>
  );
};

// Валідація пропсів
AddCardPopup.propTypes = {
  onClose: PropTypes.func.isRequired,
  onAdd: PropTypes.func.isRequired,
};

export default AddCardPopup;