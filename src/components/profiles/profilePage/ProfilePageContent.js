import React, { useState } from "react";
import { Tab } from "semantic-ui-react";
import AboutTab from "./AboutTab";
import PhotosTab from "./PhotosTab";
import EventsTab from "./EventsTab";
import FollowingTab from "./FollowingTab";

export default function ProfilePageContent({ profile, isCurrentUser }) {
  const [activeTab, setActiveTab] = useState(0);
  const panes = [
    {
      menuItem: "Hakkımda",
      render: () => (
        <AboutTab profile={profile} isCurrentUser={isCurrentUser} />
      ),
    },
    {
      menuItem: "Fotoğraflar",
      render: () => (
        <PhotosTab profile={profile} isCurrentUser={isCurrentUser} />
      ),
    },
    { menuItem: "Etkinlikler", render: () => <EventsTab profile={profile} /> },
    {
      menuItem: "Takipçilerim",
      render: () => (
        <FollowingTab
          key={profile.id}
          profile={profile}
          activeTab={activeTab}
        />
      ),
    },
    {
      menuItem: "Takip Ettiklerim",
      render: () => (
        <FollowingTab
          key={profile.id}
          profile={profile}
          activeTab={activeTab}
        />
      ),
    },
  ];

  return (
    <Tab
      menu={{ fluid: true, vertical: true }}
      menuPosition="right"
      panes={panes}
      onTabChange={(e, data) => setActiveTab(data.activeIndex)}
    />
  );
}
