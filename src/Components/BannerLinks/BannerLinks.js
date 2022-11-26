import { Link } from 'react-router-dom';
import s from './BannerLinks.module.css';

function BannerLinks({pageName}) {
  return ((pageName==='main' || pageName === 'about') && <nav className={s.navigation}>
      {pageName === 'about' && (
        <h2
          className={s.bannerLinksTitle}
        >{`Напрямки діяльності \n та керівники`}</h2>
      )}
      <ul
        className={
          s.navigationList +
          ' ' +
          s[`navigationList__${pageName}`] +
          ' ' +
          'reset-list'
        }
      >
        <li
          className={s.navigationItem + ' ' + s[`navigationItem__${pageName}`]}
        >
          <div className={s.frame + ' ' + s.trooper}>
            <Link
              to="/helpArmy"
              className={s.otherPageLink + ' ' + `reset-link`}
            >
              <h2 className={s.linkTitle}>
                <div className={s.navigationTextBlock}>
                  <p>ДОПОМОГА</p>
                  <p>ЗБРОЙНИМ СИЛАМ УКРАЇНИ </p>
                </div>
              </h2>
            </Link>
          </div>
          {pageName === 'about' && (
            <ul className={s.responsiblePersons + ' ' + 'reset-list'}>
              <li className={s.responsiblePerson}>
                <ul className={s.responsiblePersonDetails + ' ' + 'reset-list'}>
                  <li className={s.responsiblePersonDetailsItem}>
                    <p className={s.personName}>Дмитро Водовозов </p>
                  </li>
                  <li className={s.responsiblePersonDetailsItem}>
                    <a>+38 (073) 000-00-00</a>
                  </li>
                  <li className={s.responsiblePersonDetailsItem}>
                    <a>example@gmail.com</a>
                  </li>
                </ul>{' '}
              </li>
            </ul>
          )}
        </li>

        <li
          className={s.navigationItem + ' ' + s[`navigationItem__${pageName}`]}
        >
          <div className={s.frame + ' ' + s.girl}>
            <Link
              to="/helpChildren"
              className={s.otherPageLink + ' ' + `reset-link`}
            >
              <div className={s.navigationTextBlock}>
                <h2 className={s.linkTitle}>ДОПОМОГА ДІТЯМ</h2>
                <p>
                  загиблих військових <br className={s.lineBreak} />
                  130 батальйону ТрО
                </p>
              </div>
            </Link>
          </div>
          {pageName === 'about' && (
            <ul className={s.responsiblePersons + ' ' + 'reset-list'}>
              <li className={s.responsiblePerson}>
                <ul className={s.responsiblePersonDetails + ' ' + 'reset-list'}>
                  <li className={s.responsiblePersonDetailsItem}>
                    <p className={s.personName}>СЕРГІЙ ВУСИК </p>
                  </li>
                  <li className={s.responsiblePersonDetailsItem}>
                    <a>+38 (073) 000-00-00</a>
                  </li>
                  <li className={s.responsiblePersonDetailsItem}>
                    <a>example@gmail.com</a>
                  </li>
                </ul>
              </li>
              <li className={s.responsiblePerson}>
                <ul className={s.responsiblePersonDetails + ' ' + 'reset-list'}>
                  <li className={s.responsiblePersonDetailsItem}>
                    <p className={s.personName}>Денис Федюнін </p>
                  </li>
                  <li className={s.responsiblePersonDetailsItem}>
                    <a>+38 (073) 000-00-00</a>
                  </li>
                  <li className={s.responsiblePersonDetailsItem}>
                    <a>example@gmail.com</a>
                  </li>
                </ul>
              </li>
            </ul>
          )}
        </li>

        <li
          className={s.navigationItem + ' ' + s[`navigationItem__${pageName}`]}
        >
          <div className={s.frame + ' ' + s.drone}>
            <Link to="/aero" className={s.otherPageLink + ' ' + `reset-link`}>
              <div className={s.navigationTextBlock}>
                <h2 className={s.linkTitle}>АЕРОРОЗРОБКА</h2>
                <p className={s.textPositioning}>
                  на розробку українських дронів та БПЛА
                </p>
              </div>
            </Link>
          </div>
          {pageName === 'about' && (
            <ul className={s.responsiblePersons + ' ' + 'reset-list'}>
              <li className={s.responsiblePerson}>
                <ul className={s.responsiblePersonDetails + ' ' + 'reset-list'}>
                  <li className={s.responsiblePersonDetailsItem}>
                    <p className={s.personName}>Зоц андрій</p>
                  </li>
                  <li className={s.responsiblePersonDetailsItem}>
                    <a>+38 (073) 000-00-00</a>
                  </li>
                  <li className={s.responsiblePersonDetailsItem}>
                    <a>example@gmail.com</a>
                  </li>
                </ul>
              </li>
            </ul>
          )}
        </li>
      </ul>
    </nav>
  );
}
export default BannerLinks;