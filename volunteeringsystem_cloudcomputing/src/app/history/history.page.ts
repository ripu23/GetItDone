import { Component, OnInit } from '@angular/core';
import { AngularFirestoreCollection, AngularFirestore } from 'angularfire2/firestore';
import { Request } from '../Models/request';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-history',
  templateUrl: './history.page.html',
  styleUrls: ['./history.page.scss'],
})
export class HistoryPage implements OnInit {

  private requestCollection: AngularFirestoreCollection<Request>;
  constructor(private db: AngularFirestore) {
    this.requestCollection = db.collection('requests');
   }
  public requestHistory: any;

  ngOnInit() {
    let data = this.db.collection('requests', ref => ref.where('fromAddress', '==', 'rteja@asu.edu')).valueChanges().pipe(
      map(res => {
        return res.map( a => {
          console.log(a);
          if(a['createdAt']){
            a['createdAt'] = new Date(a['createdAt']).toLocaleString();
          }
          return a;
        })
      })
    ).subscribe(res => {
      console.log(res);
      this.requestHistory = res;
    });
    
  }

}
