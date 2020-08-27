import React from "react";
import { Segment, Item, Header, Button, Image } from "semantic-ui-react";
import {
  cancelEventToggle,
  addUserAttendance,
  cancelUserAttendance,
} from "../../firestore/firestoreService";
import { useState } from "react";
import { toast } from "react-toastify";
import { Link, useHistory } from "react-router-dom";

export default function EventDetailsHeader({ event, isGoing, isHost }) {
  const history = useHistory();
  const [loading, setLoading] = useState(false);
  async function handleUserJoinEvent() {
    setLoading(true);
    try {
      await addUserAttendance(event);
    } catch (error) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  }

  async function handleUserLeaveEvent() {
    setLoading(true);
    try {
      await cancelUserAttendance(event);
    } catch (error) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <Segment.Group>
      <Segment basic attached="top" style={{ padding: "0" }}>
        <Image src={event?.placehostPhotoURL} fluid />
      </Segment>
      <Segment>
        <Item.Group>
          <Item>
            <Item.Content>
              <Header size="huge" content={event?.title} />
              <p>
                <strong>
                  <Link to={`/profile/${event.hostUid}`}>
                    {event?.hostedBy}
                  </Link>{" "}
                </strong>{" "}
                tarafından düzenlendi
              </p>
            </Item.Content>
          </Item>
        </Item.Group>
      </Segment>

      <Segment attached="bottom" clearing>
        {!isHost && (
          <>
            {isGoing ? (
              <Button
                color="red"
                onClick={handleUserLeaveEvent}
                loading={loading}
              >
                Etkinlikten Ayrıl
              </Button>
            ) : (
              <Button primary onClick={handleUserJoinEvent} loading={loading}>
                Etkinliğe Katıl
              </Button>
            )}
          </>
        )}

        {isHost && (
          <div>
            <Button
              color={event.isCancelled ? "green" : "red"}
              floated="right"
              content={event.isCancelled ? "Aktive Et" : "Etkinliği İptal Et"}
              onClick={() => cancelEventToggle(event)}
            />
            <Button
              color={event.isCancelled ? "green" : "red"}
              floated="right"
              content="Etkinliği Güncelle"
              onClick={() => history.push(`/updateEvent/${event.id}`)}
            />
          </div>
        )}
      </Segment>
    </Segment.Group>
  );
}
