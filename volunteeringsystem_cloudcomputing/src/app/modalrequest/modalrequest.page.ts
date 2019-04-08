import { Component, OnInit } from '@angular/core';
import { NavParams, ModalController, AlertController } from '@ionic/angular';
import { Geolocation } from '@ionic-native/geolocation/ngx';
import { Request } from '../Models/request';
import { VolunteerService } from '../services/volunteer.service';
import { Constants } from '../Models/constants';


@Component({
  selector: 'app-modalrequest',
  templateUrl: './modalrequest.page.html',
  styleUrls: ['./modalrequest.page.scss'],
})
export class ModalrequestPage implements OnInit {

  constructor(private navParams: NavParams,
              private modalController: ModalController,
              private geolocation: Geolocation,
              private volunteerService: VolunteerService,
              private alertController: AlertController) { }


  private lat: any;
  private lng: any;

  public request:any = {};
  

  ngOnInit() {
    console.log(this.navParams.get('id'));

    this.geolocation.getCurrentPosition().then( pos => {
      this.lat = pos.coords.latitude;
      this.lng = pos.coords.longitude;
    })
  }

  closeModal() {
    this.modalController.dismiss();
  }

  findVolunteers() {

    this.request.lat = this.lat;
    this.request.lng = this.lng;
    console.log(this.request);

    let reqObj: Request = new Request();
    reqObj.city = this.request.city;
    reqObj.description = this.request.description;
    reqObj.fromAddress = this.request.fromAddress;
    reqObj.toAddress = this.request.toAddress;
    reqObj.lat = this.request.lat;
    reqObj.lng = this.request.lng;
    reqObj.phone = this.request.phone;
    reqObj.rate = this.request.rate;
    reqObj.zip = this.request.zip;
    
    this.createAlert([1, 2]);
    // this.volunteerService.findVolunteers(reqObj).subscribe( response => {
    //   console.log(response);
    //   if(response.length == 0){
    //     this.createAlert(response);
    //   }else{

    //   }
    // })
  }

  async createAlert(response: any){
    let length = response.length;
    const alert = await this.alertController.create({
      header: 'Success',
      message: length == 0 ? Constants.SUCCESS_LENGTH_0 : `${Constants.SUCCESS} ${length} volunteers!`,
      animated: true,
      buttons: [{
        text: 'Okay',
        cssClass: 'secondary',
        handler: () => {
          if(length > 0){
            this.modalController.dismiss(response);
          }else{
            this.modalController.dismiss();
          }
          
        }
      }]
    })
    await alert.present();
  }

}
