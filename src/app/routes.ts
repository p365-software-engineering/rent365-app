import { Routes } from '@angular/router';
import { LoginXComponent } from './public/login-x/login-x.component';
import { RegisterXComponent } from './public/register-x/register-x.component';
import { PublicComponent } from './public/public.component';
import { AuthXGuardClientService} from './services/service-export';
import { AuthXGuardAdminService} from './services/service-export';
import { LeaseComponent } from './public/lease/lease.component';
import { ApartmentComponent } from './public/lease/apartment/apartment.component';
import { AmenitiesComponent } from './public/lease/amenities/amenities.component';
import { LeaseInfoComponent } from './public/lease/lease-info/lease-info.component';
import { SubmitComponent } from './public/lease/submit/submit.component';
import { EnquiryComponent } from './public/enquiry/enquiry.component';
import { DashboardComponent } from './client/dashboard/dashboard.component';
import { ForgotXComponent } from './public/forgot-x/forgot-x.component';
import { ReviewsComponent} from './public/reviews/reviews.component';
import { AddReviewComponent} from './public/reviews/add-review/add-review.component';



export const appRoutes: Routes = [
    {
        path : '',
        component : PublicComponent
    },
    {
        path : 'login',
        component : LoginXComponent
    },
    {
        path : 'register',
        component : RegisterXComponent
    },
    {
        path : 'forgot',
        component : ForgotXComponent
    },
    {
        path: 'lease',
        component: LeaseComponent,
        children: [
            {
                path: '',
                component: ApartmentComponent
            },
            {
                path: 'amenities',
                component: AmenitiesComponent
            },
            {
                path: 'userinfo',
                component: LeaseInfoComponent
            },
            {
                path: 'submit',
                component: SubmitComponent
            }
        ]
    },
    {
        path : 'enquiry',
        component: EnquiryComponent
    },
    {
        path: 'client',
        loadChildren: './client/client.module#ClientModule',
        canActivateChild: [AuthXGuardClientService]
    },
    {
        // Admin Dashboard Controls
        path: 'admin',
        loadChildren: './admin/admin.module#AdminModule',
        canActivateChild: [AuthXGuardAdminService]
    },
    {
        path: 'reviews',
        component: ReviewsComponent

    },
    {
        path: 'reviews/add-review',
        component: AddReviewComponent
      }
];
