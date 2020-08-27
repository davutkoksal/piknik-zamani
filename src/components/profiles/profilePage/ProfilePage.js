import React from "react";
import { Grid } from "semantic-ui-react";
import ProfilePageHeader from "./ProfilePageHeader";
import ProfilePageContent from "./ProfilePageContent";
import { useDispatch, useSelector } from "react-redux";
import useFirestoreDoc from "../../hooks/useFirestoreDoc";
import { getUserProfile } from "../../firestore/firestoreService";
import { listenToSelectedUserProfile } from "../ProfileActions";
import LoadingComponent from "../../common/LoadingComponent";

export default function ProfilePage({ match }) {
  const dispatch = useDispatch();
  const { selectedUserProfile, currentUserProfile } = useSelector(
    (state) => state.profile
  );
  const { currentUser } = useSelector((state) => state.auth);
  const { loading, error } = useSelector((state) => state.async);
  let profile;

  useFirestoreDoc({
    query: () => getUserProfile(match.params.id),
    data: (profile) => dispatch(listenToSelectedUserProfile(profile)),
    deps: [dispatch, match.params.id],
    shouldExecute: match.params.id !== currentUser.uid,
  });

  if (match.params.id === currentUser.uid) {
    profile = currentUserProfile;
  } else {
    profile = selectedUserProfile;
  }

  if ((loading && !profile) || (!profile && !error))
    return <LoadingComponent content="Yükleniyor..." />;

  return (
    <Grid stackable>
      <Grid.Column width={16}>
        <ProfilePageHeader
          profile={profile}
          isCurrentUser={currentUser.uid === profile.id}
        />
        <ProfilePageContent
          profile={profile}
          isCurrentUser={currentUser.uid === profile.id}
        />
      </Grid.Column>
    </Grid>
  );
}
