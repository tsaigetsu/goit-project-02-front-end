import { useState } from 'react';
import PropTypes from 'prop-types';
import css from "./EditCardPopup.module.css";

const EditCardPopup = ({ onClose, onEdit, card }) => {
  const [title, setTitle] = useState(card.title);
  const [description, setDescription] = useState(card.description);
  const [labelColor, setLabelColor] = useState(card.labelColor);
  const [deadline, setDeadline] = useState(card.deadline);

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
    <div className={css.popup}>
      <div className={css.popupContent}>
        <button className={css.closeButton} onClick={onClose}>×</button>
        <h2>Edit Card</h2>
        <input
          className={css.inputTitle}
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <textarea
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
                checked={labelColor === 'pink'}
                onChange={() => setLabelColor('pink')}
              />
              <span className={`${css.colorCircle} ${css.pink}`} />
            </label>
            <label>
              <input
                type="radio"
                name="labelColor"
                value="green"
                checked={labelColor === 'green'}
                onChange={() => setLabelColor('green')}
              />
              <span className={`${css.colorCircle} ${css.green}`} />
            </label>
            <label>
              <input
                type="radio"
                name="labelColor"
                value="black"
                checked={labelColor === 'black'}
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
        <button className={css.editButton} onClick={handleEdit}>Edit</button>
      </div>
    </div>
  );
};

// Валідація пропсів
EditCardPopup.propTypes = {
  onClose: PropTypes.func.isRequired,
  onEdit: PropTypes.func.isRequired,
  card: PropTypes.shape({
    title: PropTypes.string,
    description: PropTypes.string,
    labelColor: PropTypes.string,
    deadline: PropTypes.string,
  }).isRequired,
};

export default EditCardPopup;