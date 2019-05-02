import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { ClosedRequestUserPage } from './closed-request-user.page';

const routes: Routes = [
  {
    path: '',
    component: ClosedRequestUserPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [ClosedRequestUserPage]
})
export class ClosedRequestUserPageModule {}
