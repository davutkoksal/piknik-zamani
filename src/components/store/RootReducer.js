import ModalReducer from "../common/modal/ModalReducer";
import AsyncReducer from "../async/AsyncReducer";
import PlaceReducer from "../places/actions/PlaceReducer";

import { combineReducers } from "redux";
import EventReducer from "../events/actions/EventReducer";
import { AuthReducer } from "../auth/AuthReducer";
import ProfileReducer from "../profiles/ProfileReducer";
import ActivityReducer from "../events/actions/ActivityReducer";

const RootReducer = combineReducers({
  places: PlaceReducer,
  events: EventReducer,
  activity: ActivityReducer,
  modal: ModalReducer,
  async: AsyncReducer,
  auth: AuthReducer,
  profile: ProfileReducer,
});
export default RootReducer;
