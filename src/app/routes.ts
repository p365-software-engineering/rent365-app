import { Routes } from "@angular/router";
import { LoginXComponent } from "./public/login-x/login-x.component";
import { RegisterXComponent } from "./public/register-x/register-x.component";
import { PublicComponent } from "./public/public.component";
import { AuthXGuardClientService} from "./services/service-export";
import { EnquiryComponent } from './public/enquiry/enquiry.component';
import { DashbaordComponent } from './client/dashbaord/dashbaord.component'



export const appRoutes: Routes = [
    {
        path : '',
        component : PublicComponent
    },
    {
        path : 'login',
        component : LoginXComponent,
        canActivate: [AuthXGuardClientService]
    },
    {
        path : 'register',
        component : RegisterXComponent
    },
    {
        path : '',
        component : PublicComponent
    },
    {
        path : 'enquiry',
        component: EnquiryComponent
    },
    {
        path: 'client',
        loadChildren: './client/client.module#ClientModule',
        canActivateChild: [AuthXGuardClientService]
    }
];
