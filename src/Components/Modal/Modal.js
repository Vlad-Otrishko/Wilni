import { useState, useEffect } from 'react';
import s from './Modal.module.css';
import Menu from '../Menu';

function Modal({ modalStatus, modalSwitch}) {
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
            <Menu modalSwitch={modalSwitch} />
          </div>
        </div>
      )
    );
}
export default Modal;