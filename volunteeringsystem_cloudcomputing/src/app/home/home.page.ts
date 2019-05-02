import { Component } from '@angular/core';
import { NavController, ModalController, LoadingController, AlertController } from '@ionic/angular';
import { FirebaseUISignInSuccessWithAuthResult, FirebaseUISignInFailure } from 'firebaseui-angular';
import { AngularFireAuth } from '@angular/fire/auth';
import { Geolocation } from '@ionic-native/geolocation/ngx';
import { VolunteerService } from '../services/volunteer.service';
import { User } from '../Models/user';
import { ActivatedRoute, Router } from '@angular/router';
import { ModalsignupPage } from '../modalsignup/modalsignup.page';
import { ShareService } from '../services/share.service';
import { AuthService } from '../services/auth.service';
import { UserService } from '../services/user.service';
import { FCM } from '@ionic-native/fcm/ngx';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  private lat: any;
  private lng: any;
  private preHomeId: string;
  private user: any;

  constructor(public afAuth: AngularFireAuth,
              private geolocation: Geolocation,
              private activatedRoute: ActivatedRoute,
              private router: Router,
              private shareService: ShareService,
              private modalController: ModalController,
              private alertController: AlertController,
              private auth: AuthService,
              private fcm: FCM,
              private userService: UserService) {

  }

  ngOnInit(): void {
    this.preHomeId = this.activatedRoute.snapshot.paramMap.get('id');

    this.afAuth.authState.subscribe(d => {
      console.log(d);
      if (d !== null) {
          this.auth.setLoggedId(true);
          this.auth.setUserId(d.uid);
          this.userService.getUser(d.uid).then(user => {
            this.user = user;
            this.auth.setUserDetails(user);
            this.setupNotifications();
            this.navigateUser();
          });
      }
    });

    this.geolocation.getCurrentPosition().then(pos => {
      this.lat = pos.coords.latitude;
      this.lng = pos.coords.longitude;
    });
  }


  navigateUser() {
    if (this.preHomeId === 'user') {
      this.router.navigate(['/map']);
    } else {
      this.router.navigate(['/profile/requests']);
    }
  }

  setupNotifications () {
    if (this.auth.getUserType() === 'volunteer') {
      this.fcm.subscribeToTopic('requests');
      this.fcm.onNotification().subscribe(data => {
        this.router.navigate(['/profile/requests']);
      });
    } else {
      this.fcm.unsubscribeFromTopic('requests');
      this.fcm.onNotification().subscribe(data => {
        this.router.navigate(['/profile/history']);
      });
    }
    this.fcm.getToken().then(token => {
      console.log('FCM', token);
      this.user.fcmToken = token;
      this.userService.updateUser(this.user);
    });
    this.fcm.onTokenRefresh().subscribe(token => {
      console.log('refreshed FCM', token);
      this.user.fcmToken = token;
      this.userService.updateUser(this.user);
    });
  }

  logout() {
    this.auth.removeUser();
    this.afAuth.auth.signOut();
    this.router.navigate(['/prehome']);
  }

  successCallback(signInSuccessData: FirebaseUISignInSuccessWithAuthResult) {
    console.log(signInSuccessData);
    this.auth.setUserId(signInSuccessData.authResult.user.uid);
    this.auth.setLoggedId(true);
    if (signInSuccessData.authResult.additionalUserInfo && signInSuccessData.authResult.additionalUserInfo.isNewUser) {
        this.createNewUser(signInSuccessData);
    } else {
      this.userService.getUser(this.auth.getUserId()).then(user => {
        this.user = user;
        this.auth.setUserDetails(user);
        this.setupNotifications();
        this.navigateUser();
      });
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
          alert.dismiss();
        }
      }]
    });
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
        preHomeId: this.preHomeId // user or volunteer
      }
    });

    modal.onDidDismiss().then(data => {
      console.log(data);
      if (data['done']) {
        this.userService.getUser(this.auth.getUserId()).then(user => {
          this.user = user;
          this.auth.setUserDetails(user);
          this.setupNotifications();
          this.navigateUser();
        });
      }
    });
    return await modal.present();
  }

}
