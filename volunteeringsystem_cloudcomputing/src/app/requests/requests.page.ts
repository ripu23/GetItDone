import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import {Constants} from '../Models/constants';
import {Observable} from 'rxjs';
import {Request} from '../Models/request';
import {Request2Service} from '../services/request2.service';
import {AuthService} from '../services/auth.service';
import {VolunteerService} from '../services/volunteer.service';
import {AngularFirestoreCollection} from "@angular/fire/firestore";
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-requests',
  templateUrl: './requests.page.html',
  styleUrls: ['./requests.page.scss'],
})
export class RequestsPage implements OnInit {

  private status: String;
  private statusMap = {};
  private user: any;

  private requestsCollection: AngularFirestoreCollection<Request>;
  private requestsOb: Observable<Request[]>;
  private requests: any[];

  constructor(private auth: AuthService, private volunteerService: VolunteerService,
    private route: ActivatedRoute, private requestService: Request2Service) {
    this.statusMap[Constants.STATUS_NOT_DONE] = 'Pending Requests';
    this.statusMap[Constants.STATUS_IN_PROGRESS] = 'In-Progress Requests';
    this.statusMap[Constants.STATUS_DONE] = 'Completed Requests';
  }

  ngOnInit() {
    this.status = this.route.snapshot.paramMap.get('status').toUpperCase();
    console.log('status', this.status);
    this.user = this.auth.getUserDetails();
    this.requestsCollection = this.requestService.getRequests(this.user.type, this.user.id, this.status);
    this.requestsOb = this.requestsCollection.snapshotChanges().pipe(
      map(actions => actions.map(a => {
        const data = a.payload.doc.data() as Request;
        const id = a.payload.doc.id;
        return { id, ...data };
      }))
    );
    this.requestsOb.subscribe((reqs: Request[]) => {
      this.requests = reqs;
      if (this.status !== Constants.STATUS_NOT_DONE && this.user.type === 'user') {
        // for closed and in-progress requests, get volunteer details as well
        this.requests.forEach(async req => {
          req.volunteer = await this.volunteerService.getVolunteer(req.assignedVolunteer);
        });
      }
      console.log(this.user.type, this.user.id, this.status, 'requests', reqs);
    });
  }

  acceptRequest(request) {
    request.status = Constants.STATUS_IN_PROGRESS;
    request.assignedVolunteer = this.user.id;
    const reqId = request.id;
    delete request.id;
    this.requestService.updateRequest(reqId, request);
  }

  ignoreRequest(request) {
    request.volunteers.splice(request.volunteers.indexOf(this.user.id), 1)
    const reqId = request.id;
    delete request.id;
    this.requestService.updateRequest(reqId, request);
  }

}
