import React from "react";
import ModalWrapper from "../common/modal/ModalWrapper";
import { Button, Divider } from "semantic-ui-react";
import { useDispatch } from "react-redux";
import { openModal, closeModal } from "../common/modal/ModalReducer";
import { useHistory } from "react-router-dom";

export default function UnAuthModal() {
  const history = useHistory();
  const dispatch = useDispatch();
  function handleClose() {
    dispatch(closeModal());
    history.push("/places");
  }

  function handleOpen(type) {
    if (type === "login") {
      dispatch(openModal({ modalType: "LoginForm" }));
    }
    if (type === "register") {
      dispatch(openModal({ modalType: "RegisterForm" }));
    }
  }
  return (
    <ModalWrapper
      size="mini"
      header="Devam Edebilmek Giriş Yapın Veya Üye Olun"
    >
      <Button
        fluid
        color="teal"
        content="Giriş"
        onClick={handleOpen.bind(this, "login")}
      />
      <Divider horizontal content="veya" />
      <Button
        fluid
        color="green"
        content="Üye Ol"
        onClick={handleOpen.bind(this, "register")}
      />

      <Divider />
      <div style={{ textAlign: "center" }}>
        <p>Misafir Olarak Devam Etmek İçin İptal'i Tıklayın</p>
        <Button fluid color="red" content="İptal" onClick={handleClose} />
      </div>
    </ModalWrapper>
  );
}
