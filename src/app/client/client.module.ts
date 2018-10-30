import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { SidenavComponent } from './sidenav/sidenav.component';
import { WelcomeComponent } from './welcome/welcome.component';
import { CommunityComponent } from './community/community.component';
import { StatementComponent } from './statement/statement.component';
import { PaymentComponent } from './payment/payment.component';
import { ServiceComponent } from './service/service.component';
import { ServiceHistoryComponent } from './service-history/service-history.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ToastrModule } from 'ngx-toastr';
import { ProfileComponent } from './profile/profile.component';
import { DashboardComponent } from '../client/dashboard/dashboard.component';
import { SharedModule } from '../shared/shared.module';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';



/**
 * Client Module Comprises of the following Features
 *
 *  Bootstrap Component : Dashboard Component
 *
 *  Welcome : WelcomeComponent
 *
 *  Statement : StatementComponent
 *
 *  Request Service : Service Component
 *
 *  Payment : Payment Component
 *
 *  View Statement : StatementComponent
 *
 *  View Service History : ServiceHistoryComponent
 *
 */
const routes = [
  {
    path: '',
    component: DashboardComponent,
    children: [
      {
        path: '',
        component: WelcomeComponent
      },
      {
        path: 'community',
        component: CommunityComponent
      },
      {
        path: 'pay',
        component: PaymentComponent
      },
      {
        path: 'statement',
        component: StatementComponent
      },
      {
        path: 'request',
        component: ServiceComponent
      },
      {
        path: 'history',
        component: ServiceHistoryComponent
      },
      {
        path: 'profile',
        component: ProfileComponent
      }
    ]
  }
];

@NgModule({
  imports: [
    SharedModule,
    ReactiveFormsModule,
    ToastrModule.forRoot(),
    RouterModule.forChild(routes)
  ],
  declarations: [SidenavComponent,
    DashboardComponent,
    WelcomeComponent,
    CommunityComponent,
    StatementComponent,
    PaymentComponent,
    ServiceComponent,
    ServiceHistoryComponent,
    ProfileComponent],
  exports: []
})
export class ClientModule { }
