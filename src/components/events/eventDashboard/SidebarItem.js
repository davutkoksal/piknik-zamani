import React from "react";
import { Feed } from "semantic-ui-react";
import { Link } from "react-router-dom";
import { formatDistance } from "date-fns";
import eoLocale from "date-fns/locale/tr";

function SidebarItem({ activity }) {
  const renderSummary = (activity) => {
    switch (activity.type) {
      case "newEvent":
        return (
          <div>
            <Link to={{ pathname: "/events/" + activity.eventId }}>
              {activity.title}
            </Link>
            {"  "} Etkinliği {" - "}
            <Feed.User
              as={Link}
              to={{ pathname: "/profile/" + activity.hostUid }}
            >
              {activity.hostedBy}
            </Feed.User>{" "}
            {"tarafından düzenlendi"}
          </div>
        );
      case "reactivatedEvent":
        return (
          <div>
            <Link to={{ pathname: "/events/" + activity.eventId }}>
              {activity.title}
            </Link>
            {"  "} Etkinliği {" - "}
            <Feed.User
              as={Link}
              to={{ pathname: "/profile/" + activity.hostUid }}
            >
              {activity.hostedBy}
            </Feed.User>{" "}
            {"tarafından tekrar aktive edildi"}
          </div>
        );
      case "cancelledEvent":
        return (
          <div>
            <Link to={{ pathname: "/events/" + activity.eventId }}>
              {activity.title}
            </Link>
            {"  "} Etkinliği {" - "}
            <Feed.User
              as={Link}
              to={{ pathname: "/profile/" + activity.hostUid }}
            >
              {activity.hostedBy}
            </Feed.User>{" "}
            {"tarafından iptal edildi"}
          </div>
        );
      default:
        return;
    }
  };

  return (
    <Feed.Event>
      <Feed.Label>
        <img src={activity.photoURL || "/assets/user.png"} alt="p" />
      </Feed.Label>
      <Feed.Content>
        <Feed.Summary>{renderSummary(activity)}</Feed.Summary>
        <Feed.Meta>
          <Feed.Date>
            {formatDistance(new Date(activity.timestamp), new Date(), {
              locale: eoLocale,
            })}{" "}
            önce
          </Feed.Date>
        </Feed.Meta>
      </Feed.Content>
    </Feed.Event>
  );
}

export default SidebarItem;
