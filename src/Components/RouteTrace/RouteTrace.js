import { Fragment } from 'react';
import s from './RouteTrace.module.css';
import iconPath from './icons/sprite.svg';
import { nanoid } from 'nanoid';
import substitute from '../../Components/substitutionObject';



function RouteTrace({trackingPath}) {
  const array = trackingPath.map((el) => substitute[el] || el);
  // console.log(array);

    return (
      <section className={s.routeTrace}>
        <div className={s.routeString}>
          <svg className={s.homeIcon}>
            <use href={iconPath + '#icon-home'}></use>
          </svg>
          {array.map((el, index) => (
            <Fragment key={ nanoid()}>
              <svg className={s.delimiterIcon}>
                <use href={iconPath + '#icon-delimiter'}></use>
              </svg>
              {el.split(' ').map((item) => (
                <span key={nanoid()}
                  className={
                    s.routeItemDescription + ' '+
                    s[`${
                      index === array.length - 1
                        ? 'routeItemDescription__last'
                        : ''
                    }`]
                  }
                >{`${item} `}</span>
              ))}
            </Fragment>
          ))}
        </div>
      </section>
    );
}
export default RouteTrace;