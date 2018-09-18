import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {  SharedModule  } from './shared/shared.module'
import { FormsModule } from '@angular/forms';
import { AppComponent } from './app.component';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    SharedModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
