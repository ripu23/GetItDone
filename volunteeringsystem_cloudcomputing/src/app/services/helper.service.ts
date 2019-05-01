import { Injectable } from '@angular/core';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class HelperService {

  private userId: string;
  constructor(private auth: AuthService) {
    this.userId = this.auth.getUserId();
  }

  deleteMarkers(markers: any[], id: string){
    markers.filter(el => {
      el.id !== id;
    })
    return markers;
  }

  getUniqueIdForRequestCopyCollection(docId: string){
    return this.userId + '$' + docId;
  }
}
