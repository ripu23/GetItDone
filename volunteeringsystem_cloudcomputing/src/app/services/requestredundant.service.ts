import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from 'angularfire2/firestore';
import { Request } from '../Models/request';
import { AuthService } from './auth.service';
import { BehaviorSubject, Observable } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';
import { Constants } from '../Models/constants';

@Injectable({
  providedIn: 'root'
})
export class RequestredundantService {

  private requestCopyCollection: AngularFirestoreCollection<Request>;
  private userId = '';
  requests = new BehaviorSubject([]);
  openRequests$: Observable<Request[]>;
  openStatus$: BehaviorSubject<string|null>;
  closedStatus$: Observable<String>;

  constructor(private db: AngularFirestore,
              private auth: AuthService) {


    this.userId = this.auth.getUserId();
    this.requestCopyCollection = db.collection<Request>('requestscopy');
    this.openStatus$ = new BehaviorSubject(Constants.STATUS_NOT_DONE);
    this.openRequests$ = this.openStatus$.pipe(switchMap(data =>
      this.db.collection<Request>('requestscopy', ref => ref.where('status', '==', data)).valueChanges(),
    ));
    this.openStatus$.next('OPEN');
  }

  addRequest(request: Request, id: string) {
    return this.requestCopyCollection.doc(id).set({
      toAddress: request.toAddress,
      fromAddress: request.fromAddress,
      description: request.description,
      zip: request.zip,
      phone: request.phone,
      city: request.city,
      rate: request.rate,
      negotiable: request.negotiable,
      lat: request.lat,
      lng: request.lng,
      createdAt: request.createdAt,
      status: request.status,
      volunteers: request.volunteers,
      userId: request.userId,
      assignedVolunteer: request.assignedVolunteer ? request.assignedVolunteer : ''
    });
  }

  getOpenRequests() {
    return this.openRequests$;
  }
}
