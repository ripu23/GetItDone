import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '', redirectTo: 'prehome', pathMatch: 'full' },
  { path: 'home/:id', loadChildren: './home/home.module#HomePageModule' },
  { path: 'map', loadChildren: './map/map.module#MapPageModule' },
  { path: 'profile', loadChildren: './profile/profile.module#ProfilePageModule' },
  { path: 'prehome', loadChildren: './prehome/prehome.module#PrehomePageModule' },
  { path: 'signup', loadChildren: './modalsignup/modalsignup.module#ModalsignupPageModule'},
  { path: 'testrequest-user', loadChildren: './menu/testrequest-user/testrequest-user.module#TestrequestUserPageModule' }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
