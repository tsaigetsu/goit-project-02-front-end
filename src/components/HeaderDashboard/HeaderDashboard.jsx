import SvgIcon from '../SvgIcon/SvgIcon';
import css from './HeaderDashboard.module.css';
import Filters from '../Filters/Filters';

import { useState } from 'react';

const HeaderDashboard = ({ title, boardId }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleOpenModal = () => {
    setIsModalOpen(true);
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
          <Filters boardId={boardId} setIsModalOpen={setIsModalOpen} />
        )}
      </div>
    </div>
  );
};

export default HeaderDashboard;
