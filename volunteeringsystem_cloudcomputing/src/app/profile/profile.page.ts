import { Component, OnInit } from '@angular/core';
import { userPages, volunteerPages } from '../util/profilepages.js';
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

  public pageInfo = [];
  public selectedPath = '';
  public preHomeId = '';

  constructor(private router: Router,
              private auth: AuthService,
              public afAuth: AngularFireAuth,
              private navCtrl: NavController,
              private alertController: AlertController) {
    this.router.events.subscribe( (event: RouterEvent) => {
      this.selectedPath = event.url;
    })
   }

  
  ngOnInit() {
    console.log(this.selectedPath);
    this.preHomeId = this.auth.getUserType();  
    if(this.auth.getUserType() === 'user'){
      this.pageInfo = userPages;
    }else{
      this.pageInfo = volunteerPages;
    }
    if(this.selectedPath){
      let routes = this.selectedPath.split('/');
      if(routes.length <= 2){
        this.router.navigate(['/profile/account']);
      }
    }
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
    })
    await alert.present();
  }

}
