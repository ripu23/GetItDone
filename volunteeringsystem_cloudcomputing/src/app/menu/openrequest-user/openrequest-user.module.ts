import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { OpenrequestUserPage } from './openrequest-user.page';

const routes: Routes = [
  {
    path: '',
    component: OpenrequestUserPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [OpenrequestUserPage]
})
export class OpenrequestUserPageModule {}
