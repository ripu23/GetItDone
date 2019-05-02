import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';

admin.initializeApp();

// Send notification to volunteers for the new request
exports.sendNewRequestNotification = functions.firestore
  .document('requests2/{requestId}')
  .onWrite(async (change, context) => {
    // const requestId = context.params.requestId;
    // const request = snap.data();
    // Get an object with the current document value.
    // If the document does not exist, it has been deleted.
    const request = change.after.exists ? change.after.data() : null;

    // Get an object with the previous document value (for update or delete)
    const oldRequest = change.before.data();
    console.log('sendNewRequestNotification', JSON.stringify(request));

    const db = admin.firestore();
    const tokens: any[] = [];
    const volunteerDocRefs: any[] = [];
    let payload = {
      notification: {
        title: 'New GetItDone request!',
        body: 'New GetItDone request!',
        // icon: follower.photoURL
      }
    };
    if (request) {
      if (request.status === 'OPEN') {
        if (!oldRequest) {
          request.volunteers.forEach((vId: any) => {
            volunteerDocRefs.push(db.doc(`volunteers/${vId}`))
          });
          await db.getAll(...volunteerDocRefs).then(volunteerDocs => {
            console.log(volunteerDocs[0].id, '=>', volunteerDocs[0].data());
            volunteerDocs.forEach((vD: any) => {
              const volunteer = vD.data();
              console.log('new req: volunteer', volunteer.email);
              if (volunteer.fcmToken !== undefined) {
                tokens.push(volunteer.fcmToken);
              }
            });
          });
          payload.notification.body = request.description;
        } else {
          console.log('No change in request status: ', request.status, 'Ignoring...');
        }
      } else if (request.status === 'IN-PROGRESS') {
        payload.notification.title = 'Your request has been accepted!';
        await db.getAll(db.doc(`users/${request.userId}`), db.doc(`volunteers/${request.assignedVolunteer}`)).then(userDocs => {
          const user = userDocs[0].data();
          console.log('in progress', userDocs[0].id, '=>', user);
          const volunteer = userDocs[1].data();
          if (user && volunteer) {
            tokens.push(user.fcmToken);
            payload.notification.body = `'${request.description}' has been accepted by ${volunteer.firstName} ${volunteer.lastName}.`
          }
        });
      } else {
        payload.notification.title = 'Your request is complete!';
        await db.getAll(db.doc(`users/${request.userId}`), db.doc(`volunteers/${request.assignedVolunteer}`)).then(userDocs => {
          const user = userDocs[0].data();
          console.log('complete', userDocs[0].id, '=>', user);
          const volunteer = userDocs[1].data();
          if (user && volunteer) {
            tokens.push(user.fcmToken);
            payload.notification.body = `'${request.description}' has been completed by ${volunteer.firstName} ${volunteer.lastName}.`
          }
        });
      }

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
