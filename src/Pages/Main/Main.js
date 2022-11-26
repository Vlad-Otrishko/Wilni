import s from './Main.module.css';
import BannerLinks from '../../Components/BannerLinks';
import Button from '../../Components/Button';
import Slider from '../../Components/Slider';

import heroImagePath from './pictures/hero/team.jpg';
import picture1 from './pictures/chevron.jpg';
import picture2 from './pictures/flack_jacket.jpg';
import picture3 from './pictures/delivery.jpg';
import picture4 from './pictures/bag_open.jpg';



function Main() {
  return (
    <>
      <main className={s.main}>
        <BannerLinks pageName='main'/>
        <section className={s.chrono}>
          <Slider />
          <div className={s.chronoTextBlock}>
            <p className={s.chronoDate}>17.07.2022</p>
            <h2 className={s.chronoTitle}>
              24-го лютого 2022 року російська армія здійснила напад на Україну
            </h2>
            <p className={s.chronoText}>
              Вся Україна об’єдналась заради миру та навколо спільної справи -
              допомоги потребуючим, нашим захисникам, захисту рідного міста та
              держави.
            </p>
            <p className={s.chronoText + ' ' + s.chronoPagination}>
              Хронологія подій з 1-го дня
            </p>
          </div>
        </section>
        <section className={s.hero}>
          <h1 className={s.heroTitle}>Про фонд</h1>
          <div className={s.heroImageFrame}>
            <img
              src={heroImagePath}
              alt="volunteer team"
              className={s.heroImage}
            />
          </div>
          <div className={s.heroTextBlock}>
            <p className={s.heroText}>
              <span className={s.accentedText}>
                Благодійний Фонд «АНТИТІЛА» –
              </span>
              некомерційна благодійна організація, заснована в м.Києві
              музикантами гурту Антитіла.
              <br /> Сьогодні, під час широкомасштабної російської агресії проти
              України, музиканти гурту Антитіла з першого дня війни несуть
              службу у підрозділах 130 батальйону ТРО, а БФ «Антитіла» посилює
              свою роботу з допомоги Збройним Силам України, а також цивільним
              особам, і визначає{' '}
              <span className={s.accentedText}>
                три основних напрямки роботи:
              </span>
            </p>
            <ul className={s.heroList + ' ' + 'reset-list'}>
              <li className={s.heroListItem}>
                Підтримка ЗСУ засобами захисту, розвідки і медицини
              </li>
              <li className={s.heroListItem}>
                Підтримка дітей та сімей загиблих військових
              </li>
              <li className={s.heroListItem}>
                Фінансування інноваційних військових розробок у галузі
                робототехніки та авіабудування
              </li>
            </ul>
          </div>
          <Button
            componentType="link"
            text="ДОКЛАДНІШЕ"
            componentClass="typeTwoLink"
            destination=""
            externalClass={s.mainShowMore}
          />
        </section>
        <section className={s.banners}>
          <ul className={s.bannersList + ' ' + 'reset-list'}>
            <li className={s.banner}>
              <img src={picture1} alt="шеврон" className={s.bannerImage} />
              <div className={s.bannerTextBlock}>
                <h3 className={s.bannerTitle}>
                  1,1+
                  <p className={s.titleSecondLine}>МЛН ГРН</p>
                </h3>
                <p className={s.bannerText}>
                  зібрано на потреби армії з 2014 року
                </p>
              </div>
            </li>
            <li className={s.banner}>
              <img src={picture2} alt="бронежилет" className={s.bannerImage} />
              <div className={s.bannerTextBlock}>
                <h3 className={s.bannerTitle}>
                  500+
                  <p className={s.titleSecondLine}>
                    ЗАСОБІВ <br className={s.lineBreak} />
                    ТАКТИЧНОЇ АМУНІЦІЇ
                  </p>
                </h3>
                <p className={s.bannerText}>
                  закуплено для українського війська
                </p>
              </div>
            </li>
            <li className={s.banner}>
              <img src={picture3} alt="доставка" className={s.bannerImage} />
              <div className={s.bannerTextBlock}>
                <h3 className={s.bannerTitle}>
                  200+
                  <p className={s.titleSecondLine}>
                    ТОН ГУМАНІТАРНОЇ <br className={s.lineBreak} /> ДОПОМОГИ
                  </p>
                </h3>
                <p className={s.bannerText}>
                  доставлено від початку повномасштабного вторгнення
                </p>
              </div>
            </li>
            <li className={s.banner}>
              <img
                src={picture4}
                alt="відкрита сумка"
                className={s.bannerImage}
              />
              <div className={s.bannerTextBlock}>
                <h3 className={s.bannerTitle}>
                  100+
                  <p className={s.titleSecondLine}>КОМПЛЕКТИ АПТЕЧОК</p>
                </h3>
                <p className={s.bannerText}>
                  придбано від початку повномасштабного вторгнення
                </p>
              </div>
            </li>
          </ul>
        </section>
      </main>
    </>
  );
}
export default Main;