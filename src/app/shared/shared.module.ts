import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule }  from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { ChatThreadComponent } from './chat/chat-thread/chat-thread.component';
import { ChatMessageComponent } from './chat/chat-message/chat-message.component';
import { ChatWindowComponent } from './chat/chat-window/chat-window.component';
import { HeaderComponent, FooterComponent } from './shared-export';

@NgModule({
  declarations: [
    ChatThreadComponent,
    ChatMessageComponent,
    ChatWindowComponent,
    HeaderComponent,
    FooterComponent
  ],
  imports: [
    CommonModule,
    // BrowserModule,
    FormsModule,
    HttpClientModule,
  ],
  exports: [
    ChatThreadComponent,
    ChatMessageComponent,
    ChatWindowComponent,
    HeaderComponent,
    FooterComponent,
    CommonModule,
    // BrowserModule,
    FormsModule,
    HttpClientModule
  ]
})

export class SharedModule { }
