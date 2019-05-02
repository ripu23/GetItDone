import { Component, OnInit } from '@angular/core';
import { AngularFirestoreCollection, AngularFirestore } from 'angularfire2/firestore';
import { AuthService } from 'src/app/services/auth.service';
import { RequestService } from 'src/app/services/request.service';

@Component({
  selector: 'app-closed-request-user',
  templateUrl: './closed-request-user.page.html',
  styleUrls: ['./closed-request-user.page.scss'],
})
export class ClosedRequestUserPage implements OnInit {

  private requestCollection: AngularFirestoreCollection<Request>;
  private userId: string;
  public closedRequests: any;

  constructor(private db: AngularFirestore,
              private auth: AuthService,
              private requestService: RequestService){
      
    this.userId = this.auth.getUserId();
    this.requestService.closedRequests$.subscribe(requests=> {
      this.closedRequests = requests;
      console.log('Requests', this.closedRequests);
    })
  }

  ngOnInit() {
  }

  ionViewCanEnter(): boolean {
    return this.auth.isLoggedIn();
  }

}
