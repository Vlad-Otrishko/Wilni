import { useEffect, useState} from 'react';
import { nanoid } from 'nanoid';
import s from './Slider.module.css';
import iconPath from './icons/sprite.svg';

import pathDesktop1 from './pictures/chrono/desktop/soldiers.jpg';
import pathDesktop1web from './pictures/chrono/desktop/soldiers.webp';
import pathTablet1 from './pictures/chrono/tablet/soldiers.jpg';
import pathTablet1web from './pictures/chrono/tablet/soldiers.webp';
import pathMobile1 from './pictures/chrono/mobile/soldiers.jpg';
import pathMobile1web from './pictures/chrono/mobile/soldiers.webp';

import pathDesktop2 from './pictures/chrono/desktop/tanks.jpg';
import pathDesktop2web from './pictures/chrono/desktop/tanks.webp';
import pathTablet2 from './pictures/chrono/tablet/tanks.jpg';
import pathTablet2web from './pictures/chrono/tablet/tanks.webp';
import pathMobile2 from './pictures/chrono/mobile/tanks.jpg';
import pathMobile2web from './pictures/chrono/mobile/tanks.webp';

import pathDesktop3 from './pictures/chrono/desktop/field.jpg';
import pathDesktop3web from './pictures/chrono/desktop/field.webp';
import pathTablet3 from './pictures/chrono/tablet/field.jpg';
import pathTablet3web from './pictures/chrono/tablet/field.webp';
import pathMobile3 from './pictures/chrono/mobile/field.jpg';
import pathMobile3web from './pictures/chrono/mobile/field.webp';

import pathDesktop4 from './pictures/chrono/desktop/airplane.jpg';
import pathDesktop4web from './pictures/chrono/desktop/airplane.webp';
import pathTablet4 from './pictures/chrono/tablet/airplane.jpg';
import pathTablet4web from './pictures/chrono/tablet/airplane.webp';
import pathMobile4 from './pictures/chrono/mobile/airplane.jpg';
import pathMobile4web from './pictures/chrono/mobile/airplane.webp';

let i = 0;
function Slider() {

  const pictureRoutes = {
    desktop: [
      pathDesktop1,
      pathDesktop2,
      pathDesktop3,
      pathDesktop4,
  ],
  desktopWeb: [
    pathDesktop1web,
    pathDesktop2web,
    pathDesktop3web,
    pathDesktop4web,
  ],
  tablet : [
      pathTablet1,
      pathTablet2,
      pathTablet3,
      pathTablet4,
    ],
  tabletWeb : [
      pathTablet1web,
      pathTablet2web,
      pathTablet3web,
      pathTablet4web,
  ],
  mobile : [
      pathMobile1,
      pathMobile2,
      pathMobile3,
      pathMobile4,
    ],
  mobileWeb : [
      pathMobile1web,
      pathMobile2web,
      pathMobile3web,
      pathMobile4web,
    ],
  alt:['soldiers', 'tanks', 'field', 'airplane']
  }

  const [swipeStart, setSwipeStart] = useState(0);
  const [swipeEnd, setSwipeEnd] = useState(0);

  const [picturePath, setPicturePath] = useState({
    dsk: pictureRoutes.desktop[0],
    dskWeb: pictureRoutes.desktopWeb[0],
    tab: pictureRoutes.tablet[0],
    tabWeb: pictureRoutes.tabletWeb[0],
    mob: pictureRoutes.mobile[0],
    mobWeb: pictureRoutes.mobileWeb[0],
    alt: pictureRoutes.alt[0],
  });
  function pathDefine(parameter) {
      return setPicturePath({
        dsk: pictureRoutes.desktop[parameter],
        dskWeb: pictureRoutes.desktopWeb[parameter],
        tab: pictureRoutes.tablet[parameter],
        tabWeb: pictureRoutes.tabletWeb[parameter],
        mob: pictureRoutes.mobile[parameter],
        mobWeb: pictureRoutes.mobileWeb[parameter],
        alt: pictureRoutes.alt[parameter],
      });
  }
  function nextImage() {
    i++;
    if (i > (pictureRoutes.mobile.length - 1)) i = 0;
    pathDefine(i);
  }
  function previousImage() {
    i--;
    if (i < 0) i = pictureRoutes.mobile.length - 1;
    pathDefine(i);
    }

  function setImage(e) {
    i = e.target.dataset.path;
    pathDefine(i);
  }

  // function handleSwipeMove(e) {
    
  //   setSwipeEnd(
  //       e.targetTouches[0].clientX,
  //     (() => {
  //       if ((swipeEnd - swipeStart) > 300) {
  //         return previousImage();
  //       }
  //       if ((swipeEnd - swipeStart) < -300) {
  //         return nextImage();
  //       }
  //       return;
  //     })()
  //   );
  // }
  useEffect(() => {
    if ((swipeEnd - swipeStart) > 150) {
      return previousImage();
    }
    if ((swipeEnd - swipeStart) < -150) {
      return nextImage();
    }
    return;
  }, [swipeStart, swipeEnd]
  );
    return (
      <div className={s.sliderBody}>
        <div className={s.slideContainer}
          onTouchStart={e => { setSwipeStart(e.targetTouches[0].clientX)}}
          onTouchMove={e => setTimeout(() => {setSwipeEnd(e.targetTouches[0].clientX),500})}
        >
          <picture>
            <source
              srcSet={picturePath.dskWeb}
              media="(min-width:1920px)"
              type="image/webp"
            />
            <source
              srcSet={picturePath.dsk}
              media="(min-width:1920px)"
              type="image/jpeg"
            />
            <source
              srcSet={picturePath.mobWeb}
              media="(max-width:767px)"
              type="image/webp"
            />
            <source
              srcSet={picturePath.mob}
              media="(max-width:767px)"
              type="image/jpeg"
            />
            <source
              srcSet={picturePath.tabWeb}
              media="(max-width:1919px)"
              type="image/webp"
            />
            <source
              srcSet={picturePath.tab}
              media="(max-width:1919px)"
              type="image/jpeg"
            />
            <img
              src={picturePath.mob}
              alt={picturePath.alt}
              className={s.slide}
            />
          </picture>
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
          {pictureRoutes.mobile.map((_, index) => {
            let attribute = index === Number(i) ? `active` : null;
            return (
              <span
                key={nanoid()}
                className={s.dot + ' ' + (s[attribute] || '')}
                data-path={index}
                onClick={setImage}
              ></span>
            );
          })}
        </div>
      </div>
    );
}
export default Slider;