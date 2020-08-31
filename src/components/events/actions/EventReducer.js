const FETCH_EVENTS = "FETCH_EVENTS";

const initialState = [];

function EventReducer(state = initialState, { type, payload }) {
  switch (type) {
    case FETCH_EVENTS:
      return { ...state, events: payload };

    default:
      return state;
  }
}

export default EventReducer;
