import React from "react";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import { Button, Label } from "semantic-ui-react";
import { useDispatch } from "react-redux";
import ModalWrapper from "../common/modal/ModalWrapper";
import TextInput from "../common/form/TextInput";
import { closeModal } from "../common/modal/ModalReducer";
import { registerInFirebase } from "../firestore/firebaseService";

export default function RegisterForm() {
  const dispatch = useDispatch();

  return (
    <ModalWrapper size="mini" header="Piknik-Zamanı Sayfasına Üye Ol">
      <Formik
        initialValues={{ displayName: "", email: "", password: "" }}
        validationSchema={Yup.object({
          displayName: Yup.string().required("Kullanıcı adı giriniz!"),
          email: Yup.string()
            .required("Geçerli bir email adresi giriniz!")
            .email(),
          password: Yup.string().required("Şifre giriniz"),
        })}
        onSubmit={async (values, { setSubmitting, setErrors }) => {
          try {
            await registerInFirebase(values);
            setSubmitting(false);
            dispatch(closeModal());
          } catch (error) {
            setErrors({
              auth: "Kullanıcı Adı, Email Adresi veya Şifre Hatalı",
            });
            setSubmitting(false);
          }
        }}
      >
        {({ isSubmitting, isValid, dirty, errors }) => (
          <Form className="ui form">
            <TextInput
              name="displayName"
              placeholder="Kullanıcı Adı"
              autoComplete="off"
            />
            <TextInput
              name="email"
              placeholder="Email Address"
              autoComplete="off"
            />
            <TextInput
              name="password"
              placeholder="Password"
              type="password"
              autoComplete="off"
            />
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
              content="Üye Ol"
            />
          </Form>
        )}
      </Formik>
    </ModalWrapper>
  );
}
