import s from './CardList.module.css';
import Card from '../Card/Card.jsx';
import { useSelector } from 'react-redux';
import {
  selectCardsByPriority,
  selectCardsFromColumn,
} from '../../redux/cards/selectors.js';

const CardList = ({ columnId }) => {
  const tasks = useSelector(state => selectCardsFromColumn(state, columnId));

  const filteredCards = useSelector(selectCardsByPriority);
  console.log('filteredCards', filteredCards);

  return (
    <>
      <div className={s.wrapperList}>
        {tasks.map(card => {
          return <Card key={card._id} card={card} />;
        })}
      </div>
    </>
  );
};

export default CardList;
