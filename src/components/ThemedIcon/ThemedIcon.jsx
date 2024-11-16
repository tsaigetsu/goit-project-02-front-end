import { useContext } from 'react';
import SvgIcon from '../SvgIcon/SvgIcon.jsx';
import ThemeContext from '../Layout/ThemeContext.jsx';

export default function ThemedIcon({ width = 24, height = 24, className }) {
  const { avatar } = useContext(ThemeContext);

  return (
    <SvgIcon id={avatar} width={width} height={height} className={className} />
  );
}
