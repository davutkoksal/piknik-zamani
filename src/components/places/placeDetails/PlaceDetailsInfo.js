import React, { useState } from "react";
import { Segment, Grid, Icon, Button } from "semantic-ui-react";
import PlaceDetailsMap from "./PlaceDetailsMap";

export default function PlaceDetailsInfo({ place }) {
  const [map, setMap] = useState(false);

  return (
    <Segment.Group>
      <Segment attached="top">
        <Grid>
          <Grid.Column width={1}>
            <Icon size="large" color="teal" name="info" />
          </Grid.Column>
          <Grid.Column width={15}>
            <p>{place.description}</p>
          </Grid.Column>
        </Grid>
      </Segment>
      <Segment attached>
        <Grid verticalAlign="middle">
          <Grid.Column width={1}>
            <Icon name="marker" size="large" color="teal" />
          </Grid.Column>
          <Grid.Column width={11}>
            <span>{place?.venue.address}</span>
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
      {map && <PlaceDetailsMap place={place} />}
    </Segment.Group>
  );
}
