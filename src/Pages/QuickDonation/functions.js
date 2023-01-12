// specify card number
export const cardNumberInputSequence = (
  referenceToCardNumberInput,
  setStateFunction
) => {
  const cardValue = referenceToCardNumberInput.current.value
    .replace(/\D/g, '')
    .match(/(\d{0,4})(\d{0,4})(\d{0,4})(\d{0,4})/);
  referenceToCardNumberInput.current.value = !cardValue[2]
    ? cardValue[1]
    : `${cardValue[1]} ${cardValue[2]}${`${
        cardValue[3] ? ` ${cardValue[3]}` : ''
      }`}${`${cardValue[4] ? ` ${cardValue[4]}` : ''}`}`;
  const numbers = referenceToCardNumberInput.current.value.replace(/(\D)/g, '');
  setStateFunction(numbers);
};

// specify amount to be paid
  export const amountInputSequence = (referenceToAmountInput, setStateFunction, currencySymbol) => {
    const amountValue = referenceToAmountInput.current.value.replace(
      /[^\d\.]/g,
      ''
    );
    if (amountValue > 0)
      referenceToAmountInput.current.value =
        amountValue + currencySymbol;
    setStateFunction(Number(amountValue).toFixed(2));
    let end = referenceToAmountInput.current.value.length;
    referenceToAmountInput.current.selectionEnd = end - 1;
};
  
//specify expiry date of the card
export const dateInputSequence = (referenceToMonthInput, referenceToYearInput,
  setStateMonthFunction, setStateYearFunction) => {
    let pattern;
    if (document.activeElement.name === 'month') {
      pattern = /0[0-9]|1[0-2]|0|1/;
      validate(referenceToMonthInput, pattern);
      setStateMonthFunction(
        referenceToMonthInput.current.value,
        (() => {
          if (referenceToMonthInput.current.value.length > 1)
            referenceToYearInput.current.focus();
        })()
      );
    } else {
      pattern = /2[3-9]|3[0-2]|2|3/;
      validate(referenceToYearInput, pattern);
      setStateYearFunction(referenceToYearInput.current.value);
    }

    function validate(inputDate, matchingCriterion) {
      const cardDate = inputDate.current.value
        .replace(/\D/g, '')
        .match(matchingCriterion);
      if (!cardDate) return (inputDate.current.value = '');
      return (inputDate.current.value = !cardDate[1]
        ? cardDate[0]
        : `${cardDate[0]}${cardDate[1]}`);
    }
  };

  // specify CVV code

export  const codeInputSequence = (referenceToCodeInput, setStateFunction) => {
      const codeValue = referenceToCodeInput.current.value
        .replace(/\D/g, '')
        .match(/[0-9]{0,3}/);
      referenceToCodeInput.current.value = codeValue;
      setStateFunction(codeValue);
};

export const phoneInputSequence = (
  referenceToPhoneInput,
  setStateFunction
) => {
  const phoneNumberValue = referenceToPhoneInput.current.value
    .replace(/\+380/, '')
    .replace(/\D/g, '')
    .match(/(\d{0,2})(\d{0,3})(\d{0,2})(\d{0,2})/);
  referenceToPhoneInput.current.value = !phoneNumberValue[2]
    ? `+380 ${phoneNumberValue[1]}`
    : `+380 (${phoneNumberValue[1]}) ${phoneNumberValue[2]}${`${
        phoneNumberValue[3] ? `-${phoneNumberValue[3]}` : ''
      }`}${`${phoneNumberValue[4] ? `-${phoneNumberValue[4]}` : ''}`}`;
  const numbers = referenceToPhoneInput.current.value.replace(/(\D)/g, '');
  if (numbers === '380') return setStateFunction(''); 
  setStateFunction(numbers);
};
// specify card owner
export const ownerInputSequence = (referenceToOwnerInput, setStateFunction) => {
  const something = referenceToOwnerInput.current.value.replace(
    /[^a-zA-Zа-яА-Я ]/g, '');
  const ownerValue =
    (something.includes(' ') &&
    something[something.length - 1]!==' ')
      ? something.split(' ')
      : [something];
  
  referenceToOwnerInput.current.value = !ownerValue[1]
      ? `${ownerValue[0].replace(/^[a-zа-я]/, (x) => x.toUpperCase())}`
      : `${ownerValue[0].replace(/^[a-zа-я]/, (x) =>
          x.toUpperCase()
        )} ${ownerValue[1].replace(/^[a-zа-я]/, (x) => x.toUpperCase())}${
          ownerValue[2]? ` ${ownerValue[2].replace(/^[a-zа-я]/, (x) => x.toUpperCase())}`
            : ''
        }`;
    setStateFunction(ownerValue.join(' '));
};
    
// classes to be assigned for separate inputs with respect to status (default/active/filled):
export function assignInputClass(nameOfInput, { email, code, card, amount, month, year, phone, owner} = formInputValues, styles) {
  let scheme;
  switch (nameOfInput) {
    case 'email':
      scheme = `${
        String(email).includes('@') && String(email).includes('.')
          ? styles['inputFilled']
          : ''
      }`;
      break;
    case 'code':
      scheme = `${String(code).length === 3 ? styles['inputFilled'] : ''}`;
      break;
    case 'cardNumber':
      scheme = `${String(card).length === 16 ? styles['inputFilled'] : ''}`;
      break;
    case 'amount':
      scheme = `${amount > 0 ? styles['inputFilled'] : ''}`;
      break;
    case 'complexInput':
      scheme = ` ${
        String(month).length === 2 && String(year).length === 2
          ? styles['inputFilled']
          : ''
      }`;
      break;
    case 'phone':
      scheme = `${String(phone).match(/380\d{9}/) ? styles['inputFilled'] : ''}`;
      break;
    case 'owner':
      scheme = `${
        String(owner).match(
          /([a-zA-Zа-яА-ЯіїєІЇЄ]+)\s([a-zA-Zа-яА-ЯіїєІЇЄ]+)\s([a-zA-Zа-яА-ЯіїєІЇЄ]+)/
        ) &&
        String(owner).match(
          /([a-zA-Zа-яА-ЯіїєІЇЄ]+)\s([a-zA-Zа-яА-ЯіїєІЇЄ]+)\s([a-zA-Zа-яА-ЯіїєІЇЄ]+)/
        ).length === 4
          ? styles['inputFilled']
          : 'ТЩ'
      }`; break;
    default:
      scheme = 1;
  }
  return scheme;
}
// function to visualize the status of inputs required for checking, before form submit.
// if inputs contain class 'inputFilled' - the status is Ok, and the form data may be sent
//otherwise, the function assignes the class input__invalid / label__invalid to corresponding elements
// also, data-attriubute is assigned, with error text message to be displayed in pseudo-elements. 
export const validationOfInputFields = (arrayOfInputsToValidate, arrayOfErrorMessages, setStateFunction, styles) => {

  const checkResult = arrayOfInputsToValidate
      .map((el, index) => {
        const elementLabel = el.current ? el.current.parentNode : null;
        if (elementLabel && elementLabel.hasAttribute('data-attribute')) {
          elementLabel.removeAttribute('data-attribute');
        }
        if (
          elementLabel &&
          elementLabel.classList.contains(styles['label__invalid'])
        ) {
          elementLabel.classList.remove(styles['label__invalid']);
        }

        if (el.current && el.current.classList.contains(styles['inputFilled'])) {
          return true;
        } else {
          el.current.classList.add(styles['input__invalid']);
          elementLabel.classList.add(styles['label__invalid']);
          elementLabel.setAttribute(
            'data-attribute',
            arrayOfErrorMessages[index]
          );
          return false;
        }
      })
      .every((el) => el === true);
    return setStateFunction(checkResult);
  };

