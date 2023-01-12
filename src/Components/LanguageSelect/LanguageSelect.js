import { nanoid } from 'nanoid';
import { useState } from 'react';
import { useLocation } from 'react-router-dom';
import s from './LanguageSelect.module.css';
import globe_icon from './globe_icon.svg';
function LanguageSelect({ options, makeChoice, defaultValue, externalClass }) {
  if (!options) return null;

  
  const optionsName = Object.keys(options)[0];
  const optionsValues = Object.values(options)[0];
  const optionsInSequence = defaultValue ? [defaultValue, ...optionsValues.filter(item => item !== defaultValue)] :
  optionsValues;

  const location = useLocation();
  const showSelectIcon = checkIconStatus(location.pathname);
  function checkIconStatus(page) {
    if (page.includes('quick_donation') || page.includes('regular_donation'))
      return false;
    return true;
  }
  return (
    <div className={s.selectWrapper + ` ${externalClass || ''}`}>
      {showSelectIcon && (
        <label htmlFor="selector" className={s.selectorLabel}>
          <img
            src={globe_icon}
            alt="icon of a globe"
            className={s.selectorIcon}
          />
        </label>
      )}
      <select
        name={optionsName}
        id="selector"
        className={s.select}
        defaultValue={defaultValue}
        onChange={(e) => {
          makeChoice(e.target.value);
        }}
      >
        {optionsInSequence.map((el) => (
          <option key={nanoid()} value={el} className={s.option}>
            {el}
          </option>
        ))}
      </select>
    </div>
  );
}
export default LanguageSelect;