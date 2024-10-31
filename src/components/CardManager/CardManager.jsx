import { useState } from 'react';
import AddCardPopup from '../AddCardPopup/AddCardPopup.jsx';
import EditCardPopup from '../EditCardPopup/EditCardPopup.jsx';
import CardList from '../CardList/CardList.jsx';
import css from './CardManager.module.css';

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
    <div className={css.cardManager}>
      <button className={css.cardManagerButton} onClick={openAddPopup}>Add New Card</button>
      
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