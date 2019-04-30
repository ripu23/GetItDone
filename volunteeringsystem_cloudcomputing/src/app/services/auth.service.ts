import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private loggedInStatus = JSON.parse(localStorage.getItem('loggedIn') || 'false')
  constructor() { }

  setLoggedId(value: boolean){
    this.loggedInStatus = value;
    localStorage.setItem('loggedIn', this.loggedInStatus);
  }

  isLoggedIn(){
    return this.loggedInStatus;
  }

  setUserDetails(user){
    localStorage.setItem('userDetails', JSON.stringify(user));
  }

  setUserId(id: string) {
    localStorage.setItem('userId', id);
  }

  setUserType(type: string) {
    localStorage.setItem('userType', type);
  }

  getUserId() {
    return localStorage.getItem('userId');
  }


  getUserDetails() {
    return JSON.parse(localStorage.getItem('userDetails'));
  }
  
  removeUser() {
    localStorage.removeItem('userDetails');
    localStorage.removeItem('userType');
    localStorage.removeItem('userId');
    localStorage.removeItem('loggedIn');
    this.loggedInStatus = false;
  }

}
