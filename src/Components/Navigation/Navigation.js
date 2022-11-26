import s from './Navigation.module.css';
import { NavLink } from 'react-router-dom';
function Navigation({location}) {
    return (
      <nav className={s[`${location}Navigation`]}>
        <ul className={s[`${location}NavList`] + ` reset-list`}>
          <li className={s.navItem + ' ' + s[`${location}NavItem`]}>
            <NavLink
              to="about"
              className={`reset-link ${s.navLink} ` + s[`${location}NavLink`]}
            >
              {({ isActive }) => (
                <span className={isActive ? s.activeLink : undefined}>
                  ПРО ФОНД
                </span>
              )}
            </NavLink>
          </li>
          <li className={s.navItem + ' ' + s[`${location}NavItem`]}>
            <NavLink
              to="news"
              className={`reset-link ${s.navLink} ` + s[`${location}NavLink`]}
            >
              {({ isActive }) => (
                <span className={isActive ? s.activeLink : undefined}>
                  НОВИНИ
                </span>
              )}
            </NavLink>
          </li>
          <li className={s.navItem + ' ' + s[`${location}NavItem`]}>
            <NavLink
              to="reports"
              className={`reset-link ${s.navLink} ` + s[`${location}NavLink`]}
            >
              {({ isActive }) => (
                <span className={isActive ? s.activeLink : undefined}>
                  ЗВІТИ
                </span>
              )}
            </NavLink>
          </li>
        </ul>
      </nav>
    );

}
export default Navigation;