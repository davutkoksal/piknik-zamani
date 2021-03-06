import firebase from "../config/firebase";

const db = firebase.firestore();

export function dataFromSnapshot(snapshot) {
  if (!snapshot.exists) return undefined;
  const data = snapshot.data();

  for (const prop in data) {
    if (data.hasOwnProperty(prop)) {
      if (data[prop] instanceof firebase.firestore.Timestamp) {
        data[prop] = data[prop].toDate();
      }
    }
  }

  return {
    ...data,
    id: snapshot.id,
  };
}

export function ListenToPlacesFromFirestore() {
  return db.collection("places");
}

export function ListenToPlaceFromFirestore(placeId) {
  return db.collection("places").doc(placeId);
}

export async function ListenToFilteredPlacesFromFirestore(city) {
  let placeRef;
  let places = [];
  if (city && city !== "Hepsi") {
    placeRef = await db.collection("places").where("city", "==", city).get();
  } else {
    placeRef = await db.collection("places").get();
  }
  placeRef.forEach((doc) => {
    places.push({ ...doc.data(), id: doc.id });
  });
  return places;
}
export function addMessageToFirestore(message) {
  return db.collection("messages").add({
    ...message,
  });
}

export function addPlaceToFirestore(place) {
  const user = firebase.auth().currentUser;
  return db.collection("places").add({
    ...place,
    hostUid: user.uid,
    hostedBy: user.displayName,
    hostPhotoURL: user.photoURL || null,
  });
}

export function updateEventInFirestore(event) {
  return db.collection("events").doc(event.id).update(event);
}

export function addEventToFirestore(event) {
  const user = firebase.auth().currentUser;
  return db.collection("events").add({
    ...event,
    hostUid: user.uid,
    hostedBy: user.displayName,
    hostPhotoURL: user.photoURL || null,
    createdAt: firebase.firestore.FieldValue.serverTimestamp(),
    attendees: firebase.firestore.FieldValue.arrayUnion({
      id: user.uid,
      displayName: user.displayName,
      photoURL: user.photoURL || null,
    }),
    attendeeIds: firebase.firestore.FieldValue.arrayUnion(user.uid),
  });
}

export function ListenToEventsFromFirestore() {
  return db.collection("events");
}

export function ListenToEventFromFirestore(eventId) {
  return db.collection("events").doc(eventId);
}

export function ListenToActivitiesFromFirestore() {
  return db.collection("activity");
}

export function cancelEventToggle(event) {
  return db.collection("events").doc(event.id).update({
    isCancelled: !event.isCancelled,
  });
}

export function getUserProfile(userId) {
  return db.collection("users").doc(userId);
}

export function setUserProfileData(user) {
  return db
    .collection("users")
    .doc(user.uid)
    .set({
      displayName: user.displayName,
      email: user.email,
      photoURL: user.photoURL || null,
      createdAt: firebase.firestore.FieldValue.serverTimestamp(),
    });
}

export async function followUser(profile) {
  const user = firebase.auth().currentUser;
  const batch = db.batch();
  try {
    batch.set(
      db
        .collection("following")
        .doc(user.uid)
        .collection("userFollowing")
        .doc(profile.id),
      {
        displayName: profile.displayName,
        photoURL: profile.photoURL,
        uid: profile.id,
      }
    );
    batch.update(db.collection("users").doc(user.uid), {
      followingCount: firebase.firestore.FieldValue.increment(1),
    });
    return await batch.commit();
  } catch (error) {
    throw error;
  }
}

export async function unfollowUser(profile) {
  const user = firebase.auth().currentUser;
  const batch = db.batch();
  try {
    batch.delete(
      db
        .collection("following")
        .doc(user.uid)
        .collection("userFollowing")
        .doc(profile.id)
    );

    batch.update(db.collection("users").doc(user.uid), {
      followingCount: firebase.firestore.FieldValue.increment(-1),
    });

    return await batch.commit();
  } catch (error) {
    throw error;
  }
}

export function getFollowersCollection(profileId) {
  return db.collection("following").doc(profileId).collection("userFollowers");
}

export function getFollowingCollection(profileId) {
  return db.collection("following").doc(profileId).collection("userFollowing");
}

export function getFollowingDoc(profileId) {
  const userUid = firebase.auth().currentUser.uid;
  return db
    .collection("following")
    .doc(userUid)
    .collection("userFollowing")
    .doc(profileId)
    .get();
}

export function getUserEventsQuery(activeTab, userUid) {
  let eventsRef = db.collection("events");
  switch (activeTab) {
    case 1: // hosting
      return eventsRef.where("hostUid", "==", userUid).orderBy("date");
    default:
      return eventsRef.where("hostUid", "==", userUid).orderBy("date");
  }
}
export async function updateUserProfilePhoto(downloadURL, filename) {
  const user = firebase.auth().currentUser;
  const userDocRef = db.collection("users").doc(user.uid);
  try {
    const userDoc = await userDocRef.get();
    if (!userDoc.data().photoURL) {
      await db.collection("users").doc(user.uid).update({
        photoURL: downloadURL,
      });
      await user.updateProfile({
        photoURL: downloadURL,
      });
    }
    return await db.collection("users").doc(user.uid).collection("photos").add({
      name: filename,
      url: downloadURL,
    });
  } catch (error) {
    throw error;
  }
}
export function deletePhotoFromCollection(photoId) {
  const userUid = firebase.auth().currentUser.uid;
  return db
    .collection("users")
    .doc(userUid)
    .collection("photos")
    .doc(photoId)
    .delete();
}
export function getUserPhotos(userUid) {
  return db.collection("users").doc(userUid).collection("photos");
}
export async function setMainPhoto(photo) {
  const user = firebase.auth().currentUser;
  const today = new Date();
  const eventDocQuery = db
    .collection("events")
    .where("attendeeIds", "array-contains", user.uid)
    .where("date", ">=", today);
  const userFollowingRef = db
    .collection("following")
    .doc(user.uid)
    .collection("userFollowing");

  const batch = db.batch();

  batch.update(db.collection("users").doc(user.uid), {
    photoURL: photo.url,
  });

  try {
    const eventsQuerySnap = await eventDocQuery.get();
    for (let i = 0; i < eventsQuerySnap.docs.length; i++) {
      let eventDoc = eventsQuerySnap.docs[i];
      if (eventDoc.data().hostUid === user.uid) {
        batch.update(eventsQuerySnap.docs[i].ref, {
          hostPhotoURL: photo.url,
        });
      }
      batch.update(eventsQuerySnap.docs[i].ref, {
        attendees: eventDoc.data().attendees.filter((attendee) => {
          if (attendee.id === user.uid) {
            attendee.photoURL = photo.url;
          }
          return attendee;
        }),
      });
    }
    const userFollowingSnap = await userFollowingRef.get();
    userFollowingSnap.docs.forEach((docRef) => {
      let followingDocRef = db
        .collection("following")
        .doc(docRef.id)
        .collection("userFollowers")
        .doc(user.uid);
      batch.update(followingDocRef, {
        photoURL: photo.url,
      });
    });

    await batch.commit();

    return await user.updateProfile({
      photoURL: photo.url,
    });
  } catch (error) {
    console.log(error);
    throw error;
  }
}
export async function updateUserProfile(profile) {
  const user = firebase.auth().currentUser;
  try {
    if (user.displayName !== profile.displayName) {
      await user.updateProfile({
        displayName: profile.displayName,
      });
    }
    return await db.collection("users").doc(user.uid).update(profile);
  } catch (error) {
    throw error;
  }
}

export function addUserAttendance(event) {
  const user = firebase.auth().currentUser;
  return db
    .collection("events")
    .doc(event.id)
    .update({
      attendees: firebase.firestore.FieldValue.arrayUnion({
        id: user.uid,
        displayName: user.displayName,
        photoURL: user.photoURL || null,
      }),
      attendeeIds: firebase.firestore.FieldValue.arrayUnion(user.uid),
    });
}

export async function cancelUserAttendance(event) {
  const user = firebase.auth().currentUser;
  try {
    const eventDoc = await db.collection("events").doc(event.id).get();
    return db
      .collection("events")
      .doc(event.id)
      .update({
        attendeeIds: firebase.firestore.FieldValue.arrayRemove(user.uid),
        attendees: eventDoc
          .data()
          .attendees.filter((attendee) => attendee.id !== user.uid),
      });
  } catch (error) {
    throw error;
  }
}
