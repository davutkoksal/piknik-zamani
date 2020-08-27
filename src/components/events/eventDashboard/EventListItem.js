import React from "react";
import { Segment, Item, Image, Button, Label } from "semantic-ui-react";
import { Link } from "react-router-dom";

export default function EventListItem({ event }) {
  return (
    <Segment.Group style={{ marginBottom: "20px" }}>
      <Segment basic attached="top" style={{ padding: "0" }}>
        <Image
          fluid
          style={{
            width: "100%",
            objectFit: "cover",
          }}
          src={event.placehostPhotoURL}
        />
      </Segment>
      <Segment clearing>
        <Item.Group>
          <Item>
            <Item.Header content={event.title} />
          </Item>
          <Item>
            <Item.Header content={`Şehir : ${event.city}`} />
          </Item>
          <Item>
            <Item.Header
              content={`Tarih : ${event.date.toLocaleDateString("tr", {
                year: "numeric",
                month: "long",
                day: "numeric",
              })}`}
            />
          </Item>
          {event.isCancelled && (
            <Label
              ribbon="right"
              style={{ top: "-50px" }}
              color="red"
              content="Bu etkinlik iptal edildi"
            />
          )}
          <Button
            as={Link}
            to={`/events/${event.id}`}
            floated="right"
            content="Ayrıntılar"
            positive
          />
        </Item.Group>
      </Segment>
    </Segment.Group>
  );
}
