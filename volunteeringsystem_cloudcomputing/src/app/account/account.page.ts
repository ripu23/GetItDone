import { Component, OnInit } from '@angular/core';
import { ShareService } from '../services/share.service';
import { UserService } from '../services/user.service';
import { AngularFireAuth } from '@angular/fire/auth';
import { User } from '../Models/user';

@Component({
  selector: 'app-account',
  templateUrl: './account.page.html',
  styleUrls: ['./account.page.scss'],
})
export class AccountPage implements OnInit {

   private user: any;
  
  constructor(private afAuth: AngularFireAuth, private shareService: ShareService, private userService: UserService) { }

  ngOnInit() {
  	// this.afAuth.authState.subscribe(d => {
      
    //   	this.getUser(d.uid);
      	
    // });
  }

  async getUser(userId) {
  	// this.user = await this.userService.getUser(userId);
  	
  }

}

