import React from "react";
import { Grid, Segment, Button } from "semantic-ui-react";
import PlaceList from "./PlaceList";
import { useSelector, useDispatch } from "react-redux";
import { listenToPlaces } from "../actions/PlaceActions";
import useFirestoreCollection from "../../hooks/useFirestoreCollection";
import {
  ListenToPlacesFromFirestore,
  ListenToFilteredPlacesFromFirestore,
} from "../../firestore/firestoreService";
import SelectInput from "../../common/form/SelectInput";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import { toast } from "react-toastify";
import { cities } from "../../common/Options";
import { asyncActionStart, asyncActionFinish } from "../../async/AsyncReducer";
import { openModal } from "../../common/modal/ModalReducer";

export default function PlaceDashboard({ history }) {
  const { authenticated } = useSelector((state) => state.auth);
  const initialValues = { city: "" };
  const validationSchema = Yup.object({
    city: Yup.string().required("Bu alanı boş bırakamazsınız"),
  });
  const dispatch = useDispatch();
  const { places } = useSelector((state) => state.places);
  useFirestoreCollection({
    query: () => ListenToPlacesFromFirestore(),
    data: (places) => dispatch(listenToPlaces(places)),
    deps: [dispatch],
  });

  async function handleFiltering(city) {
    try {
      dispatch(asyncActionStart());
      const result = await ListenToFilteredPlacesFromFirestore(city);
      dispatch(listenToPlaces(result));
      dispatch(asyncActionFinish());
    } catch (error) {
      console.log(error);
    }
  }
  return (
    <Grid reversed="mobile" stackable>
      <Grid.Column width={11}>
        <PlaceList places={places} />
      </Grid.Column>
      <Grid.Column width={5}>
        <Segment>
          {authenticated ? (
            <Button
              onClick={() => history.push("/createPlace")}
              fluid
              positive
              content="Piknik Yeri Ekle"
            />
          ) : (
            <Button
              onClick={() => dispatch(openModal({ modalType: "UnAuthModal" }))}
              fluid
              positive
              content="Piknik Yeri Ekle"
            />
          )}
        </Segment>
        <Segment>
          <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={(values, { setSubmitting, resetForm }) => {
              try {
                handleFiltering(values.city);
                resetForm();
              } catch (error) {
                toast.error(error.message);
              } finally {
                setSubmitting(false);
              }
            }}
          >
            {({ isValid, isSubmitting, dirty }) => (
              <Form className="ui form">
                <SelectInput
                  name="city"
                  placeholder="Tüm Şehirler"
                  options={cities}
                />
                <Button
                  loading={isSubmitting}
                  disabled={isSubmitting}
                  type="submit"
                  icon="search"
                  content="Ara"
                  fluid
                  positive
                />
              </Form>
            )}
          </Formik>
        </Segment>
      </Grid.Column>
    </Grid>
  );
}
