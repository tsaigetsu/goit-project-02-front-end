import AddAnotherCard from '../AddAnotherCard/AddAnotherCard.jsx';
import CardList from '../CardList/CardList.jsx';
import s from './CardManager.module.css';
import React from 'react';
const MemoizedCardList = React.memo(CardList);

const CardManager = ({ column, columnId }) => {
  const { tasks } = column;

  return (
    <div className={s.cardManager}>
      {tasks.length > 0 && <MemoizedCardList tasks={tasks} />}
      <AddAnotherCard columnId={columnId} />
    </div>
  );
};

export default React.memo(CardManager);
