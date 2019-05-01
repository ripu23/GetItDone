import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from 'angularfire2/firestore';
import { Request } from '../Models/request';
import { AngularFireAuth } from '@angular/fire/auth';
import { BehaviorSubject } from 'rxjs';
import { AuthService } from './auth.service';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class RequestService {

  private requestCollection: AngularFirestoreCollection<Request>;
  private userId: string = '';
  requests = new BehaviorSubject([]);
  
  constructor(private db: AngularFirestore,
              private auth: AuthService) {       
    
    this.userId = this.auth.getUserId();
    this.requestCollection = db.collection<Request>('requests');
    this.getRequests(this.userId);
    
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

  getRequests(userId: string){
    return this.requestCollection.doc(userId).collection('userrequest').valueChanges()
    .pipe(
      map(res => {
        return res.map( a => {
          if(a['createdAt']){
            a['createdAt'] = new Date(a['createdAt']).toLocaleString();
          }
          return a;
        })
      })
    ).subscribe(data => {
      let current = this.requests.value;
      current.push(data);
      this.requests.next(current);
    })
  }

}
