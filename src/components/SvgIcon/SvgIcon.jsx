import sprite from "../../assets/symbol-defs.svg";

const SvgIcon = ({ id, className = "", stroke, ...props }) => {
  return (
    <svg className={`icon ${className}`} stroke={stroke} {...props}>
      <use xlinkHref={`${sprite}#${id}`} />
    </svg>
  );
};

export default SvgIcon;
