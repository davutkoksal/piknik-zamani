import React from "react";
import { Grid } from "semantic-ui-react";
import { useDispatch, useSelector } from "react-redux";
import { ListenToEventsFromFirestore } from "../../firestore/firestoreService";
import useFirestoreCollection from "../../hooks/useFirestoreCollection";
import { listenToEvents } from "../actions/EventActions";
import EventList from "./EventList";

export default function EventDashboard() {
  const dispatch = useDispatch();
  const { events } = useSelector((state) => state.events);
  useFirestoreCollection({
    query: () => ListenToEventsFromFirestore(),
    data: (events) => dispatch(listenToEvents(events)),
    deps: [dispatch],
  });

  return (
    <Grid>
      <Grid.Column computer={12} mobile={16}>
        <EventList events={events} />
      </Grid.Column>
    </Grid>
  );
}
