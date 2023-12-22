import styles from './styles.module.scss'

import Modal from 'react-modal'

import { FormProcess } from '../FormProcess'

import { FiX } from 'react-icons/fi'

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
    >

      <button
        type='button'
      >
        <FiX size={45} color='#f34748' />        
      </button>
      <FormProcess />
    </Modal >
  )

}