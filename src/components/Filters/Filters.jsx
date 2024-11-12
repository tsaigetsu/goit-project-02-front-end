import SvgIcon from "../SvgIcon/SvgIcon";
import { useEffect } from "react";
import css from "./Filters.module.css";

const Filters = ({ onBackgroundChange, onFilterChange, setIsModalOpen }) => {
  const toggleModal = () => {
    setIsModalOpen(false);
    document.body.classList.remove(css.noScroll); // Видалення класу для зупинки скролу
  };

  const handleOverlayClick = (e) => {
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

  const handleFilterChange = (priority) => {
    onFilterChange?.(priority);
   // toggleModal(); //закривати модалку при виборі
  };

  {/*const handleBackgroundChange = (color) => {
    onBackgroundChange?.(color); 
  };
  */}
  
  return (
     <div className={css.overlay} onClick={handleOverlayClick}>
      <div className={css.filtersContent}>
        <button type="button" className={css.closeButton} onClick={toggleModal}>
          <SvgIcon id="icon-x-close" width="18" height="18" />
        </button>

        <h2>Filters</h2>

        {/* Background Options */}
        {/*
        <div className={css.backgroundOptions}>
          <h3>Background</h3>
          <button className={css.backgroundButton} onClick={() => handleBackgroundChange("default")}>
            Default Background
          </button>
          <button className={css.backgroundButton} onClick={() => handleBackgroundChange("none")}>
            Remove Background
          </button>
        </div>
        */}

        
        {/* Priority Options */}
        <div className={css.priorityOptions}>
          <h3>Label color</h3>
          {["none", "low", "medium", "high"].map((priority) => (
            <label key={priority} className={css.priorityLabel}>
              <input 
                type="radio" 
                name="priority" 
                value={priority} 
                onChange={() => handleFilterChange(priority)} 
                className={`${css.filterRadio} ${css[`filterRadio--${priority}`]}`} 
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
