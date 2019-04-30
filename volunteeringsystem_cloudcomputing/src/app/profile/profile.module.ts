import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { ProfilePage } from './profile.page';

const routes: Routes = [
  {
    path: '',
    component: ProfilePage,
    children: [
      { 
        path: 'account',
        loadChildren: '../account/account.module#AccountPageModule' 
      },
      { 
        path: 'history',
        loadChildren: '../history/history.module#HistoryPageModule'
      },
      { path: 'requests',
        loadChildren: '../requests/requests.module#RequestsPageModule'
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
  declarations: [ProfilePage]
})
export class ProfilePageModule {}
