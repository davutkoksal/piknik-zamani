import React from "react";
import EventListItem from "./EventListItem";

export default function EventList({ events }) {
  return (
    <div>
      {events &&
        events.map((event) => <EventListItem key={event.id} event={event} />)}
    </div>
  );
}
