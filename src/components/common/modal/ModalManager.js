import React from "react";
import { useSelector } from "react-redux";
import LoginForm from "../../auth/LoginForm";
import RegisterForm from "../../auth/RegisterForm";
import UnAuthModal from "../../auth/UnAuthModal";
export default function ModalManager() {
  const modalLookup = { LoginForm, RegisterForm, UnAuthModal };
  const currentModal = useSelector((state) => state.modal);
  let renderedModal;
  if (currentModal) {
    const { modalType, modalProps } = currentModal;
    const ModalComponent = modalLookup[modalType];
    renderedModal = <ModalComponent {...modalProps} />;
  }
  return <span>{renderedModal}</span>;
}
