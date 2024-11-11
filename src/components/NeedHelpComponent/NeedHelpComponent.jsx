import s from "./NeedHelpComponent.module.css";
import bush1x from "../../assets/images/png/bush1x.png";
import bush2x from "../../assets/images/png/bush2x.png";
import SvgIcon from "../SvgIcon/SvgIcon";
import { useState } from "react";
import ModalNeedHelp from "../ModalNeedHelp/ModalNeedHelp";

const NeedHelpComponent = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div className={s.needHelp}>
      <div className={s.imageContainer}>
        <picture>
          <source srcSet={`${bush1x} 1x, ${bush2x} 2x`} />
          <img src={bush1x} alt="happy bush" className={s.image} width="54" />
        </picture>
      </div>
      <p className={s.p}>
        If you need help with <span className={s.pSpan}>TaskPro</span>, check
        out our support resources or reach out to our customer support team.
      </p>
      <button className={s.btn} onClick={handleOpenModal}>
        <SvgIcon
          id="icon-help-circle"
          className={s.btnIcon}
          width="20"
          height="20"
        />
        Need help?
      </button>
      {isModalOpen && (
        <ModalNeedHelp isOpen={isModalOpen} onClose={handleCloseModal} />
      )}
    </div>
  );
};

export default NeedHelpComponent;
