import { Component, OnInit } from '@angular/core';
import { userPages, volunteerPages, pages } from '../util/profilepages.js';
import { Router, RouterEvent } from '@angular/router';
import { AuthService } from '../services/auth.service.js';
import { AngularFireAuth } from '@angular/fire/auth';
import { NavController, AlertController } from '@ionic/angular';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {

  public menuPages = [];
  public selectedPath = '';
  public preHomeId = '';
  public open = false;

  constructor(private router: Router,
              private auth: AuthService,
              public afAuth: AngularFireAuth,
              private navCtrl: NavController,
              private alertController: AlertController) {

    this.menuPages = pages;
  }


  ngOnInit() {
    this.router.events.subscribe( (event: RouterEvent) => {
      this.selectedPath = event.url;
    });
  }

  goBack(): void {
    this.router.navigate(['/map']);
  }

  async logout() {
    const alert = await this.alertController.create({
      header: 'Error',
      message: 'Really want to log out?',
      animated: true,
      buttons: [{
        text: 'Yes',
        cssClass: 'secondary',
        handler: () => {

          this.auth.removeUser();
          this.afAuth.auth.signOut();
          this.navCtrl.navigateRoot(['/prehome']);
      }},
      {
        text: 'Cancel',
        cssClass: 'secondary',
        handler: () => {
          alert.dismiss();
        }
      }]
    });
    await alert.present();
  }

}
