import React from "react";
import { Segment, Item, Image, Button } from "semantic-ui-react";
import { Link } from "react-router-dom";

export default function PlaceListItem({ place }) {
  return (
    <div>
      <Segment.Group style={{ marginBottom: "20px" }}>
        <Segment basic attached="top" style={{ padding: "0" }}>
          <Image
            style={{
              width: "100%",
              objectFit: "cover",
            }}
            fluid
            src={place.placehostPhotoURL}
          />
        </Segment>
        <Segment clearing>
          <Item.Group>
            <Item>
              <Item.Header content={place.title} />
            </Item>
            <Item>
              <Item.Header content={`Şehir : ${place.city}`} />
            </Item>
            <Button
              as={Link}
              to={`/places/${place.id}`}
              floated="right"
              content="Ayrıntılar"
              positive
            />
          </Item.Group>
        </Segment>
      </Segment.Group>
    </div>
  );
}
