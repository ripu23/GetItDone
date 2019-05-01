import { Component, OnInit, ViewChild, ElementRef, OnDestroy } from '@angular/core';
import { NavController, ModalController, LoadingController, AlertController } from '@ionic/angular';
import { Geolocation } from '@ionic-native/geolocation/ngx';
import '../../assets/geolocation-marker.js';
import { ModalrequestPage } from '../modalrequest/modalrequest.page';
import { User } from '../Models/user.js';
import { BehaviorSubject } from 'rxjs';
import { GeoService } from '../services/geo.service.js';
import { VolunteerService } from '../services/volunteer.service.js';
import { Constants } from '../Models/constants.js';
import { HelperService } from '../services/helper.service.js';
import { AuthService } from '../services/auth.service.js';
import { pages } from '../util/sidepages.js';
import { MenuController } from '@ionic/angular';
import { AngularFireAuth } from '@angular/fire/auth';


declare var google;
declare var GeolocationMarker;

@Component({
  selector: 'app-map',
  templateUrl: './map.page.html',
  styleUrls: ['./map.page.scss'],
})
export class MapPage implements OnInit, OnDestroy {

  //public variables here
  @ViewChild('map')
  public mapElement: ElementRef;
  public map: any;

  //private variables here
  private lat: any;
  private lng: any;
  private loading: any;
  private users: User[];
  private volunteersLocation: any;
  private subscription1: any;
  private subscription2: any;
  private volunteers: any;
  private markers: any[];
  public sidePages: [];





  constructor(private navCtrl: NavController,
    private geoService: GeoService,
    private volunteerService: VolunteerService,
    private geolocation: Geolocation,
    private modalController: ModalController,
    private loadingController: LoadingController,
    private helperService: HelperService,
    private auth: AuthService,
    private menu: MenuController,
    private alertController: AlertController,
    public afAuth: AngularFireAuth) {

    this.subscription1 = this.geoService.volunteersLocation.subscribe(
      volunteers => {
      this.volunteersLocation = volunteers
      console.log('Volunteer Location', this.volunteersLocation);
      this.addVolunteersToMap();
    });

    this.subscription2 = this.geoService.volunteers.subscribe(ele => {
      this.volunteers = ele;
      console.log('Volunteers', this.volunteers)
    });
    this.markers = [];
    this.sidePages = pages;
  }

  ionViewCanEnter(): boolean {
    return this.auth.isLoggedIn();
  }

  ngOnInit() {
    this.loadingController.create({
      message: 'Setting satellites in position..'
    }).then(overlay => {
      this.loading = overlay;
      this.loading.present();
      this.getLocation();
    })
  }

  ngOnDestroy() {
    this.subscription1.unsubscribe();
    this.subscription2.unsubscribe();
  }

  ionViewDidLoad() {

  }

  async navigateTo(event: string){
    if(event === 'Profile'){
      this.navCtrl.navigateRoot(['/profile'])
    }else if(event === 'History'){
      this.navCtrl.navigateRoot(['/profile/history'])
    }else{
      const alert = await this.alertController.create({
        header: 'Error',
        message: 'Really want to log out?',
        animated: true,
        buttons: [{
          text: 'Yes',
          cssClass: 'secondary',
          handler: () => {
            
            this.auth.removeUser();
            this.afAuth.auth.signOut();
            this.navCtrl.navigateRoot(['/prehome']);
        }},
        {
          text: 'Cancel',
          cssClass: 'secondary',
          handler: () => {
            alert.dismiss();
          }
        }]
      })
      await alert.present();
    } 
  }

  toggleMenu() {
    this.menu.enable(true, 'sideMenu');
    this.menu.open('sideMenu');
  }

  getLocation() {
    this.geolocation.getCurrentPosition().then(pos => {
      this.loading.dismiss();
      this.lat = pos.coords.latitude;
      this.lng = pos.coords.longitude;
      // Uncomment this to load map.
      this.initMap();
      this.geoService.getVolunteersLocation(100, [this.lat, this.lng]);
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

  addVolunteersToMap() {
    this.volunteersLocation.forEach(element => {
      this.addMarker(element.location, element.key);
    });
  }

  addMarker(location: any, id: string) {
    let coords = new google.maps.LatLng(location[0], location[1]);
    let marker = new google.maps.Marker({
      position: coords,
      map: this.map,
      icon: Constants.MARKER_IMAGE
    });

    this.markers.push({
      id: id,
      marker: marker
    });
  }

  deleteMarkers(id: string) {
    this.markers = this.helperService.deleteMarkers(this.markers, id);
  }

  async openRequestForm() {
    const modal = await this.modalController.create({
      component: ModalrequestPage,
      componentProps: {
        lat: this.lat,
        lng: this.lng
      }
    });

    modal.onDidDismiss().then(newRequest => {
      console.log(newRequest);
      if (newRequest['data']) {

      } else {

      }
    })

    return await modal.present();
  }
}
