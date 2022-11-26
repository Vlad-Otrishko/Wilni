import { nanoid } from 'nanoid';
import s from './LanguageSelect.module.css';
import globe_icon from './globe_icon.svg';
function LanguageSelect({options,externalClass}) {
    return (
      <label className={s.selectorLabel + ` ${externalClass || ''}`}>
        <img
          src={globe_icon}
          alt="icon of a globe"
          className={s.selectorIcon }
        />
        <select
          name="languages"
          id="language-select"
          className={s.languageSelect}
        >
          {options &&
            options.map((el) => (
              <option
                key={nanoid()}
                value={el}
                className={s.option}
              >
                {el}
              </option>
            ))}
        </select>
      </label>
    );
}
export default LanguageSelect;