import SvgIcon from '../SvgIcon/SvgIcon';
import css from './AddAnotherCard.module.css';
import AddCardPopup from '../AddCardPopup/AddCardPopup';
import { useMemo, useState } from 'react';

const AddAnotherCard = ({ columnId }) => {
  const [isCardVisible, setIsCardVisible] = useState(false);

  const handleOpenPopup = useMemo(() => () => setIsCardVisible(true), []);

  return (
    <>
      <div className={css.btnContainer}>
        <button className={css.cardManagerButton} onClick={handleOpenPopup}>
          <div className={css.svg}>
            <SvgIcon
              id="icon-plus"
              className={css.svgIcon}
              width="14"
              height="14"
            />
          </div>
          Add another card
        </button>
      </div>
      {isCardVisible && (
        <AddCardPopup setIsCardVisible={setIsCardVisible} columnId={columnId} />
      )}
    </>
  );
};
export default AddAnotherCard;
