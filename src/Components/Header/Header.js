import { useState, useEffect } from 'react';
import s from './Header.module.css';
import MenuButton from '../Menubutton';
import Menu from '../Menu';
import Logo from '../Logo';
import Button from '../Button';
function Header({ modalSwitch, viewPort}) {
  

  return (
    <header className={s.header}>
      {viewPort < 1920 && (
        <>
          <MenuButton setStatus={modalSwitch} />
          <Logo externalClass={s.headerLogo}
          />
          <Button
            componentType="link"
            text="ШВИДКИЙ ДОНАТ"
            componentClass="typeOneLink"
            destination="quick_donation"
            externalClass={s.headerQuickDonation}
          />
        </>
      )}
      {viewPort >= 1920 && <Menu externalClass={s.headerLogo} />}
    </header>
  );
}
export default Header;