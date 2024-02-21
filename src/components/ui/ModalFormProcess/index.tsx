import styles from './styles.module.scss'

import Modal from 'react-modal'

import { FormProcess } from '../FormProcess'

import { FiX } from 'react-icons/fi'

import { canSSRGuest } from '../../../utils/canSSRGuest';
import { setupAPIClient } from '../../../services/api';

interface ModalProcessProps {
  isOpen: boolean;
  onRequestClose: () => void;
}

export function ModalFormProcess({ isOpen, onRequestClose }: ModalProcessProps) {

  const customStyles = {
    content: {
      top: '50px',
      bottom: '10px',
      left: '10px',
      right: '10px',
      zindex: '1000',
      //padding: '30px',
      //transform: 'translate(-50%, -50%)',
      backgroundColor: '#202024'
    }
  }

  return (
    <Modal
      isOpen={isOpen}
      style={customStyles}
      onRequestClose={onRequestClose}
    >

      <button
        type='button'
        onClick={onRequestClose}
        className={styles.modal}
        style={{ background: 'transparent', border: 0 }}
      >
        <FiX size={45} color='#f34748' />
      </button>

      <FormProcess />
    </Modal >
  )

}