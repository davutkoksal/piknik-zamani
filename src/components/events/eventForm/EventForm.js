import React from "react";
import { Segment, Button } from "semantic-ui-react";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import { citiesWithoutHepsiOption } from "../../common/Options";
import TextInput from "../../common/form/TextInput";
import SelectInput from "../../common/form/SelectInput";
import DateInput from "../../common/form/DateInput";
import TextArea from "../../common/form/TextArea";
import EventFormMap from "./EventFormMap";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import useFirestoreDoc from "../../hooks/useFirestoreDoc";
import {
  ListenToPlaceFromFirestore,
  addEventToFirestore,
} from "../../firestore/firestoreService";
import { listenToPlaces } from "../../places/actions/PlaceActions";
import LoadingComponent from "../../common/LoadingComponent";
import { Redirect } from "react-router-dom";
import { toast } from "react-toastify";

export default function EventForm({ match, history }) {
  const validationSchema = Yup.object({
    title: Yup.string().required("Bu alanı boş bırakamazsınız"),
    city: Yup.string().required("Bu alanı boş bırakamazsınız"),
    description: Yup.string().required("Bu alanı boş bırakamazsınız"),
    venue: Yup.string().required("Bu alanı boş bırakamazsınız"),
    date: Yup.string().required("Bu alanı boş bırakamazsınız"),
  });

  const dispatch = useDispatch();
  const { loading, error } = useSelector((state) => state.async);
  const { places } = useSelector((state) => state.places);
  const selectedPlace = places.filter((place) => place.id === match.params.id);
  const [place] = selectedPlace;
  let initialCoord;
  if (place) {
    initialCoord = place?.venue.latLng;
  }
  const [coord, setCoord] = useState(initialCoord);

  useFirestoreDoc({
    shouldExecute: !!match.params.id,
    query: () => ListenToPlaceFromFirestore(match.params.id),
    data: (place) => dispatch(listenToPlaces([place])),
    deps: [match.params.id],
  });

  if (loading || (!place && !error))
    return <LoadingComponent content="Yükleniyor..." />;

  if (error) return <Redirect to="/error" />;

  return (
    <Segment>
      <Formik
        initialValues={place}
        validationSchema={validationSchema}
        onChange={(values) => console.log(values)}
        onSelect={(values) => console.log(values)}
        onSubmit={async (values, { setSubmitting }) => {
          try {
            await addEventToFirestore(values);
            history.push("/events");
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
            <SelectInput
              name="city"
              label="Piknik Yerinin Bulunduğu Şehir"
              options={citiesWithoutHepsiOption}
              placeholder="Adana"
            />

            <TextInput
              name="venue.address"
              label="Piknik Yerinin Konumu"
              placeholder="Lütfen GOOGLE tarafından sunulan seçenekler doğrultusunda bir konum girin "
            />
            <DateInput
              name="date"
              label="Piknik Etkinliğinin Tarihi"
              placeholder="Lütfen Bir Tarih Seçin"
              autoComplete="off"
            />
            <EventFormMap latLng={coord} />
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
