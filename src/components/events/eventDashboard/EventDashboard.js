import React, { useEffect, useRef } from "react";
import { Grid, Ref } from "semantic-ui-react";
import { useDispatch, useSelector } from "react-redux";
import {
  ListenToEventsFromFirestore,
  ListenToActivitiesFromFirestore,
} from "../../firestore/firestoreService";
import { listenToEvents } from "../actions/EventActions";
import EventList from "./EventList";
import LoadingComponent from "../../common/LoadingComponent";
import { Redirect } from "react-router-dom";
import EventDashboardSidebar from "./EventDashboardSidebar";
import { listenToActivities } from "../actions/ActivityReducer";
import {
  asyncActionStart,
  asyncActionFinish,
  asyncActionError,
} from "../../async/AsyncReducer";
import { dataFromSnapshot } from "../../firestore/firestoreService";

export default function EventDashboard() {
  const dispatch = useDispatch();
  const contextRef = useRef();
  const { loading, error } = useSelector((state) => state.async);
  const { events } = useSelector((state) => state.events);
  const { activities } = useSelector((state) => state.activity);

  useEffect(() => {
    dispatch(asyncActionStart());
    const events = ListenToEventsFromFirestore().onSnapshot(
      (snapshot) => {
        const docs = snapshot.docs.map((doc) => dataFromSnapshot(doc));
        dispatch(listenToEvents(docs));
        dispatch(asyncActionFinish());
      },
      (error) => dispatch(asyncActionError(error))
    );
    const activities = ListenToActivitiesFromFirestore().onSnapshot(
      (snapshot) => {
        const docs = snapshot.docs.map((doc) => dataFromSnapshot(doc));
        dispatch(listenToActivities(docs));
        dispatch(asyncActionFinish());
      },
      (error) => dispatch(asyncActionError(error))
    );
    return () => (events, activities);
  }, [dispatch]);

  if (loading || (!events && !error))
    return <LoadingComponent content="Yükleniyor..." />;

  if (error) return <Redirect to="/error" />;

  return (
    <Grid stackable>
      <Grid.Column width={11}>
        <Ref innerRef={contextRef}>
          <EventList events={events} />
        </Ref>
      </Grid.Column>

      <Grid.Column width={5}>
        <EventDashboardSidebar
          activities={activities}
          contextRef={contextRef}
        />
      </Grid.Column>
    </Grid>
  );
}
