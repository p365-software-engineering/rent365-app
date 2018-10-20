import { Component, OnInit } from '@angular/core';
import { LeaseService } from 'app/services/lease/lease.service';

@Component({
  selector: 'app-apartment',
  templateUrl: './apartment.component.html',
  styleUrls: ['./apartment.component.css']
})
export class ApartmentComponent implements OnInit {

  constructor(private ls: LeaseService) { }

  ngOnInit() {
  }

}
