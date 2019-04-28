import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ShareService {

  public userId: string = '';
  public userType: string = '';
  constructor() { }
}
