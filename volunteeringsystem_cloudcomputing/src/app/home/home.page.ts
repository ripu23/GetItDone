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
  private uType: any;

  constructor(public afAuth: AngularFireAuth,
              private geolocation: Geolocation,
              private activatedRoute: ActivatedRoute,
              private router: Router,
              private shareService: ShareService,
              private modalController: ModalController,
              private alertController: AlertController,
              private auth: AuthService,
              private fcm: FCM,
              private volunteerService: VolunteerService,
              private userService: UserService) {

  }

  ngOnInit(): void {
    this.preHomeId = this.activatedRoute.snapshot.paramMap.get('id');
    this.uType = this.auth.getUserType();

    this.afAuth.authState.subscribe(async (d) => {
      console.log('authState.subscribe d', d);
      if (d !== null) {
        this.auth.setLoggedId(true);
        this.auth.setUserId(d.uid);
        await this.setUser();
        this.auth.setUserDetails(this.user);
        this.setupNotifications();
        console.log('authState.subscribe inside d!=null');
        this.navigateUser();
      }
    });

    this.geolocation.getCurrentPosition().then(pos => {
      this.lat = pos.coords.latitude;
      this.lng = pos.coords.longitude;
    });
  }

  async setUser() {
    console.log('set user');
    if (this.uType === 'user') {
      this.user = await this.userService.getUser(this.auth.getUserId());
    } else {
      this.user = await this.volunteerService.getVolunteer(this.auth.getUserId());
    }
    console.log('user get completed', this.user);
  }

  async updateUser() {
    console.log('update user');
    if (this.uType === 'volunteer') {
      await this.volunteerService.updateVolunteer(this.user);
    } else {
      await this.userService.updateUser(this.user);
    }
  }

  navigateUser() {
    console.log('navigateUser', this.uType);
    if (this.uType === 'user') {
      this.router.navigate(['/map']);
    } else {
      this.router.navigate(['/profile/requests/open']);
    }
  }

  async setupNotifications () {
    console.log('setup notifications');
    if (this.uType === 'volunteer') {
      this.fcm.onNotification().subscribe(data => {
        this.router.navigate(['/profile/requests/in-progress']);
      });
    } else {
      this.fcm.onNotification().subscribe(data => {
        this.router.navigate(['/profile/requests/open']);
      });
    }
    await this.fcm.getToken().then(async token => {
      console.log('FCM', this.uType, token);
      this.user.fcmToken = token;
      await this.updateUser();
    });
    this.fcm.onTokenRefresh().subscribe(token => {
      console.log('refreshed FCM', this.uType, token);
      this.user.fcmToken = token;
      this.updateUser();
    });
  }

  logout() {
    this.auth.removeUser();
    this.afAuth.auth.signOut();
    this.router.navigate(['/prehome']);
  }

  async successCallback(signInSuccessData: FirebaseUISignInSuccessWithAuthResult) {
    console.log('signInSuccessData', signInSuccessData);
    this.auth.setUserId(signInSuccessData.authResult.user.uid);
    this.auth.setLoggedId(true);
    if (signInSuccessData.authResult.additionalUserInfo && signInSuccessData.authResult.additionalUserInfo.isNewUser) {
        this.createNewUser(signInSuccessData);
    } else {
      await this.setUser();
      this.auth.setUserDetails(this.user);
      this.setupNotifications();
      this.navigateUser();
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

    modal.onDidDismiss().then(async data => {
      console.log(data);
      if (data['done']) {
        await this.setUser();
        this.auth.setUserDetails(this.user);
        this.setupNotifications();
        this.navigateUser();
      }
    });
    return await modal.present();
  }

}
