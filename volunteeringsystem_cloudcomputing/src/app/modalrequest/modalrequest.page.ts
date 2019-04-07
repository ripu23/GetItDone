import { Component, OnInit } from '@angular/core';
import { NavParams, ModalController } from '@ionic/angular';
import { Geolocation } from '@ionic-native/geolocation/ngx';
import { Request } from '../Models/request';


@Component({
  selector: 'app-modalrequest',
  templateUrl: './modalrequest.page.html',
  styleUrls: ['./modalrequest.page.scss'],
})
export class ModalrequestPage implements OnInit {

  constructor(private navParams: NavParams,
              private modalController: ModalController,
              private geolocation: Geolocation) { }


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
  }

}
