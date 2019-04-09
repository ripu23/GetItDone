import { Component, OnInit } from '@angular/core';
import { pages } from '../util/profilepages.js';
import { Router, RouterEvent } from '@angular/router';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {

  public pageInfo = pages;
  public selectedPath = '';

  constructor(private router: Router) {
    this.router.events.subscribe( (event: RouterEvent) => {
      this.selectedPath = event.url;
    })
   }

  
  ngOnInit() {
    this.router.navigate(['/profile/account']);
  }

}
