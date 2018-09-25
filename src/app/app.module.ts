import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import { HttpClientModule }  from '@angular/common/http'
import { RouterModule } from '@angular/router';
import { appRoutes } from "./routes";
import { PublicComponent } from './public/public.component';
import { HeaderComponent, FooterComponent } from './shared/shared-export';
import { RegisterXComponent } from './public/register-x/register-x.component';
import { LoginXComponent } from './public/login-x/login-x.component';
import { AuthXService} from "./services/service-export"


@NgModule({
  declarations: [
    AppComponent,
    LoginXComponent,
    PublicComponent,
    HeaderComponent,
    FooterComponent,
    RegisterXComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    RouterModule.forRoot(appRoutes, { enableTracing: true })
  ],
  providers: [AuthXService],
  bootstrap: [AppComponent]
})

export class AppModule { }
