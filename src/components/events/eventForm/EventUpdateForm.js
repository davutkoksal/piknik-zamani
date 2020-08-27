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

import { useDispatch, useSelector } from "react-redux";
import useFirestoreDoc from "../../hooks/useFirestoreDoc";
import {
  ListenToEventFromFirestore,
  updateEventInFirestore,
} from "../../firestore/firestoreService";

import LoadingComponent from "../../common/LoadingComponent";
import { Redirect } from "react-router-dom";
import { toast } from "react-toastify";
import { listenToEvents } from "../actions/EventActions";

export default function EventUpdateForm({ match, history }) {
  //   let initialCoord = {};
  //   const [coord, setCoord] = useState(initialCoord);
  const dispatch = useDispatch();
  const { loading, error } = useSelector((state) => state.async);
  const { events } = useSelector((state) => state.events);
  const event = events?.find((event) => event.id === match.params.id);

  useFirestoreDoc({
    query: () => ListenToEventFromFirestore(match.params.id),
    data: (event) => dispatch(listenToEvents([event])),
    deps: [match.params.id],
  });

  const validationSchema = Yup.object({
    title: Yup.string().required("Bu alanı boş bırakamazsınız"),
    city: Yup.string().required("Bu alanı boş bırakamazsınız"),
    description: Yup.string().required("Bu alanı boş bırakamazsınız"),
    venue: Yup.string().required("Bu alanı boş bırakamazsınız"),
    date: Yup.string().required("Bu alanı boş bırakamazsınız"),
  });

  if (loading || (!event && !error))
    return <LoadingComponent content="Yükleniyor..." />;

  if (error) return <Redirect to="/error" />;

  return (
    <Segment>
      <Formik
        enableReinitialize
        initialValues={event}
        validationSchema={validationSchema}
        onChange={(values) => console.log(values)}
        onSelect={(values) => console.log(values)}
        onSubmit={async (values, { setSubmitting }) => {
          try {
            await updateEventInFirestore(values);
            history.push("/events");
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
            <EventFormMap latLng={event.venue.latLng} />
            <Button
              disabled={isSubmitting || !isValid || !dirty}
              type="submit"
              content="Güncelle"
            />
          </Form>
        )}
      </Formik>
    </Segment>
  );
}
