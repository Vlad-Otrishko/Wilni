import { useLocation } from 'react-router-dom';
import { Fragment } from 'react';
import { nanoid } from 'nanoid';
import s from './About.module.css';
import RouteTrace from '../../Components/RouteTrace';
import ButtonBlock from '../../Components/ButtonBlock';
import HeroPictureBlock from './HeroPictureBlock';
import TextModules from '../../Components/TextModules';
import ActivitiesList from '../../Components/ActivitiesList';
import Gallery from '../../Components/Gallery';
import BannerLinks from '../../Components/BannerLinks';

function About({picturePosition, viewPort}) {
    const location = useLocation();
    const lastElement = location.pathname.split('/').filter(Boolean).length - 1;
    const pageName = location.pathname.split('/').filter(Boolean)[lastElement].trim();

  const heroContentExists = (TextModules(pageName, 'hero') || HeroPictureBlock({ pageName: pageName }));
  const heroTitleExists = TextModules(pageName, 'hero') && TextModules(pageName, 'hero').title;
  const heroTextBlocksExist = TextModules(pageName, 'hero') && TextModules(pageName, 'hero').paragraphs;
  const heroListExists = TextModules(pageName, 'hero') && TextModules(pageName, 'hero').list;

    return (
      <div className={s.pageContainer}>
        <RouteTrace location={location} />
        <ButtonBlock />
        {heroContentExists && (
          <article className={s.hero}>
            {heroTitleExists && (
              <h1 className={s.heroTitle}>
                {TextModules(pageName, 'hero').title}
              </h1>
            )}
            {heroTextBlocksExist ?
              TextModules(pageName, 'hero').paragraphs.map((el, index) => (
                <Fragment key={nanoid()}>
                  {picturePosition[0] === index &&
                    picturePosition[1] === 'before' && (
                      <HeroPictureBlock pageName={pageName} />
                    )}
                  <p
                    className={
                      index === 0 &&
                        (pageName === 'helpArmy' ||
                          pageName === 'helpChildren' ||
                          pageName === 'aero')
                        ? s.heroText + ' ' + s.intro
                        : index === 1 && pageName === 'about'
                          ? s.heroText + ' ' + s.heroTextExtraGap
                          : s.heroText
                    }
                  >
                    {el}
                  </p>
                  {picturePosition[0] === index &&
                    picturePosition[1] === 'after' && (
                      <HeroPictureBlock pageName={pageName} />
                    )}
                </Fragment>
              )) : <HeroPictureBlock pageName={pageName} />}

            {heroListExists && (
              <div className={s.listWrapper}>
                <ActivitiesList data={TextModules(pageName, 'hero').list} />
              </div>
            )}
          </article>
        )}

        <Gallery pageName={pageName} section="gallery" viewPort={viewPort} />
        <BannerLinks pageName={pageName} />
      </div>
    );
}

export default About;