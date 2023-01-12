import { useState, useEffect, useContext } from 'react';
import { nanoid } from 'nanoid';
import s from './Gallery.module.css';
import { Fragment } from 'react';
import { content } from '../ImageLegend/content';
import TextModules from '../TextModules';
import Image from '../Image';
import ImageLegend from '../ImageLegend';
import Button from '../Button';
import Pagination from '../Pagination';
import { Context } from '../../context';


function Gallery({ pageName, section, articleId }) {
  console.log(pageName, section, articleId);

  const pageContent = content[pageName];
  if (!pageContent) return null;
  if (pageName === 'reports' && !articleId && section !== 'photos') return null; //section!=='photos'
  const galleryTitleExists =
    TextModules(pageName, 'gallery') && TextModules(pageName, 'gallery').title;
  const viewPort = useContext(Context);
  console.log(
    'page content=',
    pageContent,
    'section name=',
    section,
    'section content=',
    pageContent[section],
    articleId
  );

  // Текстовый контент галереи может быть считан из объекта, либо сгенерирован из заголовковотдельных страниц;

  let generatedContent = undefined;
  if (pageContent[section] === 'toBeGenerated') {
    // if (pageName === 'news') {
    generatedContent = TextModules(pageName).articles.map((el) => ({
      id: el.id,
      reference: el.title,
      date: el.date,
      utc: Date.parse(
        new Date(`${el.date.split('.').reverse().join('-')}T${el.time || null}`)
      ),
    }));
    // }
  }

  if (generatedContent && articleId) {
    const sortedByDateAndTime = [...generatedContent].sort(
      (a, b) => b.utc - a.utc
    );
    generatedContent = sortedByDateAndTime;
  }
  const contentFromProps = pageContent[section]
    ? pageContent[section][articleId] || pageContent[section]
    : null;
  const sectionContent = generatedContent || contentFromProps;

  // console.log(pageContent[section][articleId]);
  if (!sectionContent || !Array.isArray(sectionContent) ) return null;

  // Если контент галереи содержит подзаголовки - отфильтровываем их
  const pureGalleryContent = Array.isArray(sectionContent)
    ? sectionContent.filter((el) => !Object.keys(el).includes('subtitle'))
    : sectionContent;

  // Помещаем в стейт начальные данные для пагинацуии:
  const [pagination, setPagination] = useState(undefined);
  const [maximumActivePages, setMaximumActivePages] = useState(0);
  const [contentToShow, setContentToShow] = useState(pureGalleryContent);

  //Если в галерее встречаюся подзаголовки отдельных блоков - находим где их размещать
  // (перед какими элементами галереи):
  function subtitlesPlaceMarkers(data) {
    let result = {};
    if (!Array.isArray(data)) return null;
    data.forEach((el, ind) => {
      if (Object.keys(el).includes('subtitle'))
        return (result[data[ind + 1][Object.keys(data[ind + 1])[0]]] =
          el.subtitle);
    });
    return result;
  }
  // Для смещения очередности картинок на странице Допомога Дітям, при разрешении экрана 1920рх
  const galleryItemsToBeMoved = [];
  if (pageName === 'helpChildren' && viewPort >= 1920) {
    for (let i = 2; i < pureGalleryContent.length; i += 4) {
      galleryItemsToBeMoved.push(i);
    }
  }
  // Если предполагается частичный вывод элементов галереи, - задаем пагинацию в зависимости от страницы и разрешения вьюпорта:
  useEffect(() => {
    setPagination(() => {
      let itemsPerPage;
      switch (pageName) {
        // for the page 'help children'
        case 'helpChildren':
          itemsPerPage = 6;
          break;
        // for the general page 'news' and separate articles:
        case 'news':
          switch (true) {
            case viewPort >= 1920 && !Boolean(articleId):
              itemsPerPage = 12;
              break;
            case viewPort >= 1920 && Boolean(articleId):
              itemsPerPage = 4;
              break;
            case viewPort >= 768 && viewPort <= 1919 && !Boolean(articleId):
              itemsPerPage = 6;
              break;
            case viewPort >= 768 && viewPort <= 1919 && Boolean(articleId):
              itemsPerPage = 2;
              break;
            case viewPort < 768 && Boolean(articleId):
              itemsPerPage = 3;
              break;
            case viewPort < 768 && !Boolean(articleId):
              itemsPerPage = 5;
              break;
          }
          break;
        case 'reports':
          switch (true) {
            case viewPort >= 1920 && !Boolean(articleId):
              itemsPerPage = 9;
              break;
            case viewPort >= 768 && viewPort <= 1919 && !Boolean(articleId):
              itemsPerPage = 9;
              break;
            case viewPort >= 768 && viewPort <= 1919 && Boolean(articleId):
              itemsPerPage = 9;
              break;
            case viewPort < 768 && !Boolean(articleId):
              itemsPerPage = 8;
              break;
          }
          break;
        default:
          itemsPerPage = undefined;
      }
      return itemsPerPage;
    });
  }, [pageName, articleId, viewPort]);

  // console.log(pagination);

  useEffect(() => {
    setContentToShow(
      pureGalleryContent
        .filter((el) => el.id !== articleId)
        .slice(0, pagination)
    );
    setMaximumActivePages(Math.ceil(pureGalleryContent.length / pagination));
  }, [pagination, articleId]);

  function onPaginationClick(x) {
    let start = Number(x) * pagination - pagination;
    let end = Number(x) * pagination;
    if (start > pureGalleryContent.length - 1) return;
    return setContentToShow(pureGalleryContent.slice(start, end));
  }
  function onShowMore(y) {
    let start = 0;
    let end = Number(y) * pagination;
    return setContentToShow(
      pureGalleryContent.filter((el) => el.id !== articleId).slice(start, end)
    );
  }

  return (
    <section className={s.gallery + ' ' + s[`gallery__${pageName}`]}>
      {galleryTitleExists && (
        <h2 className={s.galleryTitle}>
          {TextModules(pageName, 'gallery').title}
        </h2>
      )}
      <ul
        className={
          s.galleryList +
          ' ' +
          'reset-list' +
          ' ' +
          s[`galleryList__${pageName}`]
        }
      >
        {contentToShow.map((el, index) => (
          <Fragment key={nanoid()}>
            {Object.keys(subtitlesPlaceMarkers(sectionContent)).includes(
              el[Object.keys(el)[0]]
            ) && (
              <p className={s.gallerySubtitle} style={{ order: `${index}` }}>
                {subtitlesPlaceMarkers[el[Object.keys(el)[0]]]}
              </p>
            )}
            <li
              className={
                s.galleryItem +
                ' ' +
                s[`galleryItem__${pageName}`] +
                ' ' +
                `${articleId ? s[`galleryItem__latest__${pageName}`] : ''}`
              }
              style={
                galleryItemsToBeMoved.includes(index)
                  ? { order: `${index - 2}` }
                  : { order: `${index}` }
              }
            >
              <div
                className={
                  s.imageFrame +
                  ' ' +
                  s[`imageFrame__${pageName}`] +
                  ' ' +
                  `${articleId ? s[`imageFrame__latest__${pageName}`] : ''}`
                }
              >
                <Image
                  folderName={pageName}
                  section={section}
                  id={el.id}
                  externalClass={s[`image__${pageName}`]}
                />
              </div>
              <div
                className={
                  s.legendWrapper +
                  ' ' +
                  s[`legendWrapper__${pageName}`] +
                  ' ' +
                  `${articleId ? s[`legendWrapper__latest__${pageName}`] : ''}`
                }
              >
                <ImageLegend
                  pageName={pageName}
                  sectionContent={el}
                  sectionName={section}
                  id={el.id}
                  externalClass={
                    articleId
                      ? s[`galleryLegendItem__latest__${pageName}__reference`]
                      : ''
                  }
                />
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
      {pagination && (
        <div className={s.paginationWrapper}>
          <Pagination
            pageName={pageName}
            articleId={articleId}
            activePages={maximumActivePages}
            definePaginationPage={onPaginationClick}
            showMoreItems={onShowMore}
          />
        </div>
      )}
    </section>
  );
}
export default Gallery;