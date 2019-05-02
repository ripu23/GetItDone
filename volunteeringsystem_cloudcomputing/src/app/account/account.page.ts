import { Component, OnInit } from '@angular/core';
import { ShareService } from '../services/share.service';
import { UserService } from '../services/user.service';
import { AngularFireAuth } from '@angular/fire/auth';
import { User } from '../Models/user';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-account',
  templateUrl: './account.page.html',
  styleUrls: ['./account.page.scss'],
})
export class AccountPage implements OnInit {

  private user: any;
  
  constructor(private afAuth: AngularFireAuth, private auth: AuthService) { }

  ngOnInit() {
    this.user = this.auth.getUserDetails()
  }
  
  ionViewCanEnter() {
    return this.auth.isLoggedIn();
  }

  uploadProfilePic(event) {
    if (event.target.files && event.target.files[0]) {

      // Read the uploaded file
      var filereader = new FileReader();
      reader.readAsDataURL(event.target.files[0]);

      // Display it in the profile pic box
      reader.onload = (event) => {
        this.url = event.target.result;
      }
    }
  }
}

