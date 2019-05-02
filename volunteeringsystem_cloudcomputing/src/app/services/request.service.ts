import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from 'angularfire2/firestore';
import { Request } from '../Models/request';
import { AngularFireAuth } from '@angular/fire/auth';
import { BehaviorSubject, Observable } from 'rxjs';
import { AuthService } from './auth.service';
import { map, switchMap } from 'rxjs/operators';
import { Constants } from '../Models/constants';

@Injectable({
  providedIn: 'root'
})
export class RequestService {

  private requestCollection: AngularFirestoreCollection<Request>;
  private userId: string = '';
  requests = new BehaviorSubject([]);

  openStatus$: BehaviorSubject<string|null>
  inProgressStatus$: BehaviorSubject<string|null>
  closedStatus$: BehaviorSubject<string|null>

  openRequests$: Observable<Request[]>
  inProgressRequests$: Observable<Request[]>
  closedRequests$: Observable<Request[]>
  
  constructor(private db: AngularFirestore,
              private auth: AuthService) {       
    
    this.userId = this.auth.getUserId();
    this.requestCollection = db.collection<Request>('requests');
    this.getRequests(this.userId);
    this.openStatus$ = new BehaviorSubject(Constants.STATUS_NOT_DONE);
    this.openRequests$ = this.openStatus$.pipe(switchMap(data => 
      this.db.collection('requests').doc(this.userId).collection<Request>('userrequest', ref => ref.where('status', '==', data)).valueChanges(),
    ));


    this.inProgressStatus$ = new BehaviorSubject(Constants.STATUS_IN_PROGRESS);
    this.inProgressRequests$ = this.inProgressStatus$.pipe(switchMap(data => 
      this.db.collection('requests').doc(this.userId).collection<Request>('userrequest', ref => ref.where('status', '==', data)).valueChanges(),
    ));


    this.closedStatus$ = new BehaviorSubject(Constants.STATUS_DONE);
    this.closedRequests$ = this.closedStatus$.pipe(switchMap(data => 
      this.db.collection('requests').doc(this.userId).collection<Request>('userrequest', ref => ref.where('status', '==', data)).valueChanges(),
    ));

    this.openStatus$.next(Constants.STATUS_NOT_DONE);
    this.inProgressStatus$.next(Constants.STATUS_IN_PROGRESS);
    this.closedStatus$.next(Constants.STATUS_DONE);
    
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

  getOpenRequests(){
    return this.openRequests$;
  }

  getInProgressRequests(){
    return this.inProgressRequests$;
  }
  getClosedRequests(){
    return this.closedRequests$;
  }

}
