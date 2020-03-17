import { NgModule, Component } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AboutComponent } from './about/about.component';
import { ContactComponent } from './contact/contact.component';
import { DesignsComponent } from './designs/designs.component';
import { DuplicatesComponent } from './duplicates/duplicates.component';
import { TechnologiesComponent } from './technologies/technologies.component';
import { HomeComponent } from './home/home.component';
import { Content1Component } from './content1/content1.component';
import { DetailComponent } from './detail/detail.component';
import { PostsComponent } from './posts/posts.component';
import { TodoComponent } from './Todo/Todo.component';

import { AuthGuard } from './_helpers';
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';


import { AdminComponent } from './admin';

import { Role } from './_models';
import { ProfileComponent } from './profile/profile.component';
import {AdminDashboardComponent} from './admin/adminDashboard/adminDashboard.component';
import { DashboardComponent } from './shopping/dashboard/dashboard.component';
import { ProductdisplayComponent } from './shopping/productdisplay/productdisplay.component';
import { MycartComponent } from './shopping/mycart/mycart.component';
import { from } from 'rxjs';

const routes: Routes = [
  
  { path: 'about' , component : AboutComponent},
  { path: 'contact' , component : ContactComponent},
  { path: 'designs' , component : DesignsComponent},
  { path: 'duplicates' , component : DuplicatesComponent},
  { path: 'technologies' , component : TechnologiesComponent},
  { path: '' , component : HomeComponent, canActivate: [AuthGuard]},
  { path: 'content1' , component: Content1Component},
  { path: 'todo', component: TodoComponent},
  { path: 'login' , component: LoginComponent},
  { path: 'detail/:id' , component : DetailComponent},
  { path: 'posts' , component : PostsComponent},
  { path: 'register', component: RegisterComponent },
  {
    path: 'admin',
    component: AdminComponent,
    canActivate: [AuthGuard],
    data: { roles: [Role.Admin] }
  },
   {path:'adminDashboard',component:AdminDashboardComponent},
   {path:'profile',component:ProfileComponent},
   {path:'entpnrDashboard',component:DashboardComponent},
   {path:'productdisplay',component:ProductdisplayComponent},
   {path:'mycart',component:MycartComponent},
  
    // otherwise redirect to home
    { path: '**', redirectTo: '' }

];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
export const appRoutingModule = RouterModule.forRoot(routes);
