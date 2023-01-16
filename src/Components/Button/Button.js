import s from './Button.module.css';
import { NavLink } from 'react-router-dom';
import { HashLink } from 'react-router-hash-link';
const Button=({ componentType, componentClass, text, icon, destination, externalClass, clickSequence })=> {
    return (
      <>
        {componentType === 'link' ? (
          <div
            className={`${componentClass.includes('typeTwo') && s.wrapper} ${
              externalClass || ''
            }`}
          >
            {destination[0] === '#' ? (
              <HashLink to={destination} smooth
                className={s[componentClass] + ' ' + 'reset-link'}
                data-content={text || ''}
                onClick={clickSequence}
              >
                {icon && { icon }}
                {text}
              </HashLink>
            ):
              (<NavLink
                to={destination}
                className={s[componentClass] + ' ' + 'reset-link'}
                data-content={text || ''}
                onClick={clickSequence}
              >
                {icon && { icon }}
                {text}
              </NavLink>)
            }
          </div>
        ) : (
          <div
            className={`${componentClass.includes('typeTwo') && s.wrapper} ${
              externalClass || ''
            }`}
          >
            <button
              type={`${componentType}`}
              className={
                s[componentClass] +
                ` ${
                  (componentClass.includes('typeOne') && externalClass) || ''
                }`
              }
              data-content={text}
              onClick={clickSequence}
            >
              {text}
              {icon}
            </button>
          </div>
        )}
      </>
    );
}
export default Button;