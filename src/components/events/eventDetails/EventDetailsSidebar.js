import React from "react";
import { Segment, Item, Label } from "semantic-ui-react";
import { Link } from "react-router-dom";

export default function EventDetailsSidebar({ attendees, hostUid }) {
  return (
    <>
      <Segment
        textAlign="center"
        style={{ border: "none" }}
        attached="top"
        secondary
        inverted
        color="teal"
      >
        Etkinliğe {attendees?.length} kişi katılıyor
      </Segment>
      <Segment attached>
        <Item.Group relaxed divided>
          {attendees &&
            attendees.map((attendee) => (
              <Item
                as={Link}
                to={`/profile/${attendee.id}`}
                key={attendee.id}
                style={{ position: "relative" }}
              >
                {hostUid === attendee.id && (
                  <Label
                    ribbon="right"
                    color="red"
                    style={{ position: "absolute" }}
                    content="Düzenleyen"
                  />
                )}
                <Item.Image
                  size="tiny"
                  src={attendee.photoURL || "/assets/user.png"}
                />
                <Item.Content verticalAlign="middle">
                  <Item.Header as="h3">
                    <span>{attendee.displayName}</span>
                  </Item.Header>
                </Item.Content>
              </Item>
            ))}
        </Item.Group>
      </Segment>
    </>
  );
}
