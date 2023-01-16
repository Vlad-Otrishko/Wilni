import { useState, useRef} from 'react';
import { decode as base64_decode, encode as base64_encode } from 'base-64';
import s from './RegularDonation.module.css';
import Button from '../../Components/Button';
import iconPath from './icons/sprite.svg';
import {
  cardNumberInputSequence,
  amountInputSequence,
  dateInputSequence,
  codeInputSequence,
  ownerInputSequence,
  phoneInputSequence,
  assignInputClass,
  validationOfInputFields,
  } from '../QuickDonation/functions';

const currencyMarks = {
  UAH: '₴',
};



function RegularDonation() {


  const inputAmount = useRef();
  const inputAmount2 = useRef();
  const inputCard = useRef();
  const inputOwner = useRef();
  const inputExpireDate = useRef();
  const inputMonth = useRef();
  const inputYear = useRef();
  const inputCode = useRef();
  const inputEmail = useRef();
  const inputPhone = useRef();


  const [amount, setAmount] = useState(0);
  const [card, setCard] = useState();
  const [owner, setOwner] = useState('');
  const [month, setMonth] = useState();
  const [year, setYear] = useState();
  const [code, setCode] = useState();
  const [email, setEmail] = useState();
  const [phone, setPhone] = useState('');
  const [valid, setValid] = useState();
  const [regularity, setRegularity] = useState();

    const stateData = {
      amount,
      card,
      month,
      year,
      code,
      email,
      owner,
      phone,
      valid,
    };
    const inputs = [
      inputAmount,
      inputCard,
      inputOwner,
      inputExpireDate,
      inputCode,
      inputEmail,
      inputPhone,
    ];
    const errorMessages = [
      'Вкажіть суму внеску',
      'Номер картки не вірний',
      'Перевірте ПІБ власника',
      'Термін дії картки не вірний',
      'CVV картки не вірний',
      'Введіть Вашу електронну пошту',
      'введіть номер телефону'
    ];
  const handleChangeCardNumber = () =>
    cardNumberInputSequence(inputCard, setCard);
  const handleChangeOwner = () => ownerInputSequence(inputOwner, setOwner);
  const handleChangeAmount = (referenceToInput, currencySymboltoDisplay) =>
    amountInputSequence(referenceToInput, setAmount, currencySymboltoDisplay);
  const handleChangeDate = () =>
    dateInputSequence(inputMonth, inputYear, setMonth, setYear);
  const handleChangeCode = () => codeInputSequence(inputCode, setCode);
  const handleChangePhone = () => phoneInputSequence(inputPhone, setPhone);
  const checkInputsBeforeSubmit = () =>
    validationOfInputFields(inputs, errorMessages, setValid, s);
  
  console.log(regularity);
  

  return (
    <>
      <div className={s.underlay}></div>

      <div className={s.pageContainer}>
        <h1 className={s.invisible}>{'Регулярний платіж'}</h1>
        <form
          action="submit"
          className={s.paymentForm}
          onSubmit={(e) => {
            e.preventDefault();
            checkInputsBeforeSubmit();
          }}
        >
          <div className={s.firstPaymentBlock}>
            <h2 className={s.invisible}>{'Сума та призначення'}</h2>
            <p className={s.paymentPurpose}>Призначення:</p>
            <p className={s.paymentPurposeDescription}>
              регулярний благодійний платіж
            </p>
            <label htmlFor="amount" className={s.label + ' ' + s.amountLabel}>
              <p className={s.amountLabelText}>{'Всього:'}</p>
              <input
                className={
                  s.input + ' ' + assignInputClass('amount', stateData, s)
                }
                type="text"
                id="amount"
                name="amount"
                ref={inputAmount}
                aria-label="amount to be paid"
                placeholder={`${amount} UAH`}
                onChange={(e) => {
                  setTimeout(() => {
                    handleChangeAmount(inputAmount, 'UAH');
                  }, 1000);
                }}
                onBlur={(e) => (e.target.value = '')}
              />
            </label>
            <div className={s.amountButtonContainer}>
              <Button
                componentType="button"
                externalClass={s.amountButtonSpace}
                componentClass={'typeOneButton'}
                text={`${Number(amount).toFixed(2)} гривень на ${regularity==='monthly'? 'місяць':'день'}`}
              />
            </div>
          </div>
          <div className={s.secondPaymentBlock}>
            <div className={s.titleWrapper}>
              <h3 className={s.title}>{'Введіть дані Вашої картки'}</h3>
              <svg className={s.visaLogo}>
                <use href={`${iconPath}#visa`}></use>
              </svg>
              <svg className={s.mastercardLogo}>
                <use href={`${iconPath}#mastercard`}></use>
              </svg>
            </div>
            <div className={s.cardBody}>
              <label className={s.label + ' ' + s.cardNumberLabel}>
                Номер картки
                <input
                  className={
                    s.input + ' ' + assignInputClass('cardNumber', stateData, s)
                  }
                  type="text"
                  id="cardNumber"
                  name="cardNumber"
                  ref={inputCard}
                  minLength={19}
                  maxLength={19}
                  aria-label="16-digit number"
                  placeholder="XXXX XXXX XXXX XXXX"
                  onChange={handleChangeCardNumber}
                />
              </label>
              <label className={s.label + ' ' + s.ownerNameLabel}>
                ПІБ власника
                <input
                  className={
                    s.input + ' ' + assignInputClass('owner', stateData, s)
                  }
                  type="text"
                  id="owner"
                  name="owner"
                  ref={inputOwner}
                  aria-label="owner's name and surname"
                  placeholder="ПІБ власника"
                  onChange={handleChangeOwner}
                />
              </label>
              <div className={s.inputWrapper}>
                <label className={s.label + ' ' + s.cardValidityLabel}>
                  Термін дії картки
                  <div
                    className={
                      s.complexInput +
                      `${assignInputClass('complexInput', stateData, s)}`
                    }
                    ref={inputExpireDate}
                  >
                    <input
                      type="text"
                      id="month"
                      name="month"
                      minLength={2}
                      maxLength={2}
                      ref={inputMonth}
                      placeholder="ММ"
                      aria-label="month, 2-digit format"
                      className={s.input + ' ' + s.dateElement}
                      onFocus={(e) =>
                        e.target.parentNode.classList.add(s['activeElement'])
                      }
                      onBlur={(e) =>
                        e.target.parentNode.classList.remove(s['activeElement'])
                      }
                      onChange={handleChangeDate}
                    />
                    <p className={s.separatingSlash}>/ </p>
                    <input
                      type="text"
                      id="year"
                      name="year"
                      minLength={2}
                      maxLength={2}
                      ref={inputYear}
                      placeholder="ГГ"
                      aria-label="year, last 2-digits"
                      className={s.input + ' ' + s.dateElement}
                      onFocus={(e) =>
                        e.target.parentNode.classList.add(s['activeElement'])
                      }
                      onBlur={(e) =>
                        e.target.parentNode.classList.remove(s['activeElement'])
                      }
                      onChange={handleChangeDate}
                    />
                  </div>
                </label>
                <label className={s.label + ' ' + s.cardCodeLabel}>
                  CVV/CVC
                  <input
                    className={
                      s.input + ' ' + assignInputClass('code', stateData, s)
                    }
                    type="text"
                    id="code"
                    name="code"
                    ref={inputCode}
                    minLength={3}
                    maxLength={3}
                    placeholder="XXX"
                    aria-label="3-digit number"
                    onChange={handleChangeCode}
                  />
                </label>
              </div>
            </div>
            <div className={s.lowerInputsBlock}>
              <label className={s.label + ' ' + s.emailLabel}>
                Електронна пошта
                <input
                  className={
                    s.input + ' ' + assignInputClass('email', stateData, s)
                  }
                  type="email"
                  id="email"
                  name="email"
                  ref={inputEmail}
                  placeholder="example@gmail.com"
                  onChange={(e) => setEmail(e.target.value)}
                />
              </label>
              <label className={s.label + ' ' + s.phoneLabel}>
                Телефон:
                <input
                  className={
                    s.input + ' ' + assignInputClass('phone', stateData, s)
                  }
                  type="tel:"
                  id="phone"
                  name="phone"
                  maxLength={19}
                  ref={inputPhone}
                  placeholder="+380(ХХ) ХХХ-ХХ-ХХ"
                  onFocus={(e) => {
                    if (phone === '') e.target.value = '+380';
                  }}
                  onBlur={(e) => {
                    if (phone === '') e.target.value = '';
                  }}
                  onChange={handleChangePhone}
                />
              </label>
              <label
                htmlFor="amount"
                className={s.label + ' ' + s.repeatedAmountLabel}
              >
                Введіть суму регулярного платежу:
                <input
                  className={
                    s.input + ' ' + assignInputClass('amount', stateData, s)
                  }
                  type="text"
                  id="amount2"
                  name="amount2"
                  ref={inputAmount2}
                  aria-label="amount to be paid"
                  placeholder={`${amount} ₴`}
                  onChange={(e) => {
                    setTimeout(() => {
                      handleChangeAmount(inputAmount2, '₴');
                    }, 1000);
                  }}
                  onBlur={(e) => (e.target.value = '')}
                />
              </label>
              <div className={s.radioInputsGroup}>
                <p className={s.groupTitle}>Спосіб повторення:</p>
                <div className={s.radioInputsWrapper}>
                  <label className={s.label + ' ' + s.radioInputLabel}>
                    <input
                      type="radio"
                      name="regularity"
                      value="monthly"
                      onChange={(e) => setRegularity(e.target.value)}
                    />
                    <p className={s.radioInputDescription}>щомісяця </p>
                  </label>
                  <label className={s.label + ' ' + s.radioInputLabel}>
                    <input
                      type="radio"
                      name="regularity"
                      value="dayly"
                      onChange={(e) => setRegularity(e.target.value)}
                    />
                    <p className={s.radioInputDescription}>щодня</p>
                  </label>
                </div>
              </div>
            </div>
            <div className={s.remarkBlock}>
              <svg className={s.informationIcon}>
                <use href={`${iconPath}#info`}></use>
              </svg>
              <p className={s.informationText}>
                {`Регулярні платежі будуть активовані лише у разі успішної оплати поточного платежу.`}
              </p>
            </div>

            <div className={s.submitButtonContainer}>
              <Button
                componentType="submit"
                externalClass={s.submitButtonSpace}
                componentClass={'typeOneButton'}
                text={`Сплатити`}
              />
            </div>
          </div>
        </form>
      </div>
    </>
  );
}
export default RegularDonation;   
