import { Component, OnInit } from '@angular/core';
import { userPages, volunteerPages } from '../util/profilepages.js';
import { Router, RouterEvent } from '@angular/router';
import { AuthService } from '../services/auth.service.js';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {

  public pageInfo = [];
  public selectedPath = '';
  public preHomeId = '';

  constructor(private router: Router,
              private auth: AuthService) {
    this.router.events.subscribe( (event: RouterEvent) => {
      this.selectedPath = event.url;
    })
   }

  
  ngOnInit() {
    console.log(this.selectedPath);
    this.preHomeId = this.auth.getUserType();  
    if(this.auth.getUserType() === 'user'){
      this.pageInfo = userPages;
    }else{
      this.pageInfo = volunteerPages;
    }
    this.router.navigate(['/profile/account']);
    
  }

}
