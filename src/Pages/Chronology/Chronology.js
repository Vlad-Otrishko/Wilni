import { NavLink } from 'react-router-dom';
import s from './Chronology.module.css';
import TextModules from '../Components/TextModules';

function Chronology() {
    const pageTitle = TextModules('chronology', 'title');
    const data = TextModules('chronology', 'articles');
    
    return (
      <div className={s.pageContainer}>
        <section className={s.chronology}>
          <h1 className={s.title}></h1>
          <ul className={s.daylyRecords}>
                    <li className={s.dalyRecord}>
                        <NavLink></NavLink>
            </li>
          </ul>
        </section>
      </div>
    );
}
export default Chronology;