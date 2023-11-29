import React from 'react';
import Modal from 'react-modal';

export function PopUp(props: { isOpen: boolean }) {
  return <Modal isOpen={props.isOpen}></Modal>;
}
