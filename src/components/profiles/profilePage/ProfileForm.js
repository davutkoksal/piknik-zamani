import React from "react";
import { Formik, Form } from "formik";
import TextInput from "../../common/form/TextInput";
import TextArea from "../../common/form/TextArea";
import { Button } from "semantic-ui-react";
import * as Yup from "yup";
import { toast } from "react-toastify";
import { updateUserProfile } from "../../firestore/firestoreService";
import { interests } from "../../common/Options";
import SelectInput from "../../common/form/SelectInput";

export default function ProfileForm({ profile }) {
  return (
    <Formik
      initialValues={{
        displayName: profile.displayName,
        description: profile.description || "",
        occupation: "",
        interests: "",
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
          <TextInput name="occupation" type="text" placeholder="Mesleğiniz" />
          <SelectInput
            multiple
            name="interests"
            options={interests}
            placeholder="Sevdiğiniz Doğa Sporlarını Seçiniz"
          />
          <TextArea
            name="description"
            placeholder="Kendinden Bahset"
            rows={2}
          />
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
