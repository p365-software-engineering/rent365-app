import { Component, OnInit } from '@angular/core';
import { ChatService } from 'app/services/service-export';
import * as $ from 'jquery';

@Component({
  selector: 'app-public',
  templateUrl: './public.component.html',
  styleUrls: ['./public.component.css']
})
export class PublicComponent implements OnInit {

  // TODO: remove chat ... ?
  constructor(private _chatService: ChatService) { }

  ngOnInit() {
    const hrefs = Array.from(document.querySelectorAll('a[href^="#"]'));
    hrefs.forEach(anchor => {
      anchor.addEventListener('click', function (e) {
        e.preventDefault();

        document.querySelector(this.getAttribute('href')).scrollIntoView({
          behavior: 'smooth'
        });
      });
    });

    
  }

}
