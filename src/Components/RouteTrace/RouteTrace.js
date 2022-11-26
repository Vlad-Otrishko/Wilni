import { useLocation } from 'react-router-dom';
import s from './RouteTrace.module.css';
import iconPath from './icons/sprite.svg';
import { nanoid } from 'nanoid';
import substitute from '../../Components/substitutionObject';



function RouteTrace({location}) {
  const array = location.pathname
    .split('/')
    .filter(Boolean)
    .map((el) => substitute[el] || el);

    return (
      <section className={s.routeTrace}>
        <ul className={s.routeString + ' ' + 'reset-list'}>
          <svg className={s.homeIcon}>
            <use href={iconPath + '#icon-home'}></use>
          </svg>
          {array.map((el) => (
            <li key={nanoid()} className={s.routeStringItem}>
              <svg className={s.delimiterIcon}>
                <use href={iconPath + '#icon-delimiter'}></use>
              </svg>
              <span className={s.routeItemDescription}>{el}</span>
            </li>
          ))}
        </ul>
      </section>
    );
}
export default RouteTrace;