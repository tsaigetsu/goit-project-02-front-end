import s from "./NeedHelpComponent.module.css";
import bush1x from "../../assets/images/png/bush1x.png";
import bush2x from "../../assets/images/png/bush2x.png";
import SvgIcon from "../SvgIcon/SvgIcon";

const NeedHelpComponent = () => {
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
      <button className={s.btn}>
        <SvgIcon
          id="icon-help-circle"
          className="btnIcon"
          width="20"
          height="20"
        />
        Need help?
      </button>
    </div>
  );
};

export default NeedHelpComponent;
