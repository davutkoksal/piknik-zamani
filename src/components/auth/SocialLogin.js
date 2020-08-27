import React from "react";
import { Button } from "semantic-ui-react";
import { useDispatch } from "react-redux";
import { closeModal } from "../common/modal/ModalReducer";
import { socialLogin } from "../firestore/firebaseService";

export default function SocialLogin() {
  const dispatch = useDispatch();

  function handleSocialLogin(provider) {
    dispatch(closeModal());
    socialLogin(provider);
  }

  return (
    <>
      <Button
        onClick={() => handleSocialLogin("google")}
        icon="google"
        fluid
        color="google plus"
        content="Google Hesabı ile Giriş Yap"
      />
    </>
  );
}
