import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { Geolocation } from '@ionic-native/geolocation/ngx'
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { ModalrequestPageModule } from './modalrequest/modalrequest.module';
import { HttpClientModule } from '@angular/common/http';
import { AngularFireModule } from 'angularfire2';
import { environment } from '../environments/environment';
import { AngularFirestoreModule } from 'angularfire2/firestore';
import {FirebaseUIModule, firebase, firebaseui} from 'firebaseui-angular';
import {AngularFireAuthModule} from '@angular/fire/auth';

const firebaseUiAuthConfig: firebaseui.auth.Config = {
  signInFlow: 'popup',
  signInOptions: [
      firebase.auth.EmailAuthProvider.PROVIDER_ID,
      {
        scopes: [
          'public_profile',
          'email',
          'user_likes',
          'user_friends'
        ],
        customParameters: {
          'auth_type': 'reauthenticate'
        },
        provider: firebase.auth.FacebookAuthProvider.PROVIDER_ID
      }
  ],
  tosUrl: '<your-tos-link>',
  privacyPolicyUrl: '<your-privacyPolicyUrl-link>',
  credentialHelper: firebaseui.auth.CredentialHelper.ACCOUNT_CHOOSER_COM
};

@NgModule({
  declarations: [AppComponent],
  entryComponents: [],
  imports: [BrowserModule, 
            IonicModule.forRoot(),
            AppRoutingModule,
            ModalrequestPageModule,
            HttpClientModule,
            AngularFireModule.initializeApp(environment.firebase),
            AngularFirestoreModule,
            AngularFireAuthModule,
            FirebaseUIModule.forRoot(firebaseUiAuthConfig)],
  providers: [
    StatusBar,
    SplashScreen,
    Geolocation,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
