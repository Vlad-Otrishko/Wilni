import { useLocation, useParams,Outlet } from 'react-router-dom';
import { Fragment } from 'react';
import { nanoid } from 'nanoid';
import s from './About.module.css';
import RouteTrace from '../../Components/RouteTrace';
import ButtonBlock from '../../Components/ButtonBlock';
import HeroPictureBlock from './HeroPictureBlock';
import TextModules from '../../Components/TextModules';
import MarkedList from '../../Components/MarkedList';
import Gallery from '../../Components/Gallery';
import BannerLinks from '../../Components/BannerLinks';
import AddInfo from '../../Components/AddInfo';
import Navigation from '../../Components/Navigation';

function About({ picturePosition }) {
  const location = useLocation();
  const { articleId } = useParams();

  // console.log(useParams());


  const pathnameToArray = location.pathname.split('/').filter(Boolean);
  const lastElement = pathnameToArray.length - 1;
  
  let pageName = pathnameToArray[0]
    // pathnameToArray[lastElement].trim();

  let sectionName = 'pageMainContent';

  // if (useParams()) {
  //   pageName = pathnameToArray.filter(el => !Object.values(useParams()).some(item=>item===el))[0];
  // }

  if (articleId) {
    sectionName = 'articles';
  }
  let mainTextContent = TextModules(pageName, sectionName);
  let mainContentExists = mainTextContent || HeroPictureBlock({ pageName: pageName, section: sectionName});
  if (articleId) {
    mainTextContent = TextModules(pageName, sectionName).filter(
      (el) => el.id === articleId
    )[0];
      mainContentExists =
      mainTextContent ||
      HeroPictureBlock({
        pageName: pageName,
        section: 'articles',
        id: articleId,
      });
  }
  const mainTitleExists = mainTextContent && mainTextContent.title;
  const mainTextBlocksExist = mainTextContent && mainTextContent.paragraphs;
  const markedListExists = mainTextContent && mainTextContent.list;



  let trackingPath = pathnameToArray;

  if (articleId && mainTitleExists) {
    trackingPath.pop();
    if (pageName === 'reports') { trackingPath.push(mainTextContent.title + ' ' + mainTextContent.date) }
    else { trackingPath.push(mainTextContent.title) }
  }
    return (
      <div className={s.pageContainer}>
        <RouteTrace trackingPath={trackingPath} />
        {(pageName === 'helpArmy' ||
          pageName === 'helpChildren' ||
          pageName === 'aero') && <ButtonBlock />}
        {mainContentExists && (
          <article className={s.hero}>
            {mainTitleExists && (
              <h1 className={s.heroTitle}>
                {mainTextContent.title}
                {pageName==='reports' && articleId && (' '+ mainTextContent.date)}
              </h1>
            )}
            {mainTextContent.navigation && (
              <Navigation
                location={pageName}
                links={mainTextContent.navigation}
              />
            )}
            {pageName === 'news' && <AddInfo data={mainTextContent} />}
            {mainTextBlocksExist ? (
              mainTextContent.paragraphs.map((el, index) => (
                <Fragment key={nanoid()}>
                  {picturePosition[0] === index &&
                    picturePosition[1] === 'before' && (
                      <HeroPictureBlock
                        pageName={pageName}
                        section={sectionName}
                        id={mainTextContent.id}
                      />
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
                      <HeroPictureBlock
                        pageName={pageName}
                        section={sectionName}
                        id={mainTextContent.id}
                      />
                    )}
                </Fragment>
              ))
            ) : (
              <HeroPictureBlock
                pageName={pageName}
                section={sectionName}
                id={mainTextContent.id}
              />
            )}

            {markedListExists && (
              <div className={s.listWrapper}>
                <MarkedList pageName={pageName} data={mainTextContent.list} />
              </div>
            )}
          </article>
        )}
        <Outlet />

        <Gallery pageName={pageName} section="gallery" articleId={articleId} />
        <BannerLinks pageName={pageName} />
      </div>
    );
}

export default About;