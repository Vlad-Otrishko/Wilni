import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import s from './Pagination.module.css';
import iconPath from '../Slider/icons/sprite.svg';
import { nanoid } from 'nanoid';
import Button from '../Button';

function Pagination({ pageName, articleId, activePages, definePaginationPage, showMoreItems }) {
  const [pages, setPages] = useState([1, 2, 3]);
  const [activeElement, setActiveElement] = useState(1);

  useEffect(() => {
    setPages([1, 2, 3]);
  }, [useLocation()]);

  console.log(pageName, articleId, activePages, activeElement);
  console.log('pages=', pages);


  function arrowForward() {
    setActiveElement((previous) => previous + 1);
  }
  function arrowBack() {
    setActiveElement((previous) => previous - 1);
    if (pages[0] > 1) {
      decreasePageNumbers();
    }
  }

  function increasePageNumbers() {
      setPages((previous) => previous.map(el => el + 1));
}

  function decreasePageNumbers() {
      setPages((previous) => previous.map((el) => el - 1));
}
  
  function clickAction(e) {
    console.log('you clicked',e.target.innerHTML);
    // if (e.target.innerHTML > activePages) return;
    setActiveElement(Number(e.target.innerHTML))
  }


  useEffect(() => {
    definePaginationPage(activeElement);
    if (activeElement === pages[pages.length - 1] &&
      activePages > pages[pages.length - 1]) {
      increasePageNumbers();
    } 
  }, [activeElement]);

  useEffect(() => {
    // if (activeElement > 1) return;
    if (pages[0] >= activePages) return;
    showMoreItems(pages[0]);
  },[pages]);


  return (
    <>
      {(pageName === 'news'||pageName==='reports') && !articleId && (
        <ul className={s.paginationBlock + ' ' + 'reset-list'}>
          <li
            className={s.goBack + ` ${activeElement === 1 && s['disabled']}`}
            onClick={arrowBack}
          >
            <svg className={s.prevIcon}>
              <use href={iconPath + '#arrow-left'}></use>
            </svg>
          </li>
          {pages.map((el) => (
            <li
              key={nanoid()}
              className={
                s.pageNumber +
                ` ${el === activeElement ? s['active'] : ''}` +
                ` ${el > activePages && s['disabled']}`
              }
              onClick={(e)=>clickAction(e)}
            >
              {el}
            </li>
          ))}
          <li
            className={
              s.goForward + ` ${activeElement === activePages && s['disabled']}`
            }
            onClick={arrowForward}
          >
            <svg className={s.nextIcon}>
              <use href={iconPath + '#arrow-right'}></use>
            </svg>
          </li>
        </ul>
      )}
      {pageName === 'news' && articleId && (
        <Button
          componentType="button"
          text="БІЛЬШЕ НОВИН"
          componentClass="typeTwoButton"
          externalClass={s.galleryShowMore}
          clickSequence={increasePageNumbers}
        />
      )}
    </>
  );
}
export default Pagination;