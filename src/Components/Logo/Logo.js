import s from './Logo.module.css';
import black from './logo_black.svg';
import white from './logo_white.svg';

function Logo({ externalClass }) {
        let iconSrc = `${ externalClass }`.includes('footer') ? white : black;
    return (<img src={iconSrc}
            className={s.logotype + ` ${externalClass || ''}`}
        />
    );
 }
export default Logo;