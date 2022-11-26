import s from './ImageLegend.module.css';
import { content } from './content.js';
import { nanoid } from 'nanoid';

function ImageLegend({ pageName, section, externalClass }) {
  const pageContent = content[pageName] || undefined; //возможно надо будет пересмотреть логику..
  let sectionContent;
  if (pageContent) {
    sectionContent = pageContent[section] || section || undefined;
  }
  // console.log('page name =', pageName, 'pageContent=',pageContent,'section=', section,'section content=',sectionContent);
    
  return (
    <>
      {sectionContent && section === 'hero' ? (
        <>
          <h3 className={s.requirementsTitle}>{sectionContent.title}</h3>
          <ul className={s.requirementsList + ' ' + 'reset-list'}>
            {sectionContent.requirements.map((el) => (
              <li
                key={nanoid()}
                className={s.requirement + ' ' + externalClass || ''}
              >
                {el}
              </li>
            ))}
          </ul>
        </>
      ) : null}
      {sectionContent && typeof section === 'object' ? (
        <ul
          className={
            s.galleryImageLegend +
            ' ' +
            'reset-list' +
            ' ' +
            s[`galleryImageLegend__${pageName}`]
          }
        >
          {Object.keys(section).filter(el=>el!=='id').map((el) => (
            <li
              key={nanoid()}
              className={
                s.galleryLegendItem + ' ' + s[`galleryLegendItem__${pageName}`]
              }
            >
              {section[el]}
            </li>
          ))}
        </ul>
      ) : null}
    </>
  );
}
export default ImageLegend;