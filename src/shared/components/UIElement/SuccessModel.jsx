import React from 'react'
import Button from '../FormElements/Button'
import Modal from './Modal';

const SuccessModal = props => {
  return (
    <Modal
      onCancel={props.onClear}
      header={props.header || "An Error Occurred!"}
      show={!!props.successMessage}
      footer={<Button onClick={props.onClear}>Okay</Button>}
    >
      <p>{props.successMessage}</p>
    </Modal>
  );
};

export default SuccessModal;
