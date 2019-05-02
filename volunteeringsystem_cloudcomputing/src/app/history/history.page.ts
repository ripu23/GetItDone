import { Component, OnInit } from '@angular/core';
import { AngularFirestoreCollection, AngularFirestore } from 'angularfire2/firestore';
import { Request } from '../Models/request';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';

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
              private router: Router) {
    
    this.router.navigate(['/profile/history/openrequests'])  
   }
  

  ngOnInit() {

  }

  ionViewCanEnter(): boolean {
    return this.auth.isLoggedIn();
  }

}
