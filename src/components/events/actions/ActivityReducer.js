const FETCH_ACTIVITIES = "FETCH_ACTIVITIES";
export function listenToActivities(activity) {
  return {
    type: FETCH_ACTIVITIES,
    payload: activity,
  };
}

const initialState = [];

function ActivityReducer(state = initialState, { type, payload }) {
  switch (type) {
    case FETCH_ACTIVITIES:
      return { ...state, activities: payload };
    default:
      return state;
  }
}

export default ActivityReducer;
