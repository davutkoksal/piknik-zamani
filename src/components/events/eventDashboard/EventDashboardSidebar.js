import React from "react";
import { Header, Segment, Feed, Sticky } from "semantic-ui-react";

import SidebarItem from "./SidebarItem";

const EventDashboardSidebar = ({ activities, contextRef }) => {
  return (
    <Sticky context={contextRef} offset={80}>
      <Header attached="top" content="Son Hareketler" />
      <Segment attached>
        <Feed>
          {activities &&
            activities.map((activity) => (
              <SidebarItem key={activity.id} activity={activity} />
            ))}
        </Feed>
      </Segment>
    </Sticky>
  );
};

export default EventDashboardSidebar;
