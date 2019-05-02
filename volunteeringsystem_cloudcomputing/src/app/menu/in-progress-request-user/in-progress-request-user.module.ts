import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { InProgressRequestUserPage } from './in-progress-request-user.page';

const routes: Routes = [
  {
    path: '',
    component: InProgressRequestUserPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [InProgressRequestUserPage]
})
export class InProgressRequestUserPageModule {}
