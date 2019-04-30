import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { ShareService } from '../services/share.service';
import { Storage } from '@ionic/storage';
import { AuthService } from '../services/auth.service';


@Component({
  selector: 'app-prehome',
  templateUrl: './prehome.page.html',
  styleUrls: ['./prehome.page.scss'],
})
export class PrehomePage implements OnInit {

  constructor(private nav: NavController,
              private auth: AuthService,            
              private storage: Storage) { }

  ngOnInit() {
  }

  user() {
    this.setUserType('user');
    this.nav.navigateForward('/home/user');
  }

  volunteer() {
    this.setUserType('volunteer');
    this.nav.navigateForward('/home/volunteer');
  }

  setUserType(type: string) {
    this.auth.setUserType(type);
  }

}
