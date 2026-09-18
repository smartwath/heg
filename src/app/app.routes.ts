import { Routes } from '@angular/router';
import { Home } from './pages/home/home';
import { SignIn } from './pages/sign-in/sign-in';
import { AdminLogin } from './pages/admin-login/admin-login';
import { AdminDashboard } from './pages/admin-dashboard/admin-dashboard';
import { Otp } from './pages/otp/otp';
import { Status } from './pages/status/status';
import { Layout } from './ui/layout/layout';

export const routes: Routes = [
    {
        path: "",
        component: Layout,
        children: [
            {
                path: "",
                redirectTo: "home",
                pathMatch: "full"
            },
            {
                path: "home",
                component: Home
            },
            {
                path: "login",
                component: SignIn
            },
            {
                path: "login/otp",
                component: Otp
            },
            {
                path: "login/status",
                component: Status
            }
        ]
    },
    {
        path: "admin",
        children: [
            {
                path: "login",
                component: AdminLogin
            },
            {
                path: "dashboard",
                component: AdminDashboard
            }
        ]
    }
];
