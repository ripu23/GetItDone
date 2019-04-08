import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { NavController, ModalController, LoadingController } from '@ionic/angular';
import { Geolocation } from '@ionic-native/geolocation/ngx';
import '../../assets/geolocation-marker.js';
import { ModalrequestPage } from '../modalrequest/modalrequest.page';
import { User } from '../Models/user.js';

declare var google;
declare var GeolocationMarker;

@Component({
  selector: 'app-map',
  templateUrl: './map.page.html',
  styleUrls: ['./map.page.scss'],
})
export class MapPage implements OnInit {

  @ViewChild('map')
  public mapElement: ElementRef;
  public map: any;

  private lat: any;
  private lng: any;
  private loading: any;
  private users: User[];

  constructor(public navCtrl: NavController, 
              public geolocation: Geolocation,
              public modalController: ModalController,
              private loadingController: LoadingController) { }

  ngOnInit() {
    this.loadingController.create({
      message: 'Setting satellites in position..'
    }).then( overlay => {
      this.loading = overlay;
      this.loading.present();
      this.getLocation();
    })
  }

  ionViewDidLoad(){
    
  }

  getLocation() {
    this.geolocation.getCurrentPosition().then( pos => {
      this.loading.dismiss();
      this.lat = pos.coords.latitude;
      this.lng = pos.coords.longitude;
      // Uncomment this to load map.
      // this.initMap();
    })
  }
  initMap() {
    let coords = new google.maps.LatLng(this.lat, this.lng);
    let mapoptions = google.maps.MapOptions = {
      center: coords,
      zoom: 14,
      mapTypeId: google.maps.MapTypeId.ROADMAP
    }

    this.map = new google.maps.Map(this.mapElement.nativeElement, mapoptions);
    let geoMarker = new GeolocationMarker(this.map);
  }

  async openRequestForm() {
    const modal = await this.modalController.create({
      component: ModalrequestPage,
      componentProps: {
        id: 1
      }
    });
    modal.onDidDismiss().then( response => {
      console.log(response);
      if(response['data']){

      }else{

      }
    })
    return await modal.present();
  }
}
