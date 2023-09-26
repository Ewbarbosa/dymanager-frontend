import Modal from 'react-modal'
import { Form } from '../Form'

import { FiX } from 'react-icons/fi'

interface ModalClientProps {
  isOpen: boolean;
  onRequestClose: () => void;
}

export function ModalFormClient({ isOpen, onRequestClose }: ModalClientProps) {

  const customStyles = {
    content: {
      //top: '80%',
      //bottom: 'auto',
      //left: '80%',
      //right: 'auto',
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
        className='react-modal-close'
        style={{background: 'transparent', border: 0}}>
          <FiX size={45} color='#f34748'/>
      </button>
      <Form />
    </Modal>
  )
}