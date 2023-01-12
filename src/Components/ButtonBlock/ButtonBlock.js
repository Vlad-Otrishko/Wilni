import s from './ButtonBlock.module.css';
import Button from '../Button';

function ButtonBlock() {

    return (
      <section className={s.buttonBlock}>
        <Button
          componentType="link"
          text="ПІДТРИМАТИ"
          componentClass="typeOneLink"
          destination="/donate/privatbank"
          externalClass={s.supportButton}
        />
        <Button
          componentType="link"
          text="РЕГУЛЯРНИЙ ДОНАТ"
          componentClass="typeTwoLink"
          destination="/regular_donation"
          externalClass={s.regularDonationButton}
        />
      </section>
    );
}

export default ButtonBlock;