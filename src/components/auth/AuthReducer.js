const SIGN_IN_USER = "SIGN_IN_USER";
const SIGN_OUT_USER = "SIGN_OUT_USER";

const initialState = {
  authenticated: false,
  currentUser: null,
  prevLocation: null,
  currentLocation: null,
};
export function AuthReducer(state = initialState, { type, payload }) {
  switch (type) {
    case SIGN_IN_USER:
      return {
        ...state,
        authenticated: true,
        currentUser: {
          email: payload.email,
          photoURL: payload.photoURL,
          uid: payload.uid,
          displayName: payload.displayName,
          providerId: payload.providerData[0].providerId,
        },
      };
    case SIGN_OUT_USER:
      return {
        ...state,
        authenticated: false,
        currentUser: null,
      };
    default:
      return state;
  }
}
