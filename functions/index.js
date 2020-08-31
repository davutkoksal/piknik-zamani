const functions = require("firebase-functions");
const admin = require("firebase-admin");
admin.initializeApp(functions.config().firebase);

const db = admin.firestore();

const newActivity = (type, event, id) => {
  return {
    type: type,
    eventDate: event.date,
    hostedBy: event.hostedBy,
    title: event.title,
    photoURL: event.hostPhotoURL,
    timestamp: admin.firestore.FieldValue.serverTimestamp(),
    hostUid: event.hostUid,
    eventId: id,
  };
};

exports.createActivity = functions.firestore
  .document("events/{eventId}")
  .onCreate((event) => {
    let newEvent = event.data();

    const activity = newActivity("newEvent", newEvent, event.id);

    return admin
      .firestore()
      .collection("activity")
      .add(activity)
      .then((docRef) => {
        return console.log("Activity created with id: ", docRef.id);
      })
      .catch((err) => {
        return console.log("Error adding activity", err);
      });
  });

exports.cancelActivity = functions.firestore
  .document("events/{eventId}")
  .onUpdate((event, context) => {
    let updatedEvent = event.after.data();
    let previousEventData = event.before.data();

    if (
      !updatedEvent.cancelled ||
      updatedEvent.cancelled === previousEventData.cancelled
    ) {
      return false;
    }

    const activity = newActivity(
      "cancelledEvent",
      updatedEvent,
      context.params.eventId
    );

    return admin
      .firestore()
      .collection("activity")
      .add(activity)
      .then((docRef) => {
        return console.log("Activity cancelled with id: ", docRef.id);
      })
      .catch((err) => {
        return console.log("Error cancelling activity", err);
      });
  });

exports.reactivatedActivity = functions.firestore
  .document("events/{eventId}")
  .onUpdate((event, context) => {
    let updatedEvent = event.after.data();
    let previousEventData = event.before.data();

    if (
      updatedEvent.cancelled ||
      updatedEvent.cancelled === previousEventData.cancelled
    ) {
      return false;
    }

    const activity = newActivity(
      "reactivatedEvent",
      updatedEvent,
      context.params.eventId
    );

    return admin
      .firestore()
      .collection("activity")
      .add(activity)
      .then((docRef) => {
        return console.log("Activity reactivated with id: ", docRef.id);
      })
      .catch((err) => {
        return console.log("Error reactivating activity", err);
      });
  });

exports.addFollowing = functions.firestore
  .document("following/{userUid}/userFollowing/{profileId}")
  .onCreate(async (snapshot, context) => {
    const following = snapshot.data();
    console.log({ following });
    try {
      const userDoc = await db
        .collection("users")
        .doc(context.params.userUid)
        .get();
      const batch = db.batch();
      batch.set(
        db
          .collection("following")
          .doc(context.params.profileId)
          .collection("userFollowers")
          .doc(context.params.userUid),
        {
          displayName: userDoc.data().displayName,
          photoURL: userDoc.data().photoURL,
          uid: userDoc.id,
        }
      );
      batch.update(db.collection("users").doc(context.params.profileId), {
        followerCount: admin.firestore.FieldValue.increment(1),
      });
      return await batch.commit();
    } catch (error) {
      return console.log(error);
    }
  });

exports.removeFollowing = functions.firestore
  .document("following/{userUid}/userFollowing/{profileId}")
  .onDelete(async (snapshot, context) => {
    const batch = db.batch();
    batch.delete(
      db
        .collection("following")
        .doc(context.params.profileId)
        .collection("userFollowers")
        .doc(context.params.userUid)
    );
    batch.update(db.collection("users").doc(context.params.profileId), {
      followerCount: admin.firestore.FieldValue.increment(-1),
    });
    try {
      return await batch.commit();
    } catch (error) {
      return console.log(error);
    }
  });
