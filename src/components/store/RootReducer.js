import ModalReducer from "../common/modal/ModalReducer";
import AsyncReducer from "../async/AsyncReducer";
import PlaceReducer from "../places/actions/PlaceReducer";

import { combineReducers } from "redux";
import EventReducer from "../events/actions/EventReducer";
import { AuthReducer } from "../auth/AuthReducer";
import ProfileReducer from "../profiles/ProfileReducer";

const RootReducer = combineReducers({
  places: PlaceReducer,
  events: EventReducer,
  modal: ModalReducer,
  async: AsyncReducer,
  auth: AuthReducer,
  profile: ProfileReducer,
});
export default RootReducer;
