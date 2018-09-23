import { Routes } from "@angular/router";
import { LoginXComponent } from "./login/login-x/login-x.component";
import { PublicComponent } from "./public/public.component";

export const appRoutes:Routes = [
    {
        path : 'login',
        component : LoginXComponent
    },
    {
        path : '',
        component : PublicComponent
    }

]