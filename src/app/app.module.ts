import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {HttpModule} from '@angular/http';

import {AppComponent} from './app.component';
import {AuthModule} from './auth/auth.module';
import {AppRoutingModule} from './app-routing.module';
import {UsersService} from './shared/services/users.service';
import {AuthService} from './shared/services/auth.service';
import {SystemModule} from './system/system.module';
import {SystemUserModule} from './system-user/system-user.module';
import {UploadFileService} from './shared/services/upload-file.service';
import {HttpClientModule} from '@angular/common/http';
import {HotelsService} from './shared/services/hotels.service';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    HttpModule,
    AuthModule,
    AppRoutingModule,
    SystemModule,
    SystemUserModule,
    HttpClientModule
  ],
  providers: [UsersService, AuthService, UploadFileService, HotelsService],
  bootstrap: [AppComponent]
})
export class AppModule {
}
