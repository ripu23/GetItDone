import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private loggedInStatus = JSON.parse(localStorage.getItem('loggedIn') || 'false');
  constructor() { }

  setLoggedId(value: boolean) {
    this.loggedInStatus = value;
    localStorage.setItem('loggedIn', this.loggedInStatus);
  }

  isLoggedIn(): boolean {
    return this.loggedInStatus;
  }

  setUserDetails(user) {
    localStorage.setItem('userDetails', JSON.stringify(user));
  }

  setUserId(id: string) {
    localStorage.setItem('userId', id);
  }

  setUserType(type: string) {
    return localStorage.setItem('userType', type);
  }

  getUserType(): string {
    return localStorage.getItem('userType');
  }

  getUserId() {
    return localStorage.getItem('userId');
  }


  getUserDetails() {
    const user = JSON.parse(localStorage.getItem('userDetails'));
    user.id = this.getUserId();
    user.type = this.getUserType();
    return user;
  }

  setLatLng(lat: any, lng: any) {
    localStorage.setItem('lat', lat);
    localStorage.setItem('lng', lng);
  }

  getLat() {
    return parseFloat(localStorage.getItem('lat'));
  }

  getLng() {
    return parseFloat(localStorage.getItem('lng'));
  }

  removeUser() {
    this.loggedInStatus = false;
    const rPromises = [
      localStorage.removeItem('userDetails'),
      localStorage.removeItem('userType'),
      localStorage.removeItem('userId'),
      localStorage.removeItem('loggedIn'),
      localStorage.removeItem('lat'),
      localStorage.removeItem('lng'),
    ];
    return Promise.all(rPromises);
  }

}
