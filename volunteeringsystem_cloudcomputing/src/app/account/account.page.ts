import { Component, OnInit } from '@angular/core';
import { ShareService } from '../services/share.service';
import { UserService } from '../services/user.service';
import { AngularFireAuth } from '@angular/fire/auth';
import { User } from '../Models/user';
import { Request } from '../Models/request';
import { AuthService } from '../services/auth.service';
import { Observable } from 'rxjs';
import { Request2Service } from '../services/request2.service';


@Component({
  selector: 'app-account',
  templateUrl: './account.page.html',
  styleUrls: ['./account.page.scss'],
})
export class AccountPage implements OnInit {

  private user: any;

  private openRequestsOb: Observable<Request[]>;
  private openRequests: Request[];
  private inProgressRequestsOb: Observable<Request[]>;
  private inProgressRequests: Request[];
  private closedRequestsOb: Observable<Request[]>;
  private closedRequests: Request[];

  constructor(
    private afAuth: AngularFireAuth,
    private auth: AuthService,
    private requestService: Request2Service) { }

  ngOnInit() {
    this.user = this.auth.getUserDetails();
    this.openRequestsOb = this.requestService.getOpenRequests(this.user.type, this.user.id);
    this.openRequestsOb.subscribe((reqs: Request[]) => {
      this.openRequests = reqs;
      console.log(this.user.type, this.user.id, 'openRequests', reqs);
    });
    this.inProgressRequestsOb = this.requestService.getInprogressRequests(this.user.type, this.user.id);
    this.inProgressRequestsOb.subscribe((reqs: Request[]) => {
      this.inProgressRequests = reqs;
      console.log(this.user.type, this.user.id, 'inProgressRequests', reqs);
    });
    this.closedRequestsOb = this.requestService.getClosedRequests(this.user.type, this.user.id);
    this.closedRequestsOb.subscribe((reqs: Request[]) => {
      this.closedRequests = reqs;
      console.log(this.user.type, this.user.id, 'closedRequests', reqs);
    });
  }

  ionViewCanEnter() {
    return this.auth.isLoggedIn();
  }

  // uploadProfilePic(profilePicUploadEvent) {
  //
  //   if (profilePicUploadEvent.target.files && profilePicUploadEvent.target.files[0]) {
  //
  //     var fileReader = new FileReader();
  //     fileReader.readAsDataURL(profilePicUploadEvent.target.files[0]);
  //     fileReader.onload = (profilePicUploadEvent) => {
  //       this.url = profilePicUploadEvent.target.result;
  //     }
  //   }
  // }

}

