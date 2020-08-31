import React from "react";
import { Segment, Item, Header, Image } from "semantic-ui-react";
import { Link } from "react-router-dom";

export default function PlaceDetailsHeader({ place }) {
  return (
    <Segment.Group>
      <Segment basic attached="top" style={{ padding: "0" }}>
        <Image src={place?.placehostPhotoURL} fluid />
      </Segment>
      <Segment>
        <Item.Group>
          <Item>
            <Item.Content>
              <Header content={place?.title} />
              <p>
                <strong>
                  <Link to={`/profile/${place.hostUid}`}>
                    {place?.hostedBy}
                  </Link>
                </strong>{" "}
                tarafından eklendi
              </p>
            </Item.Content>
          </Item>
        </Item.Group>
      </Segment>
    </Segment.Group>
  );
}
