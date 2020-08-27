import React from "react";
import { Segment, Header, Button, Label } from "semantic-ui-react";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import TextInput from "../common/form/TextInput";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { updateUserPassword } from "../firestore/firebaseService";

export default function AccountPage() {
  const { currentUser } = useSelector((state) => state.auth);
  return (
    <Segment>
      <Header dividing size="large" content="Hesabım" />
      {currentUser.providerId === "password" && (
        <>
          <Header color="teal" content="Şifremi Değiştir" />
          <p>Şifrenizi Değiştirmek İçin Bu Formu Kullanın</p>
          <Formik
            initialValues={{ newPassword1: "", newPassword2: "" }}
            validationSchema={Yup.object({
              newPassword1: Yup.string().required("Şifrenizi girmeniz gerekli"),
              newPassword2: Yup.string().oneOf(
                [Yup.ref("newPassword1"), null],
                "Passwords do not match"
              ),
            })}
            onSubmit={async (values, { setSubmitting, setErrors }) => {
              try {
                await updateUserPassword(values);
              } catch (error) {
                setErrors({ auth: error.message });
              } finally {
                setSubmitting(false);
              }
            }}
          >
            {({ errors, isSubmitting, isValid, dirty }) => (
              <Form className="ui form">
                <TextInput
                  name="newPassword1"
                  type="password"
                  placeholder="Yeni Şifre"
                />
                <TextInput
                  name="newPassword2"
                  type="password"
                  placeholder="Şifreyi Tekrar Giriniz"
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
                  style={{ display: "block" }}
                  type="submit"
                  disabled={!isValid || isSubmitting || !dirty}
                  loading={isSubmitting}
                  size="large"
                  positive
                  content="Şifreyi Değiştir"
                />
              </Form>
            )}
          </Formik>
        </>
      )}

      {currentUser.providerId === "google.com" && (
        <>
          <Header color="teal" sub content="Google account" />
          <p>
            Hesabınızı Güncellemek için Lütfen Google Sayfasını Ziyaret Edin
          </p>
          <Button
            icon="google"
            color="google plus"
            as={Link}
            to="https://google.com"
            content="Go to Google"
          />
        </>
      )}
    </Segment>
  );
}
