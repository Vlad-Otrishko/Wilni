import { useContext } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import s from './Header.module.css';
import MenuButton from '../Menubutton';
import Menu from '../Menu';
import Logo from '../Logo';
import Button from '../Button';
import LanguageSelect from 'Components/LanguageSelect';
import { Context } from '../../context';
import iconPath from './icon/returnIcon.svg';

function Header({ modalSwitch }) {
  const viewPort = useContext(Context);
  const location = useLocation();
  const navigate = useNavigate();

 const handleClick = () => {
    navigate(-1);
   }
  
const donationPage = location.pathname.includes('quick_donation') ||
  location.pathname.includes('regular_donation');
  return (
    <header
      className={
        s.header +
        ` ${donationPage ? s['header__donation'] : s['header__main']}`
      }
    >
      {donationPage ? (
        <>
          <div className={s.returnButton} onClick={handleClick}>
            {/* <Link to="" className={s.returnLink}> */}
              <svg className={s.returnIcon}>
                <use href={`${iconPath}#returnIcon`}></use>
              </svg>
            {/* </Link> */}
            
          </div>
          <Logo externalClass={s.headerLogo__donation} />
          <LanguageSelect
            options={{ languages: ['UK', 'EN'] }}
            externalClass={s.menuLanguageSelect}
          />
        </>
      ) : (
        <>
          {viewPort < 1920 && (
            <>
              <MenuButton setStatus={modalSwitch} />
              <Logo externalClass={s.headerLogo__main} />
              <Button
                componentType="link"
                text="ШВИДКИЙ ДОНАТ"
                componentClass="typeOneLink"
                destination="/quick_donation"
                externalClass={s.headerQuickDonation}
              />
            </>
          )}
          {viewPort >= 1920 && <Menu externalClass={s.headerLogo__main} />}
        </>
      )}
    </header>
  );
}
export default Header;