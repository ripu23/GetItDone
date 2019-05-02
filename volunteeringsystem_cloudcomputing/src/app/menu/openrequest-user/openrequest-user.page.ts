import { Component, OnInit } from '@angular/core';
import { AngularFirestoreCollection, AngularFirestore } from 'angularfire2/firestore';
import { AuthService } from 'src/app/services/auth.service';
import { RequestService } from 'src/app/services/request.service';

@Component({
  selector: 'app-openrequest-user',
  templateUrl: './openrequest-user.page.html',
  styleUrls: ['./openrequest-user.page.scss'],
})
export class OpenrequestUserPage implements OnInit {

  private requestCollection: AngularFirestoreCollection<Request>;
  private userId: string;
  public openRequests: any;

  constructor(private db: AngularFirestore,
              private auth: AuthService,
              private requestService: RequestService){
      
    this.userId = this.auth.getUserId();
    this.requestService.openRequests$.subscribe(requests=> {
      this.openRequests = requests;
      console.log('openRequests', this.openRequests);
    })
  }

  ngOnInit() {
  }

  ionViewCanEnter(): boolean {
    return this.auth.isLoggedIn();
  }

}
