import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule }  from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { ChatThreadComponent } from './chat/chat-thread/chat-thread.component';
import { ChatMessageComponent } from './chat/chat-message/chat-message.component';
import { ChatWindowComponent } from './chat/chat-window/chat-window.component';
import { HeaderComponent, FooterComponent } from './shared-export';
import { BrowserModule } from '@angular/platform-browser';
import { MaterialModule } from './material-module';

@NgModule({
  declarations: [
    ChatThreadComponent,
    ChatMessageComponent,
    ChatWindowComponent,
    HeaderComponent,
    FooterComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    HttpClientModule,
    MaterialModule
  ],
  exports: [
    ChatThreadComponent,
    ChatMessageComponent,
    ChatWindowComponent,
    HeaderComponent,
    FooterComponent,
    FormsModule,
    HttpClientModule,
    CommonModule,
    MaterialModule
  ]
})

export class SharedModule { }
