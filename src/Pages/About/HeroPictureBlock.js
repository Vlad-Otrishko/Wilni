
import s from './About.module.css';
import Image from '../../Components/Image';
import ImageLegend from '../../Components/ImageLegend';
import { content } from '../../Components/ImageLegend/content';


function HeroPictureBlock({ pageName, section, id }) {
  console.log(pageName, section, id);
  const sectionContent = content[pageName][section];
  const legend = sectionContent
    ? sectionContent[id] || sectionContent
    : null;
  
  return legend ? (
    <ul className={s.heroCentralPartWrapper + ' ' + 'reset-list'}>
      <li className={s.heroCentralPartElement}>
        <Image folderName={pageName} section={section} id={id} />
      </li>
      <li
        className={
          s.heroCentralPartElement +
          ' ' +
          s[`heroCentralPartElement__${pageName}`]
        }
      >
        <ImageLegend pageName={pageName} sectionContent={legend} />
      </li>
    </ul>
  ) : (
    Image({ folderName: pageName, section: section, id:id }) && (
      <div className={s.singleImageFrame}>
        <Image folderName={pageName} section={section} id={id} />
      </div>
    )
  );
}
 
export default HeroPictureBlock;

