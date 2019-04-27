import { Component } from '@angular/core';
import { NavController, ModalController, LoadingController, AlertController } from '@ionic/angular';
import { FirebaseUISignInSuccessWithAuthResult, FirebaseUISignInFailure } from 'firebaseui-angular';
import { AngularFireAuth } from '@angular/fire/auth';
import { Geolocation } from '@ionic-native/geolocation/ngx';
import { VolunteerService } from '../services/volunteer.service';
import { User } from '../Models/user';
import { ActivatedRoute, Router } from '@angular/router';
import { ModalsignupPage } from '../modalsignup/modalsignup.page';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  private lat: any;
  private lng: any;
  private preHomeId: string;

  constructor(public afAuth: AngularFireAuth,
              private geolocation: Geolocation,
              private activatedRoute: ActivatedRoute,
              private router: Router,
              private modalController: ModalController,
              private alertController: AlertController,) {

  }

  ngOnInit(): void {
    this.preHomeId = this.activatedRoute.snapshot.paramMap.get('id');
    this.afAuth.authState.subscribe(d => console.log(d));
    this.geolocation.getCurrentPosition().then(pos => {
      this.lat = pos.coords.latitude;
      this.lng = pos.coords.longitude;
    })
  }


  logout() {
    this.afAuth.auth.signOut();
    this.router.navigate(['/prehome']);
  }

  successCallback(signInSuccessData: FirebaseUISignInSuccessWithAuthResult) {
    console.log(signInSuccessData);
    if(signInSuccessData.authResult.additionalUserInfo && signInSuccessData.authResult.additionalUserInfo.isNewUser){
        this.createNewUser(signInSuccessData);
    }else {
      if(this.preHomeId === 'user'){
        this.router.navigate(['/map']);
      }
    }
  }

  async errorCallback(errorData: FirebaseUISignInFailure) {
    const alert = await this.alertController.create({
      header: 'Error',
      message: 'Login failed, please try again!',
      animated: true,
      buttons: [{
        text: 'Okay',
        cssClass: 'secondary',
        handler: () => {
        }
      }]
    })
    await alert.present();
  }

  async createNewUser(signInSuccessData: FirebaseUISignInSuccessWithAuthResult) {
    const modal = await this.modalController.create({
      component: ModalsignupPage,
      componentProps: {
        title: 'Complete your profile',
        lat: this.lat,
        lng: this.lng,
        signInSuccessData: signInSuccessData,
        preHomeId: this.preHomeId //user or volunteer
      }
    });

    modal.onDidDismiss().then(data => {
      console.log(data);
      if(data['done']){
        this.router.navigate(['/map']);
      }
    })
    return await modal.present();
  }

}
