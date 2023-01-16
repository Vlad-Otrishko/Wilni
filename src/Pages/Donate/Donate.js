import s from './Donate.module.css';
import { useLocation, useParams, Outlet } from 'react-router-dom';
import TextModules from '../../Components/TextModules';
import RouteTrace from '../../Components/RouteTrace';
import Navigation from '../../Components/Navigation';
import Button from '../../Components/Button';
import { nanoid } from 'nanoid';
import iconPath from './icons/sprite.svg';

function Donate() {
    const location = useLocation();
    const pathnameToArray = location.pathname.split('/').filter(Boolean);
  let pageName = pathnameToArray[0];

  const { bankChosen } = useParams();
  
  const pageContent = TextModules('donate', 'pageMainContent');
    const paymentOptions = pageContent[bankChosen].paymentOptions;
  let trackingPath = pathnameToArray.filter((el, index) => index === 0);

  const paymentOptionsAnchors =['UkrTransfer', 'cardUAH','', 'swift','payPal']
  
  function copyInformation(e) {
    console.dir(e.currentTarget.parentNode.textContent);
    const textToCopy = e.currentTarget.parentNode.textContent;
    const iconToChange = e.currentTarget.firstElementChild;
    navigator.clipboard
      .writeText(textToCopy)
      .then(() => { iconToChange.classList.add(s[`successCopyColor`]) })
      .then(setTimeout(() => iconToChange.classList.remove(s[`successCopyColor`]), 1000))
  }

    return (
      <div className={s.pageContainer}>
        <RouteTrace trackingPath={trackingPath} />
        <section className={s.donate}>
          <h1 className={s.mainTitle}>{pageContent.title}</h1>
          <p className={s.subHeading}>{pageContent.subheading}</p>
          <h2 className={s.invisibleTitle}>
            {'Опції платежів для двох банків'}
          </h2>
          <Navigation
            location={pageName}
            links={pageContent.navigation}
            imagePath={iconPath}
          />
          <ul className={s.buttonsContainer + ' ' + 'reset-list'}>
            <li className={s.buttonSpace}>
              <Button
                componentType="link"
                text="ПЛАТІЖ КАРТКОЮ"
                componentClass="typeTwoLink"
                destination="/quick_donation"
              />
            </li>
            <li className={s.buttonSpace}>
              <Button
                componentType="link"
                text="ПО УКРАЇНІ"
                componentClass="typeTwoLink"
                destination={`#${paymentOptionsAnchors[0]}`}
              />
            </li>
            <li className={s.buttonSpace}>
              <Button
                componentType="link"
                text="UAH"
                componentClass="typeTwoLink"
                destination={`#${paymentOptionsAnchors[1]}`}
              />
            </li>
            <li className={s.buttonSpace}>
              <Button
                componentType="link"
                text="SWIFT"
                componentClass="typeTwoLink"
                destination={`#${paymentOptionsAnchors[3]}`}
              />
            </li>
            <li className={s.buttonSpace}>
              <Button
                componentType="link"
                text="PAYPAL"
                componentClass="typeTwoLink"
                destination={`#${paymentOptionsAnchors[4]}`}
              />
            </li>
          </ul>
          <ul className={s.paymentOptions + ' ' + 'reset-list'}>
            {paymentOptions.map((option, index) => (
              <li
                key={nanoid()}
                id={paymentOptionsAnchors[index]}
                className={s.paymentOption}
              >
                <h3 className={s.paymentOptionTitle}>{option.title}</h3>
                <ul className={s.paymentOptionDescription + ' ' + 'reset-list'}>
                  {option.description.map((item) => (
                    <li key={nanoid()} className={s.descriptionItem}>
                      {item.name && (
                        <p className={s.descriptionItemName}>
                          {item.name}
                          {Object.keys(item).includes('copy') &&
                            item.copy === 'name' && (
                              <button
                                type="button"
                                className={s.copyButton}
                                onClick={copyInformation}
                              >
                                <svg className={s.buttonIcon}>
                                  <use href={`${iconPath}#file-copy`}></use>
                                </svg>
                              </button>
                            )}
                        </p>
                      )}
                      {item.content && (
                        <p className={s.descriptionItemContent}>
                          {item.content}
                          {Object.keys(item).includes('copy') &&
                            item.copy === 'content' && (
                              <button
                                type="button"
                                className={s.copyButton}
                                onClick={copyInformation}
                              >
                                <svg className={s.buttonIcon}>
                                  <use href={`${iconPath}#file-copy`}></use>
                                </svg>
                              </button>
                            )}
                        </p>
                      )}
                    </li>
                  ))}
                </ul>
              </li>
            ))}
          </ul>
        </section>
      </div>
    );
}
export default Donate;
