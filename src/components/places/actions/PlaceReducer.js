const FETCH_PLACES = "FETCH_PLACES";
const LISTEN_TO_PLACE_CHAT = "LISTEN_TO_PLACE_CHAT";
const CLEAR_COMMENTS = "CLEAR_COMMENTS";

const initialState = {
  places: [],
  comments: [],
};

function PlaceReducer(state = initialState, { type, payload }) {
  switch (type) {
    case FETCH_PLACES:
      return { ...state, places: payload };
    case LISTEN_TO_PLACE_CHAT:
      return {
        ...state,
        comments: payload,
      };
    case CLEAR_COMMENTS:
      return { ...state, comments: [] };
    default:
      return state;
  }
}

export default PlaceReducer;
