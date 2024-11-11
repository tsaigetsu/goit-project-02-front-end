import s from "./CardList.module.css";
import Card from "../Card/Card.jsx";

const CardList = ({ cards }) => {
  console.log("cards", cards);
  return (
    <>
      <div className={s.wrapperList}>
        {cards.map((card) => {
          return (
            <Card
              key={card._id}
              id={card._id}
              title={card.title}
              priority={card.priority}
              description={card.description}
              deadline={card.deadline}
              // column={{ ...column, tasks: filteredTasks }}
              columnId={card.columnId}
            />
          );
        })}
      </div>
    </>
  );
};

export default CardList;
