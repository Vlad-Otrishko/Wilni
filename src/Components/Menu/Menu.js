import s from './Menu.module.css';
import menu_close from './menu_close.svg';
import menuIcon from './header_menu_image.png';
import Logo from '../Logo';
import Navigation from '../Navigation';
import LanguageSelect from '../LanguageSelect';
import Button from '../Button';

function Menu({ modalSwitch, externalClass }) {

    return (
      <div className={s.menu}>
        <button
          type="button"
          className={s.closeButton}
          onClick={() => modalSwitch('off')}
        >
          <img src={menu_close} alt="close icon" className={s.closeIcon} />
        </button>
        <Logo
          externalClass={externalClass}
          clickSequence={() => modalSwitch('off')}
        />
        <Navigation
          location="header"
          clickSequence={() => modalSwitch('off')}
        />
        <a href="tel:+380730000000" className={s.phoneRef + ' ' + 'reset-link'}>
          +38 (073) 000-00-00
        </a>
        <LanguageSelect
          options={{ languages: ['UK', 'EN'] }}
          externalClass={s.menuLanguageSelect}
        />
        <Button
          componentType="link"
          text="ШВИДКИЙ ДОНАТ"
          componentClass="typeOneLink"
          destination="quick_donation"
          externalClass={s.menuQuickDonation}
          clickSequence={() => modalSwitch('off')}
        />
        <img src={menuIcon} alt="human face" className={s.menuIcon} />
      </div>
    );
}

export default Menu;
