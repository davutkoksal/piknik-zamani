import React from "react";
import { Segment, Button } from "semantic-ui-react";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import { citiesWithoutHepsiOption } from "../../common/Options";
import TextInput from "../../common/form/TextInput";
import SelectInput from "../../common/form/SelectInput";
import PlaceInput from "../../common/form/PlaceInput";
import TextArea from "../../common/form/TextArea";
import PlaceFormMap from "./PlaceFormMap";
import { useState } from "react";
import { addPlaceToFirestore } from "../../firestore/firestoreService";
import { toast } from "react-toastify";

export default function PlaceForm({ history }) {
  const initialValues = {
    title: "",
    city: "",
    description: "",
    placehostPhotoURL: "",
    venue: "",
  };
  const initialCoord = { lat: 39.9333635, lng: 32.8597419 };
  const [coord, setCoord] = useState(initialCoord);
  const validationSchema = Yup.object({
    title: Yup.string().required("Bu alanı boş bırakamazsınız"),
    city: Yup.string().required("Bu alanı boş bırakamazsınız"),
    placehostPhotoURL: Yup.string().required("Bu alanı boş bırakamazsınız"),
    description: Yup.string().required("Bu alanı boş bırakamazsınız"),
    venue: Yup.string().required("Bu alanı boş bırakamazsınız"),
  });

  return (
    <Segment>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onChange={(values) => console.log(values)}
        onSelect={(values) => console.log(values)}
        onSubmit={async (values, { setSubmitting }) => {
          try {
            await addPlaceToFirestore(values);
            history.push("/places");
            setCoord(values.venue.latLng);
          } catch (error) {
            toast.error(error.message);
            setSubmitting(false);
          }
        }}
      >
        {({ isValid, isSubmitting, dirty }) => (
          <Form className="ui form">
            <TextInput
              name="title"
              label="Piknik Yerinin İsmi"
              placeholder="Örnek:Kurtboğazı Barajı Pikink Alanı, vb."
              autoComplete="off"
            />
            <TextArea
              name="description"
              label="Piknik Yeri Hakkında Detaylı Bilgi"
              placeholder="Ulaşım, konum, hava durumu, dikkat edilmesi gerekenler, vb."
            />
            <TextInput
              name="placehostPhotoURL"
              label="Piknik Yerinin Fotoğrafı"
              placeholder="Bir Url Adresi Giriniz"
              autoComplete="off"
            />
            <SelectInput
              name="city"
              label="Piknik Yerinin Bulunduğu Şehir"
              options={citiesWithoutHepsiOption}
              placeholder="Adana"
            />
            <PlaceInput
              name="venue"
              label="Piknik Yerinin Bulunduğu Konum"
              placeholder="Lütfen GOOGLE tarafından sunulan seçenekler doğrultusunda bir konum girin "
              setCoord={setCoord}
            />

            <PlaceFormMap latLng={coord} />
            <Button
              loading={isSubmitting}
              disabled={isSubmitting || !isValid || !dirty}
              type="submit"
              content="Ekle"
            />
            <Button
              primary
              content="İptal"
              onClick={() => history.push("/places")}
            />
          </Form>
        )}
      </Formik>
    </Segment>
  );
}
