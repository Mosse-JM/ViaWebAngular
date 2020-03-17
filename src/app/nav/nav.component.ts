import { Component, OnInit} from '@angular/core';
import { Router } from '@angular/router';
import { HostListener } from '@angular/core';
import { AuthenticationService } from '../_services/authentication.service';
import { SharedService } from '../_services/shared.service';
import { User } from '../_models/user';
import { Role } from '../_models';



@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss']
})
export class NavComponent implements OnInit {

  cartItemCount: number = 0;
  currentUser: User;
  isChecked: boolean = false;
constructor(
    private router: Router,
    private authenticationService: AuthenticationService,
    private sharedService:SharedService
  ) {
      this.authenticationService.currentUser.subscribe(x => this.currentUser = x);
      this.sharedService.currentMessage.subscribe(x => this.cartItemCount = x);
  }

  logout() {
    this.authenticationService.logout();
    this.router.navigate(['/login']);
  }

  get isAdmin() {
    return this.currentUser && this.currentUser.role === Role.Admin;
  }
  get isEntpnr() {
    return this.currentUser && this.currentUser.role === Role.Entpnr;
  }

  get isLoggedIn(){
    return this.currentUser 
  }

  ngOnInit() {

  }

  /*toggleDisplay(){
    let styles = {
      'display': this.isChecked  ? 'block' : 'none',
    };
    return styles;
  } */

  myToggleHandler() {
    this.isChecked = !this.isChecked; 
  }

  @HostListener('document:keydown.escape', ['$event'])  
  onKeydownHandler(event: KeyboardEvent) {
    if(event.keyCode === 27 && this.isChecked === true){
      this.isChecked = !this.isChecked;  
    }
  }

}

