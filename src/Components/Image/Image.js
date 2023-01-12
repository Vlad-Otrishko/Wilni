
import s from './Image.module.css';
import { imagePaths } from './imagePaths.js';

function Image({ folderName, section, id, externalClass }) {
  if (!imagePaths[folderName]) return null;
  let path =
    Array.isArray(imagePaths[folderName][section])
      ? imagePaths[folderName][section].filter((el) => el.id === id)[0] //|| Object.keys(el).includes(id))[0]
      : imagePaths[folderName][section];
  // if (section === 'gallery') path = imagePaths[folderName][section][imageIndex];
  // console.log('folderName=', folderName, 'section=', section,  'id=', id, path);
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
            className={externalClass}
            alt="фото дрону у повітрі"
          />
        </picture>
      )}
    </>
  );
}
export default Image;