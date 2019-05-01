import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { AngularFireDatabase } from 'angularfire2/database';
import { GeoFire } from 'geofire';
import { VolunteerService } from './volunteer.service';

@Injectable({
  providedIn: 'root'
})
export class GeoService {

  private dbRef: any;
  private geoFire: any;

  volunteersLocation = new BehaviorSubject([]);
  volunteers = new BehaviorSubject([]);

  constructor(private db: AngularFireDatabase,
              private volunteerService: VolunteerService) {
    /// Reference database location for GeoFire
    this.dbRef = this.db.list('/volunteerlocations');
    this.geoFire = new GeoFire(this.dbRef.query.ref);

   }
   

   /// Adds GeoFire data to database
   addVolunteer(key:string, coords: Array<number>) {
     return this.geoFire.set(key, coords)
         .then(data => {
          console.log('location updated');
          console.log(data);
         })
         .catch(err => console.log(err))
   }


   /// Queries database for nearby locations
   /// Maps results to the hits BehaviorSubject
   getVolunteersLocation(radius: number, coords: Array<number>) {
    this.geoFire.query({
      center: coords,
      radius: radius
    })
    .on('key_entered', (key, location, distance) => {
      let newVolunteer = {
        key: key,
        location: location,
        distance: distance
      };
      this.getVolunteers(key);
      let currentHits = this.volunteersLocation.value;
      currentHits.push(newVolunteer);
      this.volunteersLocation.next(currentHits);
    })
   }
   
   getVolunteers(key: string) {
    this.volunteerService.getVolunteers(key).subscribe(ele => {
      if(ele){
        let current = this.volunteers.value;
        ele['id'] = key;
        current.push(ele);
        this.volunteers.next(current);
      }
    });
   }

}
