import React from "react";
import PlaceListItem from "./PlaceListItem";

export default function PlaceList({ places }) {
  return (
    <div>
      {places &&
        places.map((place) => <PlaceListItem key={place.id} place={place} />)}
    </div>
  );
}
