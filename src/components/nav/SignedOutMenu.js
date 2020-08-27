import React from "react";
import { Menu, Button } from "semantic-ui-react";
import { useDispatch } from "react-redux";
import { openModal } from "../common/modal/ModalReducer";

export default function SignedOutMenu() {
  const dispatch = useDispatch();
  return (
    <Menu.Item position="right">
      <Button
        basic
        inverted
        content="Giriş"
        style={{ marginRight: "0.5rem" }}
        onClick={() => dispatch(openModal({ modalType: "LoginForm" }))}
      />
      <Button
        basic
        inverted
        content="Üye Ol"
        onClick={() => dispatch(openModal({ modalType: "RegisterForm" }))}
      />
    </Menu.Item>
  );
}
