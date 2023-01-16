import { nanoid } from 'nanoid';
import s from './Navigation.module.css';
import { NavLink } from 'react-router-dom';
function Navigation({ location, links, imagePath, clickSequence}) {
  return (
    <>
      {location === 'reports' || location === 'donate' ? (
        <nav className={s[`${location}Navigation`]}>
          <ul className={s[`${location}NavList`] + ` reset-list`}>
            {links.map((el) => (
              <li
                key={nanoid()}
                className={s.navItem + ' ' + s[`${location}NavItem`]}
              >
                <NavLink
                  to={`/${location}/${Object.keys(el)[0]}`}
                  className={
                    `reset-link ${s.navLink} ` + s[`${location}NavLink`]
                  }
                >
                  {({ isActive }) => (
                    <span className={isActive ? s.activeLink : undefined}>
                      {location === 'reports' && Object.values(el)[0]}
                      {location === 'donate' && (
                        <svg className={s.linkIcon}>
                          <use
                            href={`${imagePath}#${Object.keys(el)[0]}`}
                          ></use>
                        </svg>
                      )}
                    </span>
                  )}
                </NavLink>
              </li>
            ))}
          </ul>
        </nav>
      ) : (
        <nav className={s[`${location}Navigation`]}>
          <ul className={s[`${location}NavList`] + ` reset-list`}>
            <li className={s.navItem + ' ' + s[`${location}NavItem`]}>
              <NavLink
                to="/about"
                className={`reset-link ${s.navLink} ` + s[`${location}NavLink`]}
                onClick={clickSequence}
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
                to="/news"
                className={`reset-link ${s.navLink} ` + s[`${location}NavLink`]}
                onClick={clickSequence}
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
                to="/reports/documents"
                className={`reset-link ${s.navLink} ` + s[`${location}NavLink`]}
                onClick={clickSequence}
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
      )}
    </>
  );

}
export default Navigation;