import s from './ChronoArticle.module.css';
import { useParams } from 'react-router-dom';
import TextModules from '../TextModules';
import { nanoid } from 'nanoid';
import iconPath from '../../icons/sprite.svg';


function ChronoArticle() {
    const articleId = useParams().id;
    const chosenRecord = TextModules('chronology', 'articles').filter(article => article.id === articleId)[0];
    if (!chosenRecord) return null;
    const articleText = chosenRecord.paragraphs;
    return (
      <article className={s.articleBody}>
        <ul className={s.paragraphs + ' ' + 'reset-list'}>
          {articleText.map((el) => (
            <li key={nanoid()} className={s.paragraph}>
              {el}
            </li>
          ))}
        </ul>
        <a
          className={s.signature + ' ' + 'reset-link'}
          href="https://www.facebook.com/taras.topolya"
          rel="noreferrer noopener"
          target="_blank"
        >
          <svg className={s.socialIcon}>
            <use href={`${iconPath}#facebook`}></use>
          </svg>
          <span>{'Тарас Тополя'}</span>
        </a>
      </article>
    );
}
export default ChronoArticle;