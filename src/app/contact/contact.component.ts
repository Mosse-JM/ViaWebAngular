import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators} from '@angular/forms'
import { CommunicationService } from '../_services/communication.service';
import { Comment } from '../_models/comment.Model';
import { IAlert } from '../_models/IAlert';
import { SharedService } from '../_services/shared.service';
import { first } from 'rxjs/operators';

import { User } from '../_models/user';
import { UserService, AuthenticationService } from '../_services';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss']
})
export class ContactComponent implements OnInit {

  comments: Comment [];
  currentUser: User;
  users = [];
  userMessage:string;
  public alerts: Array<IAlert> = [];
  public globalResponse: any;

  postForm: FormGroup;
  submitted:boolean = false;
  success:boolean = false;
  anotherComment:Comment;
 

  constructor(
    private formBuilder: FormBuilder, 
    private communicationService:CommunicationService,         
    private authenticationService: AuthenticationService,
    private sharedService:SharedService) { 

    this.currentUser = this.authenticationService.currentUserValue; 

    this.postForm = this.formBuilder.group({
      link: ['' , Validators.nullValidator],
      text: ['' , Validators.required],
    })
  }

  ngOnInit() {
    this.loadAllComments();
  }
  newComment = new Comment();
  formData = new FormData();
  OnSend(postForm){
    this.formData = new FormData();
    //this.formData.append('userName',  postForm.get('userName').value);
    this.formData.append('link',  postForm.get('link').value);
    this.formData.append('text',  postForm.get('text').value);
    //this.newComment.link = postForm.get('link').value;
    //this.newComment.text = postForm.get('text').value;
    //this.comments.push(this.newComment);

    this.alerts=[];

    //console.log(this.formData.get('testImage.jpg'));

    this.communicationService.sendComment(this.formData)/*
        .subscribe((res) => {
          this.newComment = <Comment>res;
          this.comments.push(this.newComment);
          console.log(this.comments);           
        },*/
        .pipe(first())
        .subscribe((res) => {this.loadAllComments(),
                            this.anotherComment = <Comment>res},
       
        error => { //This is error part
          console.log(error.communication);
          this.alerts.push({
            id: 2,
            type: 'danger',
            message: 'Something went wrong!'
          });
        },
        );
        this.sharedService.isThereNewComment.next(true);
        //this.sharedService.CommentArray.next(this.anotherComment);
        this.postForm.reset();
    }
    public closeAlert(alert: IAlert) {
        const index: number = this.alerts.indexOf(alert);
        this.alerts.splice(index, 1);
    }

    private refreshComment(){
      console.log("fromrecontactfresh")
    }
    
    private loadAllComments() {
      this.communicationService.getAllComments()
          .pipe(first())
          .subscribe(comments  => this.comments = comments);
    }
}
