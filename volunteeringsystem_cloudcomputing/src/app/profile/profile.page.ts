import { Component, OnInit } from '@angular/core';
import { pages } from '../util/profilepages.js';
import { Router, RouterEvent } from '@angular/router';
import { ShareService } from '../services/share.service.js';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {

  public pageInfo = pages;
  public selectedPath = '';
  public preHomeId = '';

  constructor(private router: Router,
              private shareService: ShareService) {
    this.router.events.subscribe( (event: RouterEvent) => {
      this.selectedPath = event.url;
    })
   }

  
  ngOnInit() {
    console.log(this.selectedPath);
    this.preHomeId = this.shareService.userType;
    if(this.shareService.userType === 'user'){
      this.router.navigate(['/profile/account']);
    }
    
  }

}
