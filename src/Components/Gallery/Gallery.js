import { nanoid } from 'nanoid';
import s from './Gallery.module.css';
import { Fragment } from 'react';
import { content } from '../ImageLegend/content';
import TextModules from '../TextModules';
import Image from '../Image';
import ImageLegend from '../ImageLegend';
import Button from '../Button';
// import TextModules from 'Components/TextModules';


function Gallery({ pageName, section, viewPort }) {
  const pageContent = content[pageName];
  const galleryTitleExists = TextModules(pageName, 'gallery') && TextModules(pageName, 'gallery').title;


  console.log(pageName, TextModules(pageName));

  let generatedContent = undefined;
  if (pageContent[section] === 'toBeGenerated') {
    generatedContent = TextModules(pageName).map((el) => ({
      id: el.id,
      reference: el.title,
    }));
  }


  const sectionContent = generatedContent || pageContent[section];
  if (!sectionContent) return null;

  const subtitlesPlaceMarkers = {};
  sectionContent.forEach((el, ind) => {
    if (Object.keys(el).includes('subtitle')) return subtitlesPlaceMarkers[sectionContent[ind + 1][Object.keys(sectionContent[ind + 1])[0]]] =
      el.subtitle
  });

  // console.log(subtitlesPlaceMarkers, Object.keys(subtitlesPlaceMarkers));
  // sectionContent.filter((el) => !Object.keys(el).includes('subtitle')).forEach((el, index) =>
  //   console.log(
  //     Object.keys(subtitlesPlaceMarkers).includes(el[Object.keys(el)[0]])
  //   )
  // );
  const pureGalleryContent = sectionContent.filter((el) => !Object.keys(el).includes('subtitle'));
  const galleryItemsToBeMoved = [];
  if (pageName === 'helpChildren' && viewPort>=1920) {
    for (let i = 2; i < pureGalleryContent.length; i += 4) {
      galleryItemsToBeMoved.push(i);
    }
  } 

  console.log(pureGalleryContent);
  // console.log(galleryItemsToBeMoved);

  return (
    <section className={s.gallery}>
      {galleryTitleExists && <h2 className={s.galleryTitle}>
        {TextModules(pageName, 'gallery').title}
      </h2>}
      <ul
        className={
          s.galleryList +
          ' ' +
          'reset-list' +
          ' ' +
          s[`galleryList__${pageName}`]
        }
      >
        {pureGalleryContent.map((el, index) => (
          <Fragment key={nanoid()}>
            {Object.keys(subtitlesPlaceMarkers).includes(
              el[Object.keys(el)[0]]
            ) && (
              <p className={s.gallerySubtitle} style={{ order: `${index}` }}>
                {subtitlesPlaceMarkers[el[Object.keys(el)[0]]]}
              </p>
            )}
            <li
              className={s.galleryItem + ' ' + s[`galleryItem__${pageName}`]}
              style={
                galleryItemsToBeMoved.includes(index)
                  ? { order: `${index - 2}` }
                  : { order: `${index}` }
              }
            >
              <div
                className={s.imageFrame + ' ' + s[`imageFrame__${pageName}`]}
              >
                <Image
                  folderName={pageName}
                  section={section}
                  imageIndex={index}
                />
              </div>
              <div
                className={
                  s.legendWrapper + ' ' + s[`legendWrapper__${pageName}`]
                }
              >
                <ImageLegend pageName={pageName} section={el} />
              </div>
            </li>
          </Fragment>
        ))}
      </ul>
      {pageName === 'helpChildren' && (
        <Button
          componentType="link"
          text="ПОКАЗАТИ БІЛЬШЕ"
          componentClass="typeTwoLink"
          destination=""
          externalClass={s.galleryShowMore}
        />
      )}
    </section>
  );
}
export default Gallery;