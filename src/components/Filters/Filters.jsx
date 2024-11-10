import SvgIcon from "../SvgIcon/SvgIcon";
import css from "./Filters.module.css";

const Filters = ({ onBackgroundChange, onFilterChange, setIsModalOpen }) => {
  const toggleModal = () => {
    setIsModalOpen(false);
  };

  const handleBackgroundChange = (color) => {
    onBackgroundChange?.(color); 
  };

  const handleFilterChange = (priority) => {
    onFilterChange?.(priority);
    toggleModal();
  };

  return (
    <div className={css.modal}>
      <div className={css.modalContent}>
        <button type="button" className={css.closeButton} onClick={toggleModal}>
          <SvgIcon id="icon-x-close" width="18" height="18" />
        </button>
        <h2>Filters</h2>
        <div>
          <h3>Background</h3>
          <button onClick={() => handleBackgroundChange("default")}>Default Background</button>
          <button onClick={() => handleBackgroundChange("none")}>Remove Background</button>
        </div>
        <div>
          <h3>Label Color</h3>
          <button onClick={() => handleFilterChange("none")}>Without priority</button>
          <button onClick={() => handleFilterChange("low")}>Low</button>
          <button onClick={() => handleFilterChange("medium")}>Medium</button>
          <button onClick={() => handleFilterChange("high")}>High</button>
        </div>
      </div>
    </div>
  );
};

export default Filters;
