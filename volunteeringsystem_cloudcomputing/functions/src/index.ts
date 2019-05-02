import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';

admin.initializeApp();

// Send notification to volunteers for the new request
exports.sendNewRequestNotification = functions.firestore
  .document('requests2/{requestId}')
  .onCreate(async (snap, context) => {
    // const requestId = context.params.requestId;
    const request = snap.data();
    console.log('sendNewRequestNotification', JSON.stringify(request));

    const db = admin.firestore();
    const tokens: any[] = [];
    const volunteerDocRefs: any[] = [];
    const payload = {
      notification: {
        title: 'New GetItDone request!',
        body: 'New GetItDone request!',
        // icon: follower.photoURL
      }
    };
    if (request !== undefined) {
      request.volunteers.forEach((vId: any) => {
        volunteerDocRefs.push(db.doc(`volunteers/${vId}`))
      });
      await db.getAll(...volunteerDocRefs).then(volunteerDocs => {
        console.log(volunteerDocs[0].id, '=>', volunteerDocs[0].data());
        volunteerDocs.forEach((vD: any) => {
          const volunteer = vD.data();
          console.log('volunteer', volunteer.email);
          if (volunteer.fcmToken !== undefined) {
            tokens.push(volunteer.fcmToken);
          }
        });
      });
      payload.notification.body = request.description;
    }

    console.log('tokens', tokens);

    const response = await admin.messaging().sendToDevice(tokens, payload);
    console.log('successCount', response.successCount);
    // For each message check if there was an error.
    const tokensToRemove: any[] = [];
    response.results.forEach((result, index) => {
      // console.log('canonicalRegistrationToken', result.canonicalRegistrationToken);
      // console.log('messageId', result.messageId);
      const error = result.error;
      if (error) {
        console.error('Failure sending notification to', tokens[index], error);
        // Cleanup the tokens who are not registered anymore.
        if (error.code === 'messaging/invalid-registration-token' ||
            error.code === 'messaging/registration-token-not-registered') {
          tokensToRemove.push(tokens[index]);
        }
      }
    });
    console.log('tokens to remove', tokensToRemove);
});
