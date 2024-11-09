// import { useState, useEffect } from "react";
// import AddCardPopup from "../AddCardPopup/AddCardPopup.jsx";
// import EditCardPopup from "../EditCardPopup/EditCardPopup.jsx";
import CardList from "../CardList/CardList.jsx";
import SvgIcon from "../SvgIcon/SvgIcon.jsx";
import s from "./CardManager.module.css";

const CardManager = () => {
  // const [tasks, setTasks] = useState([]);
  // const [isAddPopupOpen, setIsAddPopupOpen] = useState(false);
  // const [isEditPopupOpen, setIsEditPopupOpen] = useState(false);
  // const [selectedTask, setSelectedTask] = useState(null);

  // const fetchTasks = async () => {
  //   const response = await fetch("/tasks"); // Запит до бекенду
  //   const data = await response.json();
  //   setTasks(data);
  // };

  // useEffect(() => {
  //   fetchTasks(); // Завантажити картки при монтуванні компонента
  // }, []);

  // const handleAddCard = async (createTask) => {
  //   // Додаємо картку до бекенду
  //   const response = await fetch("/tasks", {
  //     method: "POST",
  //     headers: {
  //       "Content-Type": "application/json",
  //     },
  //     body: JSON.stringify(createTask),
  //   });

  //   if (response.ok) {
  //     const createdTask = await response.json(); // змінив змінну на createdTask
  //     setTasks([...tasks, createdTask]);
  //     setIsAddPopupOpen(false);
  //   }
  // };

  // const handleEditCard = async (updatedTask) => {
  //   // Оновлюємо картку на бекенді
  //   const response = await fetch(`/tasks/${updatedTask.id}`, {
  //     // змінив шлях до правильного
  //     method: "PUT",
  //     headers: {
  //       "Content-Type": "application/json",
  //     },
  //     body: JSON.stringify(updatedTask),
  //   });

  //   if (response.ok) {
  //     const updatedData = await response.json();
  //     setTasks(
  //       tasks.map((task) => (task.id === updatedData.id ? updatedData : task))
  //     );
  //     setIsEditPopupOpen(false);
  //     setSelectedTask(null);
  //   }
  // };

  // const handleDeleteCard = async (id) => {
  //   // Видаляємо картку з бекенду
  //   const response = await fetch(`/tasks/${id}`, {
  //     // змінив шлях до правильного
  //     method: "DELETE",
  //   });

  //   if (response.ok) {
  //     setTasks(tasks.filter((task) => task.id !== id));
  //   }
  // };

  // const openAddPopup = () => {
  //   setIsAddPopupOpen(true);
  // };

  // const openEditPopup = (task) => {
  //   setSelectedTask(task);
  //   setIsEditPopupOpen(true);
  // };

  return (
    <div className={s.cardManager}>
      <CardList
      // cards={tasks} // виправив використання tasks замість cards
      // onEdit={openEditPopup}
      // onDelete={handleDeleteCard}
      />

      <button
        className={s.cardManagerButton}
        // onClick={openAddPopup}
      >
        <SvgIcon
          id="icon-normalBtnBlack"
          className={s.createIcon}
          width="28"
          height="28"
        />
        Add another card
      </button>

      {
        // isAddPopupOpen && (
        //   <AddCardPopup
        //     onClose={() => setIsAddPopupOpen(false)}
        //     onAdd={handleAddCard}
        //   />
        // )
      }

      {
        // isEditPopupOpen && selectedTask && (
        //   <EditCardPopup
        //     onClose={() => setIsEditPopupOpen(false)}
        //     onEdit={handleEditCard}
        //     card={selectedTask}
        //   />
        // )
      }
    </div>
  );
};

export default CardManager;
