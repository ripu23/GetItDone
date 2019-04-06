import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { NavController } from '@ionic/angular';
import { Geolocation } from '@ionic-native/geolocation/ngx';
import '../../assets/geolocation-marker.js';

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

  private lat: any;
  private lng: any;
  public map: any;

  constructor(public navCtrl: NavController, public geolocation: Geolocation) { }

  ngOnInit() {
    console.log('loaded')
    this.geolocation.getCurrentPosition().then( pos => {
      console.log(pos);
      this.lat = pos.coords.latitude;
      this.lng = pos.coords.longitude;
      this.initMap();
    })
  }

  ionViewDidLoad(){
    
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
}
