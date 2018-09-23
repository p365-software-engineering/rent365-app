import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import { HttpClientModule }  from '@angular/common/http'
import { RouterModule } from '@angular/router';
import { LoginXComponent } from './login/login-x/login-x.component';
import { appRoutes } from "./routes";
import { PublicComponent } from './public/public.component';
import { HeaderComponent, FooterComponent } from './shared/shared-export';

@NgModule({
  declarations: [
    AppComponent,
    LoginXComponent,
    PublicComponent,
    HeaderComponent,
    FooterComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    RouterModule.forRoot(appRoutes, { enableTracing: true })
  ],
  providers: [],
  bootstrap: [AppComponent]
})

export class AppModule { }
