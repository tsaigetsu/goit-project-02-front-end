import { ClockLoader } from 'react-spinners';
import css from './Loader.module.css';

const Loader = () => {
  return (
    <div className={css.loader}>
      <ClockLoader loading size={100} />
    </div>
  );
};

export default Loader;
