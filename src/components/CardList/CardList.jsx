/* eslint-disable react/prop-types */
import s from './CardList.module.css';

const CardList = ({ cards, onEdit, onDelete }) => {
  return (
    <div className={s.cardList}>
      {cards.map((card) => (
        <div key={card.id} className={s.card}>
          <h3>{card.title}</h3>
          <p>{card.description}</p>
          <p>Label Color: {card.labelColor}</p>
          <p>Deadline: {card.deadline}</p>
          <button onClick={() => onEdit(card)}>Edit</button>
          <button onClick={() => onDelete(card.id)}>Delete</button>
        </div>
      ))}
    </div>
  );
};

export default CardList;