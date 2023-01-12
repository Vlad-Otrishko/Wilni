import { useState, useRef, useEffect, useContext } from 'react';
import {decode as base64_decode, encode as base64_encode} from 'base-64';
import s from './QuickDonation.module.css';
import LanguageSelect from '../../Components/LanguageSelect';
import Button from '../../Components/Button';
import iconPath from './icons/sprite.svg';
import { Context } from '../../context';

import {
  cardNumberInputSequence,
  amountInputSequence,
  dateInputSequence,
  codeInputSequence,
  assignInputClass,
  validationOfInputFields,
} from './functions';

const currencyMarks = {
  UAH: '₴',
  USD: '$',
  EUR: '€',
};
const currencyLocalMarks={
  UAH: 'грн.',
  USD: 'дол.',
  EUR: 'євр.',
};

function QuickDonation() {
  const sha1 = require('sha1');
  const viewPort = useContext(Context);

  const inputAmount = useRef();
  const inputCard = useRef();
  const inputExpireDate = useRef();
  const inputMonth = useRef();
  const inputYear = useRef();
  const inputCode = useRef();
  const inputEmail = useRef();

  const [currency, setCurrency] = useState('UAH');
  const [amount, setAmount] = useState('');
  const [card, setCard] = useState();
  const [month, setMonth] = useState();
  const [year, setYear] = useState();
  const [code, setCode] = useState();
  const [email, setEmail] = useState();
  const [valid, setValid] = useState();

  const stateData = { currency, amount, card, month, year, code, email, valid };
  const inputs = [
    inputAmount,
    inputCard,
    inputExpireDate,
    inputCode,
    inputEmail,
  ];
  const errorMessages = [
    'Вкажіть суму внеску',
    'Номер картки не вірний',
    'Термін дії картки не вірний',
    'CVV картки не вірний',
    'Введіть Вашу електронну пошту',
  ];

  const handleChangeCardNumber = () =>
    cardNumberInputSequence(inputCard, setCard);
  const handleChangeAmount = () =>
    amountInputSequence(inputAmount, setAmount, currencyMarks[currency]);
  const handleChangeDate = () =>
    dateInputSequence(inputMonth, inputYear, setMonth, setYear);
  const handleChangeCode = () => codeInputSequence(inputCode, setCode);
  const checkInputsBeforeSubmit = () => validationOfInputFields(inputs, errorMessages, setValid, s);

  useEffect(() => {
    handleChangeAmount();
  }, [currency]);

  function chooseCurrency(choice) {
    setCurrency(choice);
    return choice;
  }

  const submitAction = () => {
    const data = JSON.stringify({
      public_key: 'i00000000',
      version: 3,
      action: 'pay',
      amount: amount,
      currency: currency,
      card: card,
      card_cvv: code,
      card_exp_month: month,
      card_exp_year: year,
      description: 'test',
      order_id: '000001',
    });
    const private_key = 'a4825234f4bae72a0be04eafe9e8e2bada209255';
    const coded_string = base64_encode(data);
    const signature = base64_encode(
      sha1(private_key + coded_string + private_key)
    );
    console.log(coded_string);
    // console.log(decoded);
    // console.log(signature);
    fetch('https://www.liqpay.ua/api/request', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: coded_string,
      signature: signature,
    })
      .then((response) => response)
      .then(console.log)
      .catch((error) => console.log(error));
  };

  // *********************************************************************
  // rendering....
  return (
    <div className={s.pageContainer}>
      <form
        action="submit"
        className={s.paymentForm}
        onSubmit={(e) => {
          e.preventDefault();
          checkInputsBeforeSubmit();
          if (valid) {
              submitAction();
          }
        }}
      >
        <label htmlFor="amount" className={s.label + ' ' + s.amountLabel}>
          Вкажіть суму внеску
          <LanguageSelect
            options={{ currencies: ['UAH', 'USD', 'EUR'] }}
            makeChoice={chooseCurrency}
            defaultValue={currency}
          />
          <input
            className={s.input + ' ' + assignInputClass('amount', stateData, s)}
            type="text"
            id="amount"
            name="amount"
            ref={inputAmount}
            aria-label="amount to be paid"
            placeholder={`0 ${currencyMarks[currency]}`}
            onChange={(e) => {
              setTimeout(() => {
                handleChangeAmount();
              }, 1000);
            }}
          />
        </label>
        <div className={s.paymentSystemButtonContainer}>
          <Button
            componentType="button"
            externalClass={s.paymentSystemButtonSpace}
            icon={
              <svg className={s.buttonIcon}>
                <use href={`${iconPath}#gPay`}></use>
              </svg>
            }
            text={viewPort >= 1920 && 'Оплатити через'}
            componentClass="paymentSystemButton"
          />
          <Button
            componentType="button"
            externalClass={s.paymentSystemButtonSpace}
            text={
              <svg className={s.buttonIcon}>
                <use href={`${iconPath}#applePay`}></use>
              </svg>
            }
            componentClass="paymentSystemButton"
          />
        </div>
        <p className={s.separatingText}>або сплатіть карткою</p>
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
              className={s.input + ' ' + assignInputClass('code', stateData, s)}
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
        <label className={s.label + ' ' + s.emailLabel}>
          Електронна пошта
          <input
            className={s.input + ' ' + assignInputClass('email', stateData, s)}
            type="email"
            id="email"
            name="email"
            ref={inputEmail}
            placeholder="example@gmail.com"
            onChange={(e) => setEmail(e.target.value)}
          />
        </label>
        <label className={s.commentLabel}>
          Коментар (опціонально)
          <textarea
            className={s.textarea}
            name="comment"
            placeholder="Залиште свій коментар"
          ></textarea>
        </label>
        <div className={s.submitButtonContainer}>
          <Button
            componentType="submit"
            externalClass={s.submitButtonSpace}
            componentClass={'typeOneButton'}
            text={`Сплатити ${Number(amount).toFixed(2)} ${
              currencyLocalMarks[currency]
            }`}
          />
        </div>
      </form>
    </div>
  );
}
export default QuickDonation;