import { Component, OnInit } from '@angular/core';
import { NavParams, ModalController } from '@ionic/angular';
import { Geolocation } from '@ionic-native/geolocation/ngx';
import { Request } from '../Models/request';
import { VolunteerService } from '../services/volunteer.service';


@Component({
  selector: 'app-modalrequest',
  templateUrl: './modalrequest.page.html',
  styleUrls: ['./modalrequest.page.scss'],
})
export class ModalrequestPage implements OnInit {

  constructor(private navParams: NavParams,
              private modalController: ModalController,
              private geolocation: Geolocation,
              private volunteerService: VolunteerService) { }


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

    this.volunteerService.findVolunteers(reqObj).subscribe( response => {
      console.log(response);
      if(response.length == 0){
        
      }else{

      }
    })
  }

}
