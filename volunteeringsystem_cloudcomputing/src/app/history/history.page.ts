import { Component, OnInit } from '@angular/core';
import { AngularFirestoreCollection, AngularFirestore } from 'angularfire2/firestore';
import { Request } from '../Models/request';
import { map } from 'rxjs/operators';
import { AuthService } from '../services/auth.service';
import { RequestService } from '../services/request.service';

@Component({
  selector: 'app-history',
  templateUrl: './history.page.html',
  styleUrls: ['./history.page.scss'],
})
export class HistoryPage implements OnInit {

  private requestCollection: AngularFirestoreCollection<Request>;
  private userId: string;
  private subscription1: any;
  public requestHistory: any;

  constructor(private db: AngularFirestore,
              private auth: AuthService,
              private requestService: RequestService) {

    this.userId = this.auth.getUserId();
    this.subscription1 = this.requestService.requests.subscribe(
      histories => {
      this.requestHistory = histories[0];
      console.log('History', this.requestHistory);
    });
   }
  

  ngOnInit() {  
  }

  ionViewCanEnter(): boolean {
    return this.auth.isLoggedIn();
  }

}
