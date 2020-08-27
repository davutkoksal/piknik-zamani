import firebase from "../config/firebase";
import {
  getUserProfile,
  dataFromSnapshot,
} from "../firestore/firestoreService";
import { listenToCurrentUserProfile } from "../profiles/ProfileActions";

const SIGN_IN_USER = "SIGN_IN_USER";
const SIGN_OUT_USER = "SIGN_OUT_USER";
const APP_LOADED = "APP_LOADED";

export function SignInUser(user) {
  return { type: SIGN_IN_USER, payload: user };
}

export function SignOutUser() {
  return { type: SIGN_OUT_USER };
}

export function verifyAuth() {
  return function (dispatch) {
    return firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        dispatch(SignInUser(user));
        const profileRef = getUserProfile(user.uid);
        profileRef.onSnapshot((snapshot) => {
          dispatch(listenToCurrentUserProfile(dataFromSnapshot(snapshot)));
          dispatch({ type: APP_LOADED });
        });
      } else {
        dispatch(SignOutUser());
        dispatch({ type: APP_LOADED });
      }
    });
  };
}
