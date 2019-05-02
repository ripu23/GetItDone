import { Component, OnInit } from '@angular/core';
import { NavParams, ModalController, AlertController, LoadingController } from '@ionic/angular';
import { Geolocation } from '@ionic-native/geolocation/ngx';
import { Request } from '../Models/request';
import { VolunteerService } from '../services/volunteer.service';
import { Constants } from '../Models/constants';
import { RequestService } from '../services/request.service';
import { NgForm } from '@angular/forms';
import { HelperService } from '../services/helper.service';
import { RequestredundantService } from '../services/requestredundant.service';
import { GeoService } from '../services/geo.service';


@Component({
  selector: 'app-modalrequest',
  templateUrl: './modalrequest.page.html',
  styleUrls: ['./modalrequest.page.scss'],
})
export class ModalrequestPage implements OnInit {

  private lat: any;
  private lng: any;
  private loading: any;
  private volunteers: any;
  private volunteersLocation: any;
  private subscription1: any;
  private subscription2: any;
  request: Request;

  constructor(private navParams: NavParams,
              private modalController: ModalController,
              private geolocation: Geolocation,
              private alertController: AlertController,
              private requestService: RequestService,
              private helperService: HelperService,
              private requestRedundantService: RequestredundantService,
              private loadingController: LoadingController,
              private geoService: GeoService, ) {
  }

  ngOnInit() {
    this.lat = this.navParams.get('lat');
    this.lng = this.navParams.get('lng');
    this.geoService.getVolunteersLocation(100, [this.lat, this.lng]);
    this.subscription1 = this.geoService.volunteersLocation.subscribe(
        volunteers => {
          this.volunteersLocation = volunteers
          console.log('modalRequestPage', this.volunteersLocation);
        });

    this.subscription2 = this.geoService.volunteers.subscribe(ele => {
      this.volunteers = ele;
      console.log('modalRequestPage', this.volunteers);
    });
  }

  closeModal() {
    this.modalController.dismiss();
  }

  saveRequest(requestForm: NgForm) {
    console.log(requestForm.value);
    requestForm.value.createdAt = new Date().getTime();
    requestForm.value.lat = this.lat;
    requestForm.value.lng = this.lng;
    requestForm.value.status = Constants.STATUS_NOT_DONE;
    if (requestForm.value.negotiable === '') { requestForm.value.negotiable = true; }
    this.loadingController.create({
      message: 'Saving Request'
    }).then(overlay => {
      this.loading = overlay;
      this.loading.present();
    });
    requestForm.value.volunteers = [];
    this.volunteers.forEach(element => {
      requestForm.value.volunteers.push(element.id);
    });
    this.requestService.addRequest(requestForm.value).then(savedRequest => {
      console.log(savedRequest);
      const uniqId = this.helperService.getUniqueIdForRequestCopyCollection(savedRequest.id);
      this.requestRedundantService.addRequest(requestForm.value, uniqId);
      this.loading.dismiss();
      this.closeModal();
      this.findVolunteers();
    });

  }

  findVolunteers() {
    // this.volunteerService.findVolunteers(reqObj).subscribe( response => {
    //   console.log(response);
    //   if(response.length == 0){
    //     this.createAlert(response);
    //   }else{

    //   }
    // })
  }

  async createAlert(response: any) {
    const length = response.length;
    const alert = await this.alertController.create({
      header: 'Success',
      message: length === 0 ? Constants.SUCCESS_LENGTH_0 : `${Constants.SUCCESS} ${length} volunteers!`,
      animated: true,
      buttons: [{
        text: 'Okay',
        cssClass: 'secondary',
        handler: () => {
          if (length > 0) {
            this.modalController.dismiss(response);
          } else {
            this.modalController.dismiss();
          }

        }
      }]
    });
    await alert.present();
  }

}
