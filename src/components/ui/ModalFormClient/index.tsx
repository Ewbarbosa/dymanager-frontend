import Modal from 'react-modal'
import { Form } from '../Form'

import { FiX } from 'react-icons/fi'

import styles from './styles.module.scss'

interface ModalClientProps {
  isOpen: boolean;
  onRequestClose: () => void;
}

export function ModalFormClient({ isOpen, onRequestClose }: ModalClientProps) {

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
      onRequestClose={onRequestClose}
      style={customStyles}
    >
      <button
        type='button'
        onClick={onRequestClose}
        className={styles.modal}
        style={{ background: 'transparent', border: 0 }}
      >
        <FiX size={45} color='#f34748' />
      </button>
      <Form />
    </Modal>
  )
}