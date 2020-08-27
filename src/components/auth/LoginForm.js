import React from "react";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import { Button, Label, Divider } from "semantic-ui-react";
import { useDispatch } from "react-redux";
// import SocialLogin from "./SocialLogin";
import ModalWrapper from "../common/modal/ModalWrapper";
import TextInput from "../common/form/TextInput";
import { closeModal } from "../common/modal/ModalReducer";
import { signInWithEmail } from "../firestore/firebaseService";
import SocialLogin from "./SocialLogin";

export default function LoginForm() {
  const dispatch = useDispatch();

  return (
    <ModalWrapper size="mini" header="Piknik-Zamanı Giriş Yap">
      <Formik
        initialValues={{ email: "", password: "" }}
        validationSchema={Yup.object({
          email: Yup.string()
            .required("Geçerli bir email adresi giriniz!")
            .email(),
          password: Yup.string().required("Şifre giriniz"),
        })}
        onSubmit={async (values, { setSubmitting, setErrors }) => {
          try {
            await signInWithEmail(values);
            setSubmitting(false);
            dispatch(closeModal());
          } catch (error) {
            setErrors({ auth: "Email Adresi veya Şifre Hatalı" });
            setSubmitting(false);
          }
        }}
      >
        {({ isSubmitting, isValid, dirty, errors }) => (
          <Form className="ui form">
            <TextInput name="email" placeholder="Email Address" />
            <TextInput name="password" placeholder="Password" type="password" />
            {errors.auth && (
              <Label
                basic
                color="red"
                style={{ marginBottom: 10 }}
                content={errors.auth}
              />
            )}
            <Button
              loading={isSubmitting}
              disabled={!isValid || !dirty || isSubmitting}
              type="submit"
              fluid
              size="large"
              color="teal"
              content="Giriş"
            />
            <Divider horizontal>Veya</Divider>
            <SocialLogin />
          </Form>
        )}
      </Formik>
    </ModalWrapper>
  );
}
