import s from './MenuButton.module.css';
import menu_icon from './ic_menu.svg';
function MenuButton({setStatus}) {
    return (
        <button type='button' className={s.menuButton} onClick={() => setStatus('on')}>
            <img src={menu_icon} alt="logotype of the fund" className={s.menu_icon}/>
        </button>  
    );
}
export default MenuButton;