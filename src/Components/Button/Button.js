import s from './Button.module.css';
import { NavLink } from 'react-router-dom';
const Button=({ componentType, text, componentClass, destination, externalClass })=> {
    return (
      <>
        {componentType === 'link' ? (
          <div className={s.wrapper + ' ' + ` ${externalClass || ''}`}>
            <NavLink
              to={destination}
              className={s[componentClass] + ' ' + 'reset-link'}
            data-content={text }>
              {text}
            </NavLink>
          </div>
        ) : (
            <button type="button"  className={s[componentClass]}>
            {text}
          </button>
        )}{' '}
      </>
    );
}
export default Button;