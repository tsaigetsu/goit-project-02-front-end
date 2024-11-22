import s from './CardList.module.css';
import Card from '../Card/Card.jsx';

const CardList = ({ tasks }) => {
  return (
    <>
      <div className={s.wrapperList}>
        {tasks.map(task => {
          return <Card key={task._id} card={task} />;
        })}
      </div>
    </>
  );
};

export default CardList;
