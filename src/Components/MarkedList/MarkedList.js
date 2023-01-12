import s from './MarkedList.module.css';
import { nanoid } from 'nanoid';

function MarkedList({pageName, data }) {
    if (data === 'toBeGenerated') {
      const textFiles = require.context(
        '../../pictures/reports/documents/',
        true,
        /^\.\/.*$/
      );
      const path = textFiles.keys().map(textFiles);
      data = path.map((el) => ({
        pathToFile: el,
        reference: el.split('/').filter(Boolean)[2].split('.')[0],
      }));
  }
  console.log(pageName);
    
    return (
      <ul
        className={
          s.markedList + ' ' + s[`markedList__${pageName}`] + ' ' + 'reset-list'
        }
      >
        {pageName === 'reports' ?
          (data.map((el) => (
            <li
              key={nanoid()}
              className={
                s.markedListItem + ' ' + s[`markedListItem__${pageName}`]
              }
            >
              <a className={s.documentLink+' '+ 'reset-link' }
                href={el.pathToFile}
                target='_blank'
                rel="noopener noreferrer"
                aria-label="звіт у вигляді текстового файлу"
              >
                {el.reference}
              </a>
            </li>
          ))):

        (data.map((el) => (
          <li
            key={nanoid()}
            className={
              s.markedListItem + ' ' + s[`markedListItem__${pageName}`]
            }
          >
            {el}
          </li>
        )))
      }
      </ul>
    );
}
export default MarkedList;