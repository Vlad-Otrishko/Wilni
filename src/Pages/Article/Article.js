import { useLocation, useParams } from 'react-router-dom';
import { Fragment, useContext } from 'react';
import { nanoid } from 'nanoid';
import s from './Article.module.css';
import RouteTrace from '../../Components/RouteTrace';
// import ButtonBlock from '../../Components/ButtonBlock';
import HeroPictureBlock from '../About/HeroPictureBlock';
import TextModules from '../../Components/TextModules';
// import ActivitiesList from '../../Components/ActivitiesList';
import Gallery from '../../Components/Gallery';
import BannerLinks from '../../Components/BannerLinks';
import AddInfo from '../../Components/AddInfo';

function Article({ picturePosition}) {

  const location = useLocation();
  const { articleId } = useParams();

  const pathnameToArray = location.pathname.split('/').filter(Boolean);
  const lastElement = pathnameToArray.length-1;
  let pageName = pathnameToArray[lastElement].trim();

  if (pageName === articleId) {
    pageName = pathnameToArray[lastElement - 1].trim();
  }


      const articleTextContent = TextModules(pageName, 'articles').filter(
        (el) => el.id === articleId
      )[0];
      const articleNotEmpty = true;
      // TextModules(pageName, articleId) || HeroPictureBlock({ pageName: pageName });
      const articleTitleExists = articleTextContent && articleTextContent.title;
      const articleTextBlocksExist =
        articleTextContent && articleTextContent.paragraphs;
      const articleListExists = articleTextContent && articleTextContent.list;



  let trackingPath = pathnameToArray;

  if (articleTitleExists) {
    trackingPath.pop();
    trackingPath.push(articleTextContent.title);
  } 


  return (
    <div className={s.pageContainer}>
      <RouteTrace trackingPath={trackingPath} />
      {/* <ButtonBlock /> */}
      {articleNotEmpty && (
        <article className={s.hero}>
          {articleTitleExists && (
            <h1 className={s.heroTitle}>{articleTextContent.title}</h1>
          )}
          <AddInfo data={articleTextContent}/>
          {articleTextBlocksExist ? (
            articleTextContent.paragraphs.map((el, index) => (
              <Fragment key={nanoid()}>
                {picturePosition[0] === index &&
                  picturePosition[1] === 'before' && (
                    <HeroPictureBlock
                      pageName={pageName}
                      section="articles"
                      id={articleId}
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
                      section="articles"
                      id={articleId}
                    />
                  )}
              </Fragment>
            ))
          ) : (
            <HeroPictureBlock pageName={pageName} section='articles' id={articleId} />
          )}

          {articleListExists && (
            <div className={s.listWrapper}>
              <ActivitiesList data={articleTextContent.list} />
            </div>
          )}
        </article>
      )}

      <Gallery pageName={pageName} section="gallery" articleId={articleId } />
      <BannerLinks pageName={pageName} />
    </div>
  );
}

export default Article;
