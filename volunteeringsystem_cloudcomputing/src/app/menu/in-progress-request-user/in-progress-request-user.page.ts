import { Component, OnInit } from '@angular/core';
import { AngularFirestoreCollection, AngularFirestore } from 'angularfire2/firestore';
import { AuthService } from 'src/app/services/auth.service';
import { RequestService } from 'src/app/services/request.service';

@Component({
  selector: 'app-in-progress-request-user',
  templateUrl: './in-progress-request-user.page.html',
  styleUrls: ['./in-progress-request-user.page.scss'],
})
export class InProgressRequestUserPage implements OnInit {

  private requestCollection: AngularFirestoreCollection<Request>;
  private userId: string;
  public inProgressRequests: any;

  constructor(private db: AngularFirestore,
    private auth: AuthService,
    private requestService: RequestService){

    this.userId = this.auth.getUserId();
    this.requestService.inProgressRequests$.subscribe(requests=> {
    this.inProgressRequests = requests;
    console.log('InProgress', this.inProgressRequests);
  })
}

  ngOnInit() {
  }

  ionViewCanEnter(): boolean {
    return this.auth.isLoggedIn();
  }

}
