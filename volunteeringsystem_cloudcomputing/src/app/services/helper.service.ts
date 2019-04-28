import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class HelperService {

  constructor() { }

  deleteMarkers(markers: any[], id: string){
    markers.filter(el => {
      el.id !== id;
    })
    return markers;
  }
}
