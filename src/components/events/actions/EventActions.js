const FETCH_EVENTS = "FETCH_EVENTS";

export function listenToEvents(events) {
  return {
    type: FETCH_EVENTS,
    payload: events,
  };
}
