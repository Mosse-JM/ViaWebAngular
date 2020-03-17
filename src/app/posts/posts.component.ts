import { Component, OnChanges, OnInit,EventEmitter, Output, Input } from '@angular/core';
import { first } from 'rxjs/operators';
import { CommunicationService } from '../_services/communication.service';
import { Comment } from '../_models/comment.Model';
import { SharedService } from '../_services/shared.service';
import { AuthenticationService } from '../_services/authentication.service';
import { User } from '../_models/user';
import { Role } from '../_models';


@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.scss']
})
export class PostsComponent implements OnInit, OnChanges {

  //@Output() refresh: EventEmitter<Comment> = new EventEmitter();
  @Input() parrentComment:Comment;
  comments: Comment [];
  isThereNewComment: boolean;
  currentUser: User;

  constructor(private communicationService:CommunicationService,
    private sharedService:SharedService,
    private authenticationService: AuthenticationService) 
  {
    this.sharedService.isThereNewComment.subscribe( value => {
      this.isThereNewComment = value;
    
      /*if(this.isThereNewComment)
      this.sharedService.CommentArray.subscribe(value =>{
        this.comments = value
      })*/
    });

    this.authenticationService.currentUser.subscribe(x => this.currentUser = x);
    
  }

  ngOnInit() {
    this.loadAllComments(); 
  }

  ngOnChanges() {
    if(this.parrentComment){
    this.comments.push(this.parrentComment);
    //this.refresh.emit(this.parrentComment);
    }
  }

  OnDelete(id: number){
    this.communicationService.deleteComment(id)
        .pipe(first())
        .subscribe(() => this.loadAllComments());
    //this.comments = this.comments.filter(t => t.id !== id);
  }

  updateComment(comment: Comment){
    this.communicationService.updateComment(comment)
        .pipe(first())
        .subscribe(() => this.loadAllComments());
  }

  get isAdmin() {
    return this.currentUser && this.currentUser.role === Role.Admin;
  }

  private loadAllComments() {
    this.communicationService.getAllComments()
        .pipe(first())
        .subscribe(comments  => this.comments = comments);
  }

}
