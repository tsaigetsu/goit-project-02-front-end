
import PropTypes from 'prop-types';
import css from './Card.module.css';

const Card = ({ card, onEdit, onDelete }) => {
  return (
    <div className={css.card}>
      <h3>{card.title}</h3>
      <p>{card.description}</p>
      <p>Color: {card.labelColor}</p>
      <p>Deadline: {card.deadline}</p>
      <button onClick={onEdit}>Edit</button>
      <button onClick={onDelete}>Delete</button>
    </div>
  );
};

Card.propTypes = {
  card: PropTypes.shape({
    id: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
    description: PropTypes.string,
    labelColor: PropTypes.string,
    deadline: PropTypes.string,
  }).isRequired,
  onEdit: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
};

export default Card;