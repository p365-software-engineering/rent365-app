import { Routes } from "@angular/router";
import { LoginXComponent } from "./public/login-x/login-x.component";
import { RegisterXComponent } from "./public/register-x/register-x.component"
import { PublicComponent } from "./public/public.component";
import { AuthXGuardClientService} from "./services/service-export"


export const appRoutes:Routes = [
    {
        path : 'login',
        component : LoginXComponent,
        canActivate:[AuthXGuardClientService]
    },
    {
        path : 'register',
        component : RegisterXComponent
    },
    {
        path : '',
        component : PublicComponent
    }
]