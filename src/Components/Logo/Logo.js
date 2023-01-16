import s from './Logo.module.css';
import { Link } from 'react-router-dom';
import black from './logo_black.svg';
import white from './logo_white.svg';

function Logo({ externalClass, clickSequence}) {
        let iconSrc = `${ externalClass }`.includes('footer') ? white : black;
    return (
      <Link to="/" className={s.goToMain}>
        <img src={iconSrc} className={s.logotype + ` ${externalClass || ''}`}
          onClick={clickSequence} />
      </Link>
    );
 }
export default Logo;