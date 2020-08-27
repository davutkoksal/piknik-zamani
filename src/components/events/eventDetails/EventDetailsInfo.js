import React, { useState } from "react";
import { Segment, Grid, Icon, Button } from "semantic-ui-react";
import EventDetailsMap from "./EventDetailsMap";

export default function EventDetailsInfo({ event }) {
  const [map, setMap] = useState(false);
  const date =
    event.date &&
    event.date.toLocaleDateString("tr", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  return (
    <Segment.Group>
      <Segment attached="top">
        <Grid>
          <Grid.Column width={1}>
            <Icon size="large" color="teal" name="info" />
          </Grid.Column>
          <Grid.Column width={15}>
            <p>{event.description}</p>
          </Grid.Column>
        </Grid>
      </Segment>
      <Segment attached>
        <Grid verticalAlign="middle">
          <Grid.Column width={1}>
            <Icon name="calendar" size="large" color="teal" />
          </Grid.Column>
          <Grid.Column width={15}>
            <span>{date}</span>
          </Grid.Column>
        </Grid>
      </Segment>
      <Segment attached>
        <Grid verticalAlign="middle">
          <Grid.Column width={1}>
            <Icon name="marker" size="large" color="teal" />
          </Grid.Column>
          <Grid.Column width={11}>
            <span>{event?.venue.address}</span>
          </Grid.Column>
          <Grid.Column width={4}>
            <Button
              color="teal"
              size="tiny"
              content={map ? "Haritayı Gizle" : "Haritayı Göster"}
              onClick={() => setMap(!map)}
            />
          </Grid.Column>
        </Grid>
      </Segment>
      {map && <EventDetailsMap event={event} />}
    </Segment.Group>
  );
}
