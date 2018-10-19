import { Routes } from '@angular/router';
import { LoginXComponent } from './public/login-x/login-x.component';
import { RegisterXComponent } from './public/register-x/register-x.component';
import { PublicComponent } from './public/public.component';
import { AuthXGuardClientService} from './services/service-export';


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
        // Client Dashboard Controls
        path: 'client',
        loadChildren: './client/client.module#ClientModule',
        canActivateChild: [AuthXGuardClientService]
    },
    {
        // Admin Dashboard Controls
        path: 'admin',
        loadChildren: './admin/admin.module#AdminModule',
        canActivateChild: []
    }

];
