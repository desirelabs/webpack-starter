// @flow
import React from 'react'
import { Button, Modal } from 'react-bootstrap'

type Props = {
  showModal: boolean,
  headerMessage: string,
  bodyMessage: string,
  onCancel: Function,
  onConfirm: Function
}

const ModalComponent = ({showModal, headerMessage, bodyMessage, onCancel, onConfirm}: Props) => (
  <Modal show={showModal} onHide={() => onCancel()}>
    <Modal.Header>
      <Modal.Title>
        {headerMessage}
      </Modal.Title>
    </Modal.Header>
    <Modal.Body>
      {bodyMessage}
    </Modal.Body>
    <Modal.Footer>
      <Button className='btn-cancel' onClick={() => onCancel()}>Annuler</Button>
      <Button className='btn-confirm' onClick={() => onConfirm()} bsStyle='primary'>Confirmer</Button>
    </Modal.Footer>
  </Modal>
)

export default ModalComponent
