import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from 'angularfire2/firestore';
import { Request } from '../Models/request';
import { AuthService } from './auth.service';
import { Constants } from '../Models/constants';

@Injectable({
  providedIn: 'root'
})
export class Request2Service {

  private requestCollection: AngularFirestoreCollection<Request>;

  constructor(private db: AngularFirestore,
              private auth: AuthService) {
    this.requestCollection = db.collection<Request>('requests2');
  }

  addRequest(request: Request) {
    return this.requestCollection.add(request);
  }

  removeRequest(id) {
    return this.requestCollection.doc(id).delete();
  }

  updateRequest(id: string, request: Request) {
    return this.requestCollection.doc(id).update(request);
  }

  generateQuery(userType, userId, status) {
    return this.db.collection<Request>('requests2', ref => {
      let query: firebase.firestore.CollectionReference | firebase.firestore.Query = ref;
      query = query.where('status', '==', status);
      if (userType === 'user') {
        query = query.where('userId', '==', userId);
      } else {
        // Volunteer Open requests are the ones where it is part of volunteers array
        if (status === Constants.STATUS_NOT_DONE) {
          query = query.where('volunteers', 'array-contains', userId);
        } else {
          // inprogress and closed requests will be where he was the assigned volunteer
          query = query.where('assignedVolunteer', '==', userId);
        }
      }
      return query;
    }).valueChanges();
  }

  getOpenRequests(userType, userId) {
    return this.generateQuery(userType, userId, Constants.STATUS_NOT_DONE);
  }

  getInprogressRequests(userType, userId) {
    return this.generateQuery(userType, userId, Constants.STATUS_IN_PROGRESS);
  }

  getClosedRequests(userType, userId) {
    return this.generateQuery(userType, userId, Constants.STATUS_DONE);
  }
}
