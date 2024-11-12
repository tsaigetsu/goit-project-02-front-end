import SvgIcon from "../SvgIcon/SvgIcon";
import css from "./HeaderDashboard.module.css";
import Filters from "../Filters/Filters";
import { useSelector } from "react-redux";
import { selectedBoard } from "../../redux/boards/selectors.js";
import { useState } from "react";

const HeaderDashboard = ({ title, onFilterChange, onBackgroundChange }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const board = useSelector(selectedBoard);
  console.log("selectedBoard", board);

  const handleOpenModal = () => {
    setIsModalOpen(true);
    console.log("open modal filter", isModalOpen);
  };

  return (
    <div className={css.wrapperHeaderDashboard}>
      <div className={css.container}>
        <p className={css.titleBoard}>{title}</p>
        <button className={css.btnFilters} onClick={handleOpenModal}>
          <SvgIcon id="icon-filter" width="16" height="16" />
          <span>Filters</span>
        </button>

        {isModalOpen && (
          <Filters
            setIsModalOpen={setIsModalOpen}
            isModalOpen={isModalOpen}
            onBackgroundChange={onBackgroundChange}
            onFilterChange={onFilterChange}
          />
        )}
      </div>
    </div>
  );
};

export default HeaderDashboard;
