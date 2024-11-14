import s from "./CardList.module.css";
import Card from "../Card/Card.jsx";
import { useSelector } from "react-redux";
import { selectCardsFromColumn } from "../../redux/cards/selectors.js";
// import { useSelector } from "react-redux";
// import { selectedBoard } from "../../redux/boards/selectors.js";

const CardList = ({ columnId }) => {
  const tasks = useSelector((state) => selectCardsFromColumn(state, columnId));
  // console.log("cards", tasks);

  return (
    <>
      <div className={s.wrapperList}>
        {tasks.map((card) => {
          return (
            <Card
              key={card._id}
              card={card}

              // column={{ ...column, tasks: filteredTasks }}
            />
          );
        })}
      </div>
    </>
  );
};

export default CardList;
