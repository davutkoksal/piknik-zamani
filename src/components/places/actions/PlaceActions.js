const FETCH_PLACES = "FETCH_PLACES";
const LISTEN_TO_PLACE_CHAT = "LISTEN_TO_PLACE_CHAT";
export const CLEAR_COMMENTS = "CLEAR_COMMENTS";
export function listenToPlaces(places) {
  return {
    type: FETCH_PLACES,
    payload: places,
  };
}
export function listenToPlaceChat(comments) {
  return {
    type: LISTEN_TO_PLACE_CHAT,
    payload: comments,
  };
}
