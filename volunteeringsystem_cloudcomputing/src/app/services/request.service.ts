import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from 'angularfire2/firestore';
import { Request } from '../Models/request';

@Injectable({
  providedIn: 'root'
})
export class RequestService {

  private requestCollection: AngularFirestoreCollection<Request>;
  
  constructor(db: AngularFirestore) { 
    this.requestCollection = db.collection<Request>('requests');
  }

  addRequest(request: Request) {
    return this.requestCollection.add(request);
  }

  removeRequest(id) {
    return this.requestCollection.doc(id).delete();
  }

  updateRequest(request: Request, id: string) {
    return this.requestCollection.doc(id).update(request);
  }

  getRequest(id) {
    return this.requestCollection.doc<Request>(id).valueChanges();
  }
}
