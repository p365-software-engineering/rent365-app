import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import { HttpClientModule }  from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { AngularFireModule } from '@angular/fire';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { AngularFireStorageModule } from '@angular/fire/storage';
import { AngularFireAuthModule } from '@angular/fire/auth';

import { environment } from '../environments/environment';
import { appRoutes } from './routes';
import { PublicComponent } from './public/public.component';
import { HeaderComponent, FooterComponent } from './shared/shared-export';
import { RegisterXComponent } from './public/register-x/register-x.component';
import { LoginXComponent } from './public/login-x/login-x.component';
import { AuthXService, AuthXGuardClientService} from './services/service-export';
import {
  ToastrModule,
} from 'ngx-toastr';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ChatThreadComponent } from './public/chat/chat-thread/chat-thread.component';
import { ChatMessageComponent } from './public/chat/chat-message/chat-message.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginXComponent,
    PublicComponent,
    HeaderComponent,
    FooterComponent,
    RegisterXComponent,
    ChatThreadComponent,
    ChatMessageComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    AngularFirestoreModule,
    AngularFireStorageModule,
    AngularFireAuthModule,
    AngularFireModule.initializeApp(environment.firebase),
    RouterModule.forRoot(appRoutes),
    ToastrModule.forRoot()
  ],
  providers: [AuthXService, AuthXGuardClientService],
  bootstrap: [AppComponent]
})



export class AppModule { }
