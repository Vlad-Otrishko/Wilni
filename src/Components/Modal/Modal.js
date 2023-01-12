import { useState, useEffect } from 'react';
import s from './Modal.module.css';
import Menu from '../Menu';

function Modal({ modalStatus, modalSwitch, showSelectIcon}) {
    // [showModal, setShowModal] = useState('off');
    // useEffect(() => {
    //     return setShowModal(modalStatus);
    // },[]
    // );
    console.log(modalStatus);
    return (
      modalStatus === 'on' && (
        <div className={s.modalWindow}>
          <div className={'container'}>
            <Menu modalSwitch={modalSwitch} showSelectIcon={showSelectIcon} />
          </div>
        </div>
      )
    );
}
export default Modal;