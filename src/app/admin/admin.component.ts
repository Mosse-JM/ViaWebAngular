import { Component, OnInit } from '@angular/core';
import { first } from 'rxjs/operators';
import { CommunicationService } from '../_services/communication.service';
import { User } from '../_models';
import { Message } from '../_models/message.Model';
import { UserService, AuthenticationService } from '../_services';

@Component({ 
    styleUrls: ['admin.component.scss'],
    templateUrl: 'admin.component.html' })
export class AdminComponent implements OnInit {
    currentUser: User;
    userFromApi: User;
    users = [];
    messages: Message [];

    constructor(
        private communicationService:CommunicationService,
        private authenticationService: AuthenticationService,
        private userService: UserService,
    ) {
        this.currentUser = this.authenticationService.currentUserValue;
    }

    ngOnInit() {
        this.loadAllUsers();
        this.loadAllMessages();
    }

    deleteUser(id: number) {
        this.userService.delete(id)
            .pipe(first())
            .subscribe(() => this.loadAllUsers());
    }

    OnDelete(id: number){
        this.communicationService.deleteMessage(id)
            .pipe(first())
            .subscribe(() => this.loadAllMessages());
    }

    private loadAllUsers() {
        this.userService.getAll()
            .pipe(first())
            .subscribe(users => this.users = users);
    }

    private loadAllMessages() {
        this.communicationService.getAllMessages()
            .pipe(first())
            .subscribe(messages  => this.messages = messages);
    }
}