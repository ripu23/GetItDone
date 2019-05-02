import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { ShareService } from '../services/share.service';
import { Storage } from '@ionic/storage';
import { AuthService } from '../services/auth.service';
import {AngularFireAuth} from "@angular/fire/auth";


@Component({
  selector: 'app-prehome',
  templateUrl: './prehome.page.html',
  styleUrls: ['./prehome.page.scss'],
})
export class PrehomePage implements OnInit {

  constructor(private nav: NavController,
              private auth: AuthService,
              private afAuth: AngularFireAuth,
              private storage: Storage) { }

  ngOnInit() {
  }

  async user() {
    await this.setUserType('user');
    this.nav.navigateForward('/home/user');
  }

  async volunteer() {
    await this.setUserType('volunteer');
    this.nav.navigateForward('/home/volunteer');
  }

  async setUserType(type: string) {
    const curType = this.auth.getUserType();
    // if previous logged in user was not of same type, log it out
    if (curType !== type) {
      console.log('removing', curType, 'to login', type);
      await this.auth.removeUser();
      this.afAuth.auth.signOut();
    }
    return this.auth.setUserType(type);
  }

}
