import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Comment } from '../_models/comment.Model';
import { first } from 'rxjs/operators';
import { CommunicationService } from '../_services/communication.service';


@Injectable({
  providedIn: 'root'
})
export class SharedService {
  comments: Comment [];

  private currentCartCount = new BehaviorSubject(0);
  currentMessage = this.currentCartCount.asObservable();

  public isThereNewComment: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  //public CommentArray: BehaviorSubject<Comment> = new BehaviorSubject<Comment>(null);

  constructor(private communicationService:CommunicationService,) {
  }
  
  updateCartCount(count: number) {
    this.currentCartCount.next(count)
  }
  /*
  private loadAllComments() {
    this.communicationService.getAllComments()
        .pipe(first())
        .subscribe(comments  => this.comments = comments);
        return this.comments;
  }*/
}
