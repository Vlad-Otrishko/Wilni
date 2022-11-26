
import s from './Image.module.css';
import { imagePaths } from './imagePaths.js';

function Image({ folderName, section, imageIndex }) {
  let path = imagePaths[folderName][section];
  if (section === 'gallery') path = imagePaths[folderName][section][imageIndex];
  // console.log('folderName=', folderName, 'section=', section, 'index=', imageIndex, path);
  if (!path) return null;
  return (
    <>
      {path && (
        <picture>
          <source
            srcSet={`${path.dsk[2]} 1x, ${path.dsk[3]} 2x`}
            type="image/webp"
            media="(min-width: 1920px)"
          />
          <source
            srcSet={`${path.dsk[0]} 1x, ${path.dsk[1]} 2x`}
            type="image/jpeg"
            media="(min-width: 1920px)"
          />
          <source
            srcSet={`${path.tab[2]} 1x, ${path.tab[3]} 2x`}
            type="image/webp"
            media="(min-width: 768px)"
          />
          <source
            srcSet={`${path.tab[0]} 1x, ${path.tab[1]} 2x`}
            type="image/jpeg"
            media="(min-width: 768px)"
          />
          <source
            srcSet={path.mob ? `${path.mob[2]} 1x, ${path.mob[3]} 2x` : ''}
            type="image/webp"
            media="(max-width: 767px)"
          />
          <source
            srcSet={path.mob ? `${path.mob[0]} 1x, ${path.mob[1]} 2x` : ''}
            type="image/jpeg"
            media="(max-width: 767px)"
          />
          <img
            src={path.mob ? path.mob[0]:''}
            className={s.heroPicture}
            alt="фото дрону у повітрі"
          />
        </picture>
      )}
    </>
  );
}
export default Image;