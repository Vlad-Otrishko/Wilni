import s from './ActivitiesList.module.css';
import { nanoid } from 'nanoid';

function ActivitiesList({ data }) {
    return (
        <ul className={s.activitiesList + ' ' + 'reset-list'}>
            {data.map((el) =>
                <li key={nanoid()} className={s.activitiesListItem}>
                    {el}
                </li>)}
            
            </ul>
    );
}
export default ActivitiesList;