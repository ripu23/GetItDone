import { Component } from '@angular/core';
import { FirebaseUISignInSuccessWithAuthResult, FirebaseUISignInFailure } from 'firebaseui-angular';
import { AngularFireAuth } from '@angular/fire/auth';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  public userOrVolunteer: boolean = false;
  constructor(public afAuth: AngularFireAuth) {

  }
  ngOnInit(): void {
    this.afAuth.authState.subscribe(d => console.log(d));
    
  }

  volunteer(): void {
    this.userOrVolunteer = true;
  }

  user(): void {
    this.userOrVolunteer = true;
  }
  
  goBack(): void {
    this.userOrVolunteer = false;
  }

  logout() {
    this.afAuth.auth.signOut();
  }

  successCallback(signInSuccessData: FirebaseUISignInSuccessWithAuthResult) {
    console.log(signInSuccessData);
  }

  errorCallback(errorData: FirebaseUISignInFailure) {
   
  }
}
