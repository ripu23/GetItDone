import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { HistoryPage } from './history.page';

const routes: Routes = [
  {
    path: '',
    component: HistoryPage,
    children: [
      {
        path: 'openrequests',
        loadChildren: '../menu/openrequest-user/openrequest-user.module#OpenrequestUserPageModule'
      },
      {
        path: 'inprogress',
        loadChildren: '../menu/in-progress-request-user/in-progress-request-user.module#InProgressRequestUserPageModule'
      },
      {
        path: 'closedrequests',
        loadChildren: '../menu/closed-request-user/closed-request-user.module#ClosedRequestUserPageModule'
      }
    ]
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [HistoryPage]
})
export class HistoryPageModule {}
