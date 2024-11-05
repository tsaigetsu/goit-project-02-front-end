/* eslint-disable react/prop-types */
import s from './Card.module.css';

const Card = ({ card, onEdit, onDelete }) => {
  return (
    <div className={s.card}>
      <h3>{card.title}</h3>
      <p>{card.description}</p>
      <p>Color: {card.labelColor}</p>
      <p>Deadline: {card.deadline}</p>
      <button onClick={onEdit}>Edit</button>
      <button onClick={onDelete}>Delete</button>
    </div>
  );
};

export default Card;


