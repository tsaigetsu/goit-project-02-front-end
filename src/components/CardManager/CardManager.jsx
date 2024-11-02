import { useState } from 'react';
import AddCardPopup from '../AddCardPopup/AddCardPopup.jsx';
import EditCardPopup from '../EditCardPopup/EditCardPopup.jsx';
import CardList from '../CardList/CardList.jsx';
import SvgIcon from '../SvgIcon/SvgIcon.jsx';
import s from './CardManager.module.css';

const CardManager = () => {
  const [cards, setCards] = useState([]);
  const [isAddPopupOpen, setIsAddPopupOpen] = useState(false);
  const [isEditPopupOpen, setIsEditPopupOpen] = useState(false);
  const [selectedCard, setSelectedCard] = useState(null);

  const handleAddCard = (newCard) => {
    setCards([...cards, { ...newCard, id: Date.now() }]);
    setIsAddPopupOpen(false);
  };

  const handleEditCard = (updatedCard) => {
    setCards(cards.map((card) => (card.id === updatedCard.id ? updatedCard : card)));
    setIsEditPopupOpen(false);
    setSelectedCard(null);
  };

  const openAddPopup = () => {
    setIsAddPopupOpen(true);
  };

  const openEditPopup = (card) => {
    setSelectedCard(card);
    setIsEditPopupOpen(true);
  };

  const handleDeleteCard = (id) => {
    setCards(cards.filter((card) => card.id !== id));
  };

  return (
    <div className={s.cardManager}>
      <button className={s.cardManagerButton} onClick={openAddPopup}>
      <SvgIcon
            id="icon-normalBtnBlack"
          className={s.createIcon}
            width="28"
            height="28"
          />
          Add another card</button>
      
      <CardList cards={cards} onEdit={openEditPopup} onDelete={handleDeleteCard} />

      {isAddPopupOpen && (
        <AddCardPopup
          onClose={() => setIsAddPopupOpen(false)}
          onAdd={handleAddCard}
        />
      )}

      {isEditPopupOpen && selectedCard && (
        <EditCardPopup
          onClose={() => setIsEditPopupOpen(false)}
          onEdit={handleEditCard}
          card={selectedCard}
        />
      )}
    </div>
  );
};

export default CardManager;