import { nanoid } from 'nanoid';
import s from './AddInfo.module.css';
import iconPath from './icons/sprite.svg';
// import { socialLinks } from '../TextModules/socialLinks';


function AddInfo({ data }) {
// const totalLinks = Object.values(socialLinks).flatMap((item) => item);
// console.log(totalLinks);
// const currentArticleLinks= Object.values(
//     data.socialLinks).map((el) => totalLinks.find((link) => link.id === el).link)
//     console.log(currentArticleLinks);
  const socialNetworks = ['facebook', 'twitter', 'telegram'];
  const shareArticle = function () {
    return;
  }
    return (
      <div className={s.addInfoBody}>
        <p className={s.issueTime}>
          <span className={s.date}>{`${data.date}, `}</span><span className={s.time}>{`${data.time}` }</span>
        </p>
        <ul className={s.shareArticleOptions + ' ' + 'reset-list'}>
          {socialNetworks.map((el) => (
            <li key={nanoid()} className={s.shareOption}>
              <button
                type="button"
                className={s.shareButton + ' ' + s[`shareButton__${el}`]}
                onClick={shareArticle}
              >
                <svg className={s.linkIcon}>
                  <use href={`${iconPath}#${el}`}></use>
                </svg>
              </button>
            </li>
          ))}
        </ul>
      </div>
    );
}
export default AddInfo;