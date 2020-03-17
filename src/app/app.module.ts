import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import {HttpClientModule, HTTP_INTERCEPTORS} from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


// used to create fake backend
import { fakeBackendProvider } from './_helpers';
import { JwtInterceptor, ErrorInterceptor } from './_helpers';


import { AppComponent } from './app.component';
import { NavComponent } from './nav/nav.component';
import { AboutComponent } from './about/about.component';
import { ContactComponent } from './contact/contact.component';
import { DesignsComponent } from './designs/designs.component';
import { TechnologiesComponent } from './technologies/technologies.component';
import { DuplicatesComponent } from './duplicates/duplicates.component';
import { HomeComponent } from './home/home.component';
import { TopComponent } from './top/top.component';
import { TransitionComponent } from './transition/transition.component';
import { Content1Component } from './content1/content1.component';
import { Content2Component } from './content2/content2.component';
import { Content3Component } from './content3/content3.component';
import { FootComponent } from './foot/foot.component';
import { LoginComponent } from './login/login.component';
import { DetailComponent } from './detail/detail.component';
import { PostsComponent } from './posts/posts.component';
import { TodoComponent } from './Todo/Todo.component';
import { TodoListComponent } from './Todo/Todo-list/Todo-list.component';
import { AddComponent } from './Todo/add/add.component';
import { RegisterComponent } from './register/register.component';
import { AlertComponent } from './alert/alert.component';
import { AdminComponent } from './admin';
import {AdminDashboardComponent} from './admin/adminDashboard/adminDashboard.component';
import { ProfileComponent } from './profile/profile.component';
import { DashboardComponent } from './shopping/dashboard/dashboard.component';
import { ProductdisplayComponent } from './shopping/productdisplay/productdisplay.component';
import { MycartComponent } from './shopping/mycart/mycart.component';


@NgModule({
  declarations: [
    AppComponent,
    NavComponent,
    AboutComponent,
    ContactComponent,
    DesignsComponent,
    TechnologiesComponent,
    DuplicatesComponent,
    HomeComponent,
    TopComponent,
    TransitionComponent,
    Content1Component,
    Content2Component,
    Content3Component,
    FootComponent,
    LoginComponent,
    DetailComponent,
    PostsComponent,
    TodoComponent,
    TodoListComponent,
    AddComponent,
    RegisterComponent,
    ProfileComponent,
    DashboardComponent,
    ProductdisplayComponent,
    MycartComponent,
    AdminComponent, 
    AdminDashboardComponent,   
    AlertComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule, 
    ReactiveFormsModule, 
  ],
  providers: [
    
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },

    // provider used to create fake backend
    //fakeBackendProvider
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
