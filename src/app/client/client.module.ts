import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { SidenavComponent } from './sidenav/sidenav.component';
import { DashbaordComponent } from './dashbaord/dashbaord.component';
import { WelcomeComponent } from './welcome/welcome.component';
import { CommunityComponent } from './community/community.component';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild([
      {
        path:'',
        component: DashbaordComponent,
        children: [
          {
            path:'',
            component: WelcomeComponent
          },
          {
            path:'community',
            component: CommunityComponent
          }
        ]
      }
      
    ])
  ],
  declarations: [SidenavComponent, DashbaordComponent, WelcomeComponent, CommunityComponent],
  exports: [SidenavComponent,DashbaordComponent]
  
})
export class ClientModule { }
