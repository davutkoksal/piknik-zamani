export const LISTEN_TO_CURRENT_USER_PROFILE = "LISTEN_TO_CURRENT_USER_PROFILE";
export const LISTEN_TO_SELECTED_USER_PROFILE =
  "LISTEN_TO_SELECTED_USER_PROFILE";
export const LISTEN_TO_USER_PHOTOS = "LISTEN_TO_USER_PHOTOS";
export const LISTEN_TO_USER_EVENTS = "LISTEN_TO_USER_EVENTS";
export const LISTEN_TO_FOLLOWERS = "LISTEN_TO_FOLLOWERS";
export const LISTEN_TO_FOLLOWINGS = "LISTEN_TO_FOLLOWINGS";
export const SET_FOLLOW_USER = "SET_FOLLOW_USER";
export const SET_UNFOLLOW_USER = "SET_UNFOLLOW_USER";
export const CLEAR_FOLLOWINGS = "CLEAR_FOLLOWINGS";

export function listenToCurrentUserProfile(profile) {
  return {
    type: LISTEN_TO_CURRENT_USER_PROFILE,
    payload: profile,
  };
}
export function listenToSelectedUserProfile(profile) {
  return {
    type: LISTEN_TO_SELECTED_USER_PROFILE,
    payload: profile,
  };
}

export function listenToUserPhotos(photos) {
  return {
    type: LISTEN_TO_USER_PHOTOS,
    payload: photos,
  };
}

export function listenToUserEvents(events) {
  return {
    type: LISTEN_TO_USER_EVENTS,
    payload: events,
  };
}

export function listenToFollowers(followers) {
  return {
    type: LISTEN_TO_FOLLOWERS,
    payload: followers,
  };
}

export function listenToFollowings(followings) {
  return {
    type: LISTEN_TO_FOLLOWINGS,
    payload: followings,
  };
}

export function setFollowUser() {
  return {
    type: SET_FOLLOW_USER,
  };
}

export function setUnfollowUser() {
  return {
    type: SET_UNFOLLOW_USER,
  };
}
