import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-prehome',
  templateUrl: './prehome.page.html',
  styleUrls: ['./prehome.page.scss'],
})
export class PrehomePage implements OnInit {

  constructor(private nav: NavController) { }

  ngOnInit() {
  }

  user() {
    this.nav.navigateForward('/home/user');
  }

  volunteer() {
    this.nav.navigateForward('/home/volunteer');
  }

}
