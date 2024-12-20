import SvgIcon from '../SvgIcon/SvgIcon';
import { useEffect, useState } from 'react';
import css from './Filters.module.css';
import { setPriority } from '../../redux/boards/slice.js';
import { useDispatch } from 'react-redux';
import { filterCardsByPriorityThunk } from '../../redux/boards/operations.js';

const Filters = ({ setIsModalOpen, boardId }) => {
  const [selectedPriorities, setSelectedPriorities] = useState('all');
  const dispatch = useDispatch();

  const toggleModal = () => {
    setIsModalOpen(false);
    document.body.classList.remove(css.noScroll);
  };

  const handleOverlayClick = e => {
    if (e.target.classList.contains(css.overlay)) {
      toggleModal(); // Закриття модалки при кліку на фон
    }
  };

  // Використовуємо useEffect для додавання та видалення класу
  useEffect(() => {
    document.body.classList.add(css.noScroll);

    return () => {
      document.body.classList.remove(css.noScroll);
    };
  }, []);

  const handleFilterChange = priority => {
    dispatch(setPriority(priority));
    dispatch(filterCardsByPriorityThunk({ boardId, priority }));
    setSelectedPriorities(priority);
  };

  // Функція для показу всіх карток
  const handleShowAll = () => {
    dispatch(setPriority(null)); // Сбрасываем фильтр
    dispatch(filterCardsByPriorityThunk({ boardId, priority: null }));
    setSelectedPriorities(null);
  };

  return (
    <div className={css.overlay} onClick={handleOverlayClick}>
      <div className={css.filtersContent}>
        <button type="button" className={css.closeButton} onClick={toggleModal}>
          <SvgIcon id="icon-x-close" width="18" height="18" />
        </button>

        <h2>Filters</h2>

        {/* Priority Options */}
        <div className={css.priorityOptions}>
          <div className={css.labelRow}>
            <h3>Label color</h3>
            <button
              type="button"
              className={css.dropdownButton}
              onClick={() => {
                handleShowAll();
              }}
            >
              Show all
            </button>
          </div>
          {['without priority', 'low', 'medium', 'high'].map(priority => (
            <label key={priority} className={css.priorityLabel}>
              <input
                type="checkbox"
                name="priority"
                value={priority}
                checked={selectedPriorities === priority}
                onChange={() => {
                  handleFilterChange(priority);
                }}
                className={`${css.filterRadio} ${
                  css[`filterRadio--${priority}`]
                }`}
              />
              <span className={css.radioLabel}>
                {priority.charAt(0).toUpperCase() + priority.slice(1)}
              </span>
            </label>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Filters;
