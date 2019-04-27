import { Component, OnInit } from '@angular/core';
import { NavParams, ModalController, LoadingController } from '@ionic/angular';
import { NgForm } from '@angular/forms';
import { VolunteerService } from '../services/volunteer.service';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-modalsignup',
  templateUrl: './modalsignup.page.html',
  styleUrls: ['./modalsignup.page.scss'],
})
export class ModalsignupPage implements OnInit {

  public data = {
    title: ''
  };
  private lat: any;
  private lng: any;
  private signInSuccessData: any;
  private loading: any;
  private preHomeId: string;

  constructor(private navParams: NavParams,
              private volunteerService: VolunteerService,
              private modalController: ModalController,
              private userService: UserService,
              private loadingController: LoadingController) { }

  ngOnInit() {
    this.data.title = this.navParams.get('title');
    this.lat = this.navParams.get('lat');
    this.lng = this.navParams.get('lng');
    this.signInSuccessData = this.navParams.get('signInSuccessData');
    this.preHomeId = this.navParams.get('preHomeId');

  }

  completeProfile(form: NgForm) {
    console.log(form.value);
    if(this.signInSuccessData.authResult.user && this.signInSuccessData.authResult.user.email){
      form.value.email = this.signInSuccessData.authResult.user.email;
    }
    form.value.latestLat = this.lat;
    form.value.latestLng = this.lng;
    form.value.userId = this.signInSuccessData.authResult.user.uid;

    this.loadingController.create({
      message: 'Saving'
    }).then(overlay => {
      this.loading = overlay;
      this.loading.present();
    });

    if(this.preHomeId === 'user'){
      this.userService.createUser(form.value).then(user => {
        console.log(user);
        this.loading.dismiss();
        this.modalController.dismiss('done');
      });

    }else {
      this.volunteerService.createVoluteer(form.value).then(volunteer => {
        console.log(volunteer);
        this.loading.dismiss();
        this.modalController.dismiss('done');
      });
    }
    
  }

}
