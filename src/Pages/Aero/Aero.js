import { useLocation } from 'react-router-dom';
import { Fragment } from 'react';
import { nanoid } from 'nanoid';
import s from './Aero.module.css';
import RouteTrace from '../../Components/RouteTrace';
import ButtonBlock from '../../Components/ButtonBlock';
import Image from '../../Components/Image';
import ImageLegend from '../../Components/ImageLegend';
import TextModules from 'Components/TextModules';

function HelpChildren() {
  const location = useLocation();

  return (
    <>
      <RouteTrace location={location} />
      <ButtonBlock />
      <article className={s.hero}>
        <h1 className={s.heroTitle}>{TextModules(location,'hero').title}</h1>
        {TextModules(location, 'hero').paragraphs.map((el, index) => (
          <Fragment key={nanoid()}>
            <p
              className={index === 0 ? s.heroText + ' ' + s.intro : s.heroText}
            >
              {el}
            </p>

            {index === 0 && (
              <ul className={s.heroCentralPartWrapper + ' ' + 'reset-list'}>
                <li className={s.heroCentralPartElement}>
                  <Image location={location} section='hero'/>
                </li>
                <li className={s.heroCentralPartElement}>
                  <ImageLegend location={location} section ='hero' />
                </li>
              </ul>
            )}
          </Fragment>
        ))}
      </article>
    </>
  );
}

export default HelpChildren;
