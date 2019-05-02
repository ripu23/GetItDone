import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import {Constants} from '../Models/constants';
import {Observable} from 'rxjs';
import {Request} from '../Models/request';
import {Request2Service} from '../services/request2.service';
import {AuthService} from '../services/auth.service';

@Component({
  selector: 'app-requests',
  templateUrl: './requests.page.html',
  styleUrls: ['./requests.page.scss'],
})
export class RequestsPage implements OnInit {

  // private requests: any;
  private status: String;
  private statusMap = {};
  private user: any;

  private requestsOb: Observable<Request[]>;
  private requests: Request[];

  constructor(private auth: AuthService,
    private route: ActivatedRoute, private requestService: Request2Service) {
    this.statusMap[Constants.STATUS_NOT_DONE] = 'Pending Requests';
    this.statusMap[Constants.STATUS_IN_PROGRESS] = 'In-Progress Requests';
    this.statusMap[Constants.STATUS_DONE] = 'Completed Requests';
  }

  ngOnInit() {
    this.status = this.route.snapshot.paramMap.get('status').toUpperCase();
    console.log('status', this.status);
    this.user = this.auth.getUserDetails();
    this.requestsOb = this.requestService.getRequests(this.user.type, this.user.id, this.status);
    this.requestsOb.subscribe((reqs: Request[]) => {
      this.requests = reqs;
      console.log(this.user.type, this.user.id, this.status, 'requests', reqs);
    });
  }

}
