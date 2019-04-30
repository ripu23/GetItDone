import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from 'angularfire2/firestore';
import { Request } from '../Models/request';
import { AngularFireAuth } from '@angular/fire/auth';

@Injectable({
  providedIn: 'root'
})
export class RequestService {

  private requestCollection: AngularFirestoreCollection<Request>;
  private userId: string = '';
  
  constructor(private db: AngularFirestore,
              private afAuth: AngularFireAuth,) {       
    this.afAuth.authState.subscribe(d => {
      console.log(d);
      this.userId = d.uid;
    });
    this.requestCollection = db.collection<Request>('requests');
    
  }

  addRequest(request: Request) {
    return this.requestCollection.doc(this.userId).collection('userrequest').add(request);
  }

  removeRequest(id) {
    return this.requestCollection.doc(this.userId).delete();
  }

  updateRequest(request: Request, id: string) {
    return this.requestCollection.doc(this.userId).update(request);
  }

}
