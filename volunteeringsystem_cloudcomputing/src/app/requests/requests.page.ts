import { Component, OnInit } from '@angular/core';
import { RequestredundantService } from '../services/requestredundant.service';

@Component({
  selector: 'app-requests',
  templateUrl: './requests.page.html',
  styleUrls: ['./requests.page.scss'],
})
export class RequestsPage implements OnInit {

  public requests: any;
  constructor(private requestRedundantService: RequestredundantService) {
    this.requestRedundantService.openRequests$.subscribe(requests=> {
      this.requests = requests;
      console.log('Requests', this.requests);
    })
  }

  ngOnInit() {
  }

}
