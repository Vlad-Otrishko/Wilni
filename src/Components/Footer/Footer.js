import { Link } from 'react-router-dom';
import s from './Footer.module.css';
import Logo from '../Logo';
import Navigation from '../Navigation';
import spritePath from './icons/sprite.svg';

function Footer() {
    return (
      <footer className={s.footer}>
        <ul className={s.footerWrapper + ' ' + 'reset-list'}>
          <li className={s.footerWrapperItem}>
            {' '}
            <Logo externalClass={'footerLogo'} />{' '}
          </li>
          <li className={s.footerWrapperItem}>
            {' '}
            <Navigation location="footer" />{' '}
          </li>
          <li className={s.footerWrapperItem}>
            <address>
              <ul className={s.addressBlocks + ' ' + 'reset-list'}>
                <li className={s.addressBlock}>
                  <ul className={s.socialLinks + ' ' + 'reset-list'}>
                    <li className={s.socialLinksItem}>
                      <Link to="" className={s.footerLink + ' ' + 'reset-link'}>
                        <svg className={s.socialIcon}>
                          <use href={spritePath + '#fb'} />
                        </svg>
                        сторінка фонду
                      </Link>
                    </li>
                    <li className={s.socialLinksItem}>
                      <Link to="" className={s.footerLink + ' ' + 'reset-link'}>
                        <svg className={s.socialIcon}>
                          <use href={spritePath + '#fb'} />
                        </svg>
                        сторінка Антитіла
                      </Link>
                    </li>
                    <li className={s.socialLinksItem}>
                      <Link to="" className={s.footerLink + ' ' + 'reset-link'}>
                        <svg className={s.socialIcon}>
                          <use href={spritePath + '#insta'} />
                        </svg>
                        сторінка фонду
                      </Link>
                    </li>
                    <li className={s.socialLinksItem}>
                      <Link to="" className={s.footerLink + ' ' + 'reset-link'}>
                        <svg className={s.socialIcon}>
                          <use href={spritePath + '#insta'} />
                        </svg>
                        сторінка Антитіла
                      </Link>
                    </li>
                    <li className={s.socialLinksItem}>
                      <Link to="" className={s.footerLink + ' ' + 'reset-link'}>
                        <svg className={s.socialIcon}>
                          <use href={spritePath + '#yt'} />
                        </svg>
                        канал Антитіла
                      </Link>
                    </li>
                    <li className={s.socialLinksItem}>
                      <Link to="" className={s.footerLink + ' ' + 'reset-link'}>
                        <svg className={s.socialIcon}>
                          <use href={spritePath + '#tiktok'} />
                        </svg>
                        сторінка Антитіла
                      </Link>
                    </li>
                  </ul>
                </li>
                <li className={s.addressBlock}>
                  <ul className={s.contacts + ' ' + 'reset-list'}>
                    <p>Контакти:</p>
                    <li className={s.contact}>Дмитро Водовозов</li>
                    <li className={s.contact}>
                      <a
                        href="tel:+380730000000"
                        className={s.footerLink + ' ' + 'reset-link'}
                      >
                        +38 (073) 000-00-00{' '}
                      </a>
                    </li>
                    <li className={s.contact}>
                      <a
                        href="mailto:office@info.in.ua"
                        className={s.footerLink + ' ' + 'reset-link'}
                      >
                        office@info.in.ua
                      </a>
                    </li>
                  </ul>
                </li>
              </ul>
            </address>
          </li>
        </ul>

        <div className={s.formalities}>
          <ul className={s.policies + ' ' + 'reset-list'}>
            <li className={s.policy}>
              <Link to="" className={s.footerLink + ' ' + 'reset-link'}>
                Політика конфіденційності
              </Link>
            </li>
            <li className={s.policy}>
              <Link to="" className={s.footerLink + ' ' + 'reset-link'}>
                Політика Cookies
              </Link>
            </li>
            <li className={s.policy}>
              <Link to="" className={s.footerLink + ' ' + 'reset-link'}>
                Публічна оферта
              </Link>
            </li>
          </ul>
          <div className={s.copyright}>
            <p>
              © <span lang="en">Antytila </span> | Зареєстровано в Україні.{' '}
              <br className={s.breakLine} />
              Благодійний фонд «АНТИТІЛА»
            </p>
          </div>
        </div>
      </footer>
    );

}
export default Footer;