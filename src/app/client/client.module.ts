import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { SidenavComponent } from './sidenav/sidenav.component';
import { DashbaordComponent } from './dashbaord/dashbaord.component';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild([
      {
        path:'',
        component: DashbaordComponent
      }
    ])
  ],
  declarations: [SidenavComponent, DashbaordComponent],
  exports: [SidenavComponent,DashbaordComponent]
  
})
export class ClientModule { }
