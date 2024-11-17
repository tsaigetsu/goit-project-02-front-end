import CardList from '../CardList/CardList.jsx';
import s from './CardManager.module.css';
import { useSelector } from 'react-redux';
import { selectCardsFromColumn } from '../../redux/cards/selectors.js';
import React from 'react';
const MemoizedCardList = React.memo(CardList);

const CardManager = ({ columnId }) => {
  const tasks = useSelector(state => selectCardsFromColumn(state, columnId));

  return (
    <div className={s.cardManager}>
      {tasks.length > 0 && <MemoizedCardList columnId={columnId} />}
    </div>
  );
};

export default React.memo(CardManager);
