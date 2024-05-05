import { Routes } from '@angular/router';
import {HomeComponent} from "./public/pages/home/home.component";
import {PageNotFoundComponent} from "./public/pages/page-not-found/page-not-found.component";
import {RecordsManagementComponent} from "./marathon/pages/records-management/records-management.component";

export const routes: Routes = [
  {path:'home', component: HomeComponent},
  {path:'marathon/records',component:RecordsManagementComponent},
  {path: '', redirectTo: '/home', pathMatch: 'full'},
  {path: '**',  component: PageNotFoundComponent}
];
