import { useEffect, useState, useRef } from 'react';
import { nanoid } from 'nanoid';
import s from './Slider.module.css';
import iconPath from './icons/sprite.svg';
import Image from '../Image';
import { imagePaths } from '../Image/imagePaths.js';


function Slider() {
  const [slides, setSlides] = useState(
    imagePaths.main.slider.map((item) => item.id)
  );
  const [activeIndex, setActiveIndex] = useState(0);
  const [imageStyle, setImageStyle] = useState(s.sliderImage);
  // const [touchStart, setTouchStart] = useState(0);

  let touchStart;

  console.log(touchStart);

  function scrolling(e) {
    const delta = e.changedTouches[0].clientX - touchStart;
    console.log(delta);
    if ((delta>0 && delta < 100) || (delta < 0 && delta>-100)) return;
    if(delta > 100) previousImage();
    if (delta < -100) nextImage();
  }



  function nextImage() {
    setImageStyle (s.sliderImage);
    if (activeIndex === slides.length - 1) { return setActiveIndex(0) }

    setActiveIndex((prev) => prev + 1);
  }
  function previousImage() {
    setImageStyle(s.sliderImage__reverse);
    if (activeIndex === 0) { return setActiveIndex(slides.length - 1) }
    setActiveIndex((prev) => prev - 1);
  }


  return (
      <section className={s.slider}>
        <div className={s.slides}>
          <div key={nanoid()} className={s.slide} onTouchStart={e => touchStart=e.touches[0].clientX
          }
            onTouchMove={scrolling}>
              <Image
                folderName={'main'}
                section={'slider'}
                id={slides[activeIndex]}
                externalClass={imageStyle}
              />
            </div>
          <a className={s.prev} onClick={previousImage}>
            <svg className={s.prevIcon}>
              <use href={iconPath + '#arrow-left'}></use>
            </svg>
          </a>
          <a className={s.next} onClick={nextImage}>
            <svg className={s.nextIcon}>
              <use href={iconPath + '#arrow-right'}></use>
            </svg>
          </a>
        </div>
      <div className={s.pagination}>
        {slides.map((_, index) => {
          let attribute = index === Number(activeIndex) ? `active` : null;
          return (
            <span
              key={nanoid()}
              className={s.dot + ' ' + (s[attribute] || '')}
              data-path={index}
              // onClick={setImage}
            ></span>
          );
        })}
      </div>
      </section>
  );
}
export default Slider;
