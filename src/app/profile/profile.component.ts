import { Component, OnInit } from '@angular/core';
import { first } from 'rxjs/operators';

import { User } from '../_models';
import { UserService, AuthenticationService } from '../_services';

@Component({ 
    styleUrls: ['profile.component.scss'],
    templateUrl: 'profile.component.html' })
export class ProfileComponent implements OnInit {
    currentUser: User;
    userFromApi: User;
    users = [];

    constructor(
        private authenticationService: AuthenticationService,
        private userService: UserService
    ) {
        this.currentUser = this.authenticationService.currentUserValue;
    }

    ngOnInit() {
        this.loadUser();
    }


    deleteUser(id: number) {
        this.userService.delete(id)
            .pipe(first())
            .subscribe(() => this.loadUser());
    }

    private loadUser() {
        this.userService.getById(this.currentUser.id)
            .pipe(first())
            .subscribe(user => {this.userFromApi = user;
        });
    }
}