import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { WelcomeComponent } from './welcome/welcome.component';
import { SidenavComponent } from './sidenav/sidenav.component';
import { SharedModule } from '../shared/shared.module';
import { DashboardComponent } from './dashboard/dashboard.component';

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    RouterModule.forChild([
      {
        path: '',
        component: DashboardComponent,
        children: [
          {
            path: '',
            component: WelcomeComponent
          }
        ]
      }
    ])
  ],
  declarations: [DashboardComponent, WelcomeComponent, SidenavComponent]
})
export class AdminModule { }
