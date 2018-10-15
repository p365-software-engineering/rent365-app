import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { DashbaordComponent } from './dashbaord/dashbaord.component';
import { WelcomeComponent } from './welcome/welcome.component';
import { SidenavComponent } from './sidenav/sidenav.component';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild([
      {
        path: '',
        component: DashbaordComponent,
        children: [
          {
            path: '',
            component: WelcomeComponent
          }
        ]
      }
    ])
  ],
  declarations: [DashbaordComponent, WelcomeComponent, SidenavComponent]
})
export class AdminModule { }
