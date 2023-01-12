import { Link } from 'react-router-dom';
import s from './ImageLegend.module.css';
import { content } from './content.js';
import { nanoid } from 'nanoid';

function ImageLegend({ pageName, sectionContent, sectionName, id, externalClass }) {
  if (!sectionContent || Object.keys(sectionContent).filter(el=>el!=='id').length===0) return null;
  // console.log('page name =', pageName, 'pageContent=',pageContent,'section=', section,'section content=',sectionContent);
  // console.log(Object.keys(section)); 
  return (
    <>
      {sectionContent &&
      (sectionName === 'gallery' || sectionName === 'photos') ? (
        <ul
          className={
            s.galleryImageLegend +
            ' ' +
            'reset-list' +
            ' ' +
            s[`galleryImageLegend__${pageName}`]
          }
        >
          {Object.keys(sectionContent)
            .filter((el) => el !== 'id' && el !== 'utc')
            .map((el) =>
              el === 'reference' ? (
                <li
                  key={nanoid()}
                  className={
                    s.galleryLegendItem +
                    ' ' +
                    s[`galleryLegendItem__${pageName}`]
                  }
                >
                  <Link
                    to={
                      pageName === 'reports'
                        ? `/${pageName}/${'photos'}/${id}`
                        : `/${pageName}/${id}`
                    }
                    className={
                      s[`galleryLegendItem__${pageName}__${el}`] +
                      ' ' +
                      'reset-link' +
                      ' ' +
                      externalClass
                    }
                  >
                    {sectionContent[el]}
                  </Link>
                </li>
              ) : (
                <li
                  key={nanoid()}
                  className={
                    s.galleryLegendItem +
                    ' ' +
                    s[`galleryLegendItem__${pageName}`] +
                    ' ' +
                    s[`galleryLegendItem__${pageName}__${el}`]
                  }
                >
                  {sectionContent[el]}
                </li>
              )
            )}
        </ul>
      ) : (
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
      )}
    </>
  );
}
export default ImageLegend;