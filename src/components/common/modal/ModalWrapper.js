import React from "react";
import { Modal } from "semantic-ui-react";
import { closeModal } from "./ModalReducer";
import { useDispatch } from "react-redux";

export default function ModalWrapper({ children, size, header }) {
  const dispatch = useDispatch();
  return (
    <Modal open={true} onClose={() => dispatch(closeModal())} size={size}>
      {header && <Modal.Header>{header}</Modal.Header>}
      <Modal.Content> {children}</Modal.Content>
    </Modal>
  );
}
