import s from './InProgressModal.module.css';
import SvgIcon from "../SvgIcon/SvgIcon.jsx";

const InProgressModal = ({ isOpen, onClose, onStatusChange }) => {
  if (!isOpen) return null;

  return (
    <div className={s.overlayInProgr} onClick={onClose}>
      <div className={s.modalInProgr} onClick={(e) => e.stopPropagation()}>
        <div className={s.modalContentInProgr}>
        <div className={s.modalOption} onClick={() => onStatusChange("In progress")}>
          <p className={`${s.statusText} ${s.inProgress}`}>In progress 
            <div className={s.arrowDiv} >
          <SvgIcon id="icon-arrow-circle-broken-right" className={s.iconArrowRight} width='16' height='16'/>
          </div>
          </p>
          
        </div>
        <div className={s.modalOption} onClick={() => onStatusChange("Done")}>
          <p className={`${s.statusText} ${s.done}`}>Done
          <div className={s.arrowDiv} >
          <SvgIcon id="icon-arrow-circle-broken-right" className={s.iconArrowRight} width='16' height='16' />
          </div>
          </p>
          
        </div>
      </div>

        </div>

        
    </div>
  );
};

export default InProgressModal;