
import s from './About.module.css';
import Image from '../../Components/Image';
import ImageLegend from '../../Components/ImageLegend';
import { content } from '../../Components/ImageLegend/content';
// import { imagePaths } from '../../Components/Image/imagePaths';
function HeroPictureBlock({ pageName }) {
  const legendExists = content[pageName] && content[pageName].hero;
  console.log(Image({ folderName:pageName, section:"hero"}));
  return legendExists ? (
    <ul className={s.heroCentralPartWrapper + ' ' + 'reset-list'}>
      <li className={s.heroCentralPartElement}>
        <Image folderName={pageName} section="hero" />
      </li>
      <li
        className={
          s.heroCentralPartElement +
          ' ' +
          s[`heroCentralPartElement__${pageName}`]
        }
      >
        <ImageLegend pageName={pageName} section="hero" />
      </li>
    </ul>
  ) : (
    Image({ folderName:pageName, section:"hero"}) &&
    <div className={s.singleImageFrame}>
      <Image folderName={pageName} section="hero" />
    </div>
  );
}
 
export default HeroPictureBlock;

