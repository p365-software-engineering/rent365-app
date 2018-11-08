import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { SidenavComponent } from './sidenav/sidenav.component';
import { WelcomeComponent } from './welcome/welcome.component';
import { CommunityComponent } from './community/community-page/community.component';
import { StatementComponent } from './statement/statement.component';
import { PaymentComponent } from './payment/payment.component';
import { ServiceComponent } from './service/service.component';
import { ServiceHistoryComponent } from './service-history/service-history.component';
import { ReactiveFormsModule } from '@angular/forms';
import { ToastrModule } from 'ngx-toastr';
import { ProfileComponent } from './profile/profile.component';
import { DashboardComponent } from '../client/dashboard/dashboard.component';
import { SharedModule } from '../shared/shared.module';
// import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { CommunityPageCardComponent } from './community/community-page-card/community-page-card.component';
import { AddEventComponent } from './community/add-event/add-event.component';
import { MaterialModule } from './material-module';



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
        component: CommunityComponent,
      },
      {
        path: 'community/add-event',
        component: AddEventComponent
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
    // BrowserAnimationsModule,
    ToastrModule.forRoot(),
    RouterModule.forChild(routes),
    MaterialModule
  ],
  declarations: [SidenavComponent,
    DashboardComponent,
    WelcomeComponent,
    CommunityComponent,
    StatementComponent,
    PaymentComponent,
    ServiceComponent,
    ServiceHistoryComponent,
    ProfileComponent,
    CommunityPageCardComponent,
    AddEventComponent],
  exports: []
})
export class ClientModule { }
