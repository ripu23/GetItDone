import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { ShareService } from '../services/share.service';

@Component({
  selector: 'app-prehome',
  templateUrl: './prehome.page.html',
  styleUrls: ['./prehome.page.scss'],
})
export class PrehomePage implements OnInit {

  constructor(private nav: NavController,
              // Put everything in this service that needs to be shared;
              private shareService: ShareService) { }

  ngOnInit() {
  }

  user() {
    this.setUserType('user');
    this.nav.navigateForward('/home/user');
  }

  volunteer() {
    this.setUserType('user');
    this.nav.navigateForward('/home/volunteer');
  }

  setUserType(type: string) {
    this.shareService.userType = type;
  }

}
