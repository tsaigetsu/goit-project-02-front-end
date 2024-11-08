import React, { useState } from 'react';
import css from './Filters.module.css';

const Filters = ({ onBackgroundChange, onFilterChange }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const toggleModal = () => {
    setIsModalOpen(prevState => !prevState);
  };

  const handleBackgroundChange = (color) => {
    if (onBackgroundChange) {
      onBackgroundChange(color);
      // Можна зберігати фон на сервері окремо, якщо необхідно
      saveBackgroundToServer(color);
    }
  };

  const handleFilterChange = (priority) => {
    if (onFilterChange) {
      onFilterChange(priority);
      toggleModal(); // Закриваємо модалку після вибору
    }
  };

  const saveBackgroundToServer = (color) => {
    // Код для відправки даних на сервер
    fetch('/api/saveBackground', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ background: color }),
    }).then(response => {
      if (response.ok) {
        console.log('Background saved successfully');
      } else {
        console.error('Failed to save background');
      }
    });
  };

  return (
    <div className={css.filtersWrapper}>
      <button onClick={toggleModal} className={css.btnFilters}>
        <span>Filters</span>
      </button>
      {isModalOpen && (
        <div className={css.modal}>
          <div className={css.modalContent}>
            <button className={css.closeButton} onClick={toggleModal}>X</button>
            <h2>Filters</h2>
            <div>
              <h3>Background</h3>
              <button onClick={() => handleBackgroundChange('default')}>Default Background</button>
              <button onClick={() => handleBackgroundChange('none')}>Remove Background</button>
            </div>
            <div>
              <h3>Label Color</h3>
              <button onClick={() => handleFilterChange('none')}>Without priority</button>
              <button onClick={() => handleFilterChange('low')}>Low</button>
              <button onClick={() => handleFilterChange('medium')}>Medium</button>
              <button onClick={() => handleFilterChange('high')}>High</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Filters;
