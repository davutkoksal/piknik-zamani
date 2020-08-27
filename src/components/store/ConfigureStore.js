import { createStore, applyMiddleware } from "redux";
import RootReducer from "./RootReducer";
import { composeWithDevTools } from "redux-devtools-extension";
import thunk from "redux-thunk";
import { verifyAuth } from "../auth/AuthActions";

export function ConfigureStore() {
  const store = createStore(
    RootReducer,
    composeWithDevTools(applyMiddleware(thunk))
  );
  store.dispatch(verifyAuth());
  return store;
}
