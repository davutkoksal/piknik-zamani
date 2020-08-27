import React from "react";
import PlaceDetailsComment from "./PlaceDetailsComment";
import PlaceDetailsHeader from "./PlaceDetailsHeader";
import PlaceDetailsInfo from "./PlaceDetailsInfo";
import { useSelector, useDispatch } from "react-redux";
import useFirestoreDoc from "../../hooks/useFirestoreDoc";
import { ListenToPlaceFromFirestore } from "../../firestore/firestoreService";
import { listenToPlaces } from "../actions/PlaceActions";
import { Grid, Segment, Button } from "semantic-ui-react";
import LoadingComponent from "../../common/LoadingComponent";
import { Redirect } from "react-router-dom";
import { openModal } from "../../common/modal/ModalReducer";

export default function PlaceDetailsPage({ history, match, state }) {
  const dispatch = useDispatch();
  const { authenticated } = useSelector((state) => state.auth);
  const { loading, error } = useSelector((state) => state.async);
  const { places } = useSelector((state) => state.places);
  const selectedPlace = places.filter((place) => place.id === match.params.id);
  const place = selectedPlace[0];

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
    <Grid reversed="mobile" stackable>
      <Grid.Column width={11}>
        <PlaceDetailsHeader place={place} />
        <PlaceDetailsInfo place={place} />
        <PlaceDetailsComment placeId={place.id} />
      </Grid.Column>
      <Grid.Column width={5}>
        <Segment>
          {authenticated ? (
            <Button
              onClick={() => history.push(`/createEvent/${place.id}`)}
              fluid
              positive
              content="Burada Piknik Düzenle"
            />
          ) : (
            <Button
              onClick={() => dispatch(openModal({ modalType: "UnAuthModal" }))}
              fluid
              positive
              content="Burada Piknik Düzenle"
            />
          )}
        </Segment>
      </Grid.Column>
    </Grid>
  );
}
