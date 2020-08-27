import React from "react";
import { Formik, Form } from "formik";
import TextInput from "../../common/form/TextInput";
import TextArea from "../../common/form/TextArea";
import { Button } from "semantic-ui-react";
import * as Yup from "yup";
import { toast } from "react-toastify";
import { updateUserProfile } from "../../firestore/firestoreService";

export default function ProfileForm({ profile }) {
  return (
    <Formik
      initialValues={{
        displayName: profile.displayName,
        description: profile.description || "",
      }}
      validationSchema={Yup.object({
        displayName: Yup.string().required(),
      })}
      onSubmit={async (values, { setSubmitting }) => {
        try {
          await updateUserProfile(values);
        } catch (error) {
          toast.error(error.message);
        } finally {
          setSubmitting(false);
        }
      }}
    >
      {({ isSubmitting, isValid, dirty }) => (
        <Form className="ui form">
          <TextInput name="displayName" placeholder="Kullanıcı Adı" />
          <TextArea name="description" placeholder="Kendinden Bahset" />
          <Button
            loading={isSubmitting}
            disabled={isSubmitting || !isValid || !dirty}
            floated="right"
            type="submit"
            size="large"
            positive
            content="Profili Güncelle"
          />
        </Form>
      )}
    </Formik>
  );
}
