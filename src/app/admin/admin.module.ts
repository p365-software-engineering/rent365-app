import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { WelcomeComponent } from './welcome/welcome.component';
import { SidenavComponent } from './sidenav/sidenav.component';
import { SharedModule } from '../shared/shared.module';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ProfileComponent } from 'app/admin/profile/profile.component';
import { ReactiveFormsModule } from '@angular/forms';
import { ServiceHistoryComponent } from './service-history/service-history.component';
import { EditServiceComponent } from './service-history/edit-service/edit-service.component';

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    ReactiveFormsModule,
    RouterModule.forChild([
      {
        path: '',
        component: DashboardComponent,
        children: [
          {
            path: '',
            component: WelcomeComponent
          },
          {
            path: 'profile',
            component: ProfileComponent
          },
          {
            path: 'manage',
            component: ServiceHistoryComponent
          },
          {
            path: 'manage/:id',
            component: EditServiceComponent
          }
        ]
      }
    ])
  ],
  declarations: [DashboardComponent,
     WelcomeComponent,
      SidenavComponent,
      ProfileComponent,
      ServiceHistoryComponent,
      EditServiceComponent]
})
export class AdminModule { }
