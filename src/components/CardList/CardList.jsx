import PropTypes from 'prop-types';
import css from './CardList.module.css';

const CardList = ({ cards, onEdit, onDelete }) => {
  return (
    <div className={css.cardList}>
      {cards.map((card) => (
        <div key={card.id} className={css.card}>
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

CardList.propTypes = {
  cards: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
    description: PropTypes.string,
    labelColor: PropTypes.string,
    deadline: PropTypes.string,
  })).isRequired,
  onEdit: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
};

export default CardList;