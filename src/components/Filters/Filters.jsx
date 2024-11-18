import SvgIcon from '../SvgIcon/SvgIcon';
import { useEffect, useState } from 'react';
import css from './Filters.module.css';
import { filterCardsByPriorityThunk } from '../../redux/cards/operations';
import { useDispatch } from 'react-redux';

const Filters = ({ setIsModalOpen, boardId }) => {
  const [selectedPriority, setSelectedPriority] = useState(null);
  const dispatch = useDispatch();
  // console.log('selectedPriority', selectedPriority);

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
    console.log('priority', priority);

    dispatch(filterCardsByPriorityThunk({priority, boardId}));
    setSelectedPriority(priority);
  };

  // Функція для показу всіх карток
  const handleShowAllClick = () => {
    console.log('ShowAll');
    dispatch(filterCardsByPriorityThunk({'all', boardId}));
    setSelectedPriority(null);
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
                console.log('Button clicked');
                handleShowAllClick();
              }}
            >
              Show all
            </button>
          </div>
          {['without', 'low', 'medium', 'high'].map(priority => (
            <label key={priority} className={css.priorityLabel}>
              <input
                type="checkbox"
                name="priority"
                value={priority}
                checked={selectedPriority === priority}
                onChange={() => {
                  console.log('Checkbox changed');
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
