import React from "react";
import { Grid } from "semantic-ui-react";
import EventDetailsSidebar from "./EventDetailsSidebar";
import EventDetailsHeader from "./EventDetailsHeader";
import { useDispatch, useSelector } from "react-redux";
import { ListenToEventFromFirestore } from "../../firestore/firestoreService";
import useFirestoreDoc from "../../hooks/useFirestoreDoc";
import { listenToEvents } from "../actions/EventActions";
import LoadingComponent from "../../common/LoadingComponent";
import { Redirect } from "react-router-dom";
import EventDetailsInfo from "./EventDetailsInfo";

export default function EventDetailsPage({ match }) {
  const dispatch = useDispatch();
  const { loading, error } = useSelector((state) => state.async);
  const { currentUser } = useSelector((state) => state.auth);
  const { events } = useSelector((state) => state.events);
  const event = events?.find((event) => event.id === match.params.id);
  const isHost = event?.hostUid === currentUser.uid;
  const isGoing = event?.attendees.some(
    (attendee) => attendee.id === currentUser.uid
  );

  useFirestoreDoc({
    query: () => ListenToEventFromFirestore(match.params.id),
    data: (event) => dispatch(listenToEvents([event])),
    deps: [match.params.id],
  });

  if (loading || (!event && !error))
    return <LoadingComponent content="Yükleniyor..." />;

  if (error) return <Redirect to="/error" />;
  return (
    <Grid stackable>
      <Grid.Column width={10}>
        <EventDetailsHeader event={event} isGoing={isGoing} isHost={isHost} />
        <EventDetailsInfo event={event} />
      </Grid.Column>
      <Grid.Column width={6}>
        <EventDetailsSidebar
          attendees={event?.attendees}
          hostUid={event.hostUid}
        />
      </Grid.Column>
    </Grid>
  );
}
