import { useState } from "react";
// import viteLogo from "/favicon.svg";
import "./App.css";
import NewBoardForm from "./components/NewBoardForm/NewBoardForm";

// import EditProfile from "./components/EditProfile/Editprofile";
// import EditColumn from "./components/EditColumn/EditColumn";
// import AddColumn from "./components/AddColumn/AddColumn";
import Column from "./components/Column/Column";
function App() {
  const [isModalOpen, setModalOpen] = useState(false);

    // Функция для открытия модального окна
    const openModal = () => setModalOpen(true);
  
  // Функция для закрытия модального окна
  const closeModal = () => setModalOpen(false);

  return (
    <div>
      <button onClick={openModal}>Create New Board</button>
      <NewBoardForm isOpen={isModalOpen} onClose={closeModal} />
    </div>
  );
};

export default App;
