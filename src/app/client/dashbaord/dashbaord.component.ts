import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-dashbaord',
  templateUrl: './dashbaord.component.html',
  styleUrls: ['./dashbaord.component.css']
})
export class DashbaordComponent implements OnInit {
  
  private showNav: boolean;
  constructor() { 
    this.showNav = true;
  }
  
  ngOnInit() {
  }
  public display(){
    
    if(this.showNav){
      console.log(false);
      this.showNav = false;
    }
    else{
      console.log(true);
      this.showNav = true;
    }
    
  }
  

}
