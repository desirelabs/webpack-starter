import React from 'react'
import PropTypes from 'prop-types'

import {
  Button,
  Modal
} from 'react-bootstrap'

const ModalComponent = ({showModal, headerMessage, bodyMessage, onCancel, onConfirm}) => (
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
      <Button onClick={() => onCancel()}>Annuler</Button>
      <Button onClick={() => onConfirm()} bsStyle='primary'>Confirmer</Button>
    </Modal.Footer>
  </Modal>
)

ModalComponent.propTypes = {
  showModal: PropTypes.bool,
  headerMessage: PropTypes.string,
  bodyMessage: PropTypes.string,
  onCancel: PropTypes.func,
  onConfirm: PropTypes.func
}

export default ModalComponent
