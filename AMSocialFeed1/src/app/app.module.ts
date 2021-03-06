import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SignupComponent } from './signup/signup.component';
import { LoginComponent } from './login/login.component';
import { FeedComponent } from './feed/feed.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HeaderComponent } from './header/header.component';
import { HttpClientModule } from '@angular/common/http';
import { AvatarModule } from 'ngx-avatar';
import { MDBBootstrapModule } from 'angular-bootstrap-md';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { EditProfileComponent } from './edit-profile/edit-profile.component';
import {Ng2TelInputModule} from 'ng2-tel-input';
import { ToastrModule } from 'ngx-toastr';
import { GoogleLoginProvider, SocialLoginModule } from 'angularx-social-login';

@NgModule({
  declarations: [
    AppComponent,
    SignupComponent,
    LoginComponent,
    FeedComponent,
    HeaderComponent,
    EditProfileComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule,
    AvatarModule,
    MDBBootstrapModule.forRoot(),
    BrowserAnimationsModule,
    Ng2TelInputModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot(),
    SocialLoginModule
    

    
  ],
  providers: [

    {
      provide: 'SocialAuthServiceConfig',
      useValue: {
        autoLogin: true, //keeps the user signed in
        providers: [
          {
            id: GoogleLoginProvider.PROVIDER_ID,
            provider: new GoogleLoginProvider('1029695319621-fjbe1t812mm8le9ehmc8g024sp9l160m.apps.googleusercontent.com') // your client id
          }
        ]
      }
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule { }
