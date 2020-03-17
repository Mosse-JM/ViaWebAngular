import { Injectable } from '@angular/core';
import { HttpClient,HttpClientModule, HttpHeaders } from '@angular/common/http';
import { Observable, of, throwError, pipe} from "rxjs"
import { map, filter, catchError, mergeMap } from 'rxjs/operators';
import { AuthenticationService } from './authentication.service';
import { Message } from '../_models/message.Model';
import { Comment } from '../_models/comment.Model';

@Injectable({
  providedIn: 'root'
})
export class CommunicationService {

  public commentApiURL:string="http://localhost:4000/api/Communication/Comments";
  public messageApiURL:string="http://localhost:4000/api/Communication/Message";
  constructor(private httpClient:HttpClient, private authService:AuthenticationService) { }

  sendMessage (formData)
  {
    var reqHeader = new HttpHeaders({ 'Authorization':'Bearer '+this.authService.currentUserValue.token});
        reqHeader.append('Content-Type', 'application/json');
        //console.log(formData.get('testImage.jpg'));
        //console.log(formData);
        
    return this.httpClient.post(this.messageApiURL,formData)//,{ headers: reqHeader })
    .pipe(
      map(res => res),
       catchError( this.errorHandler)
      );
  }
  getAllMessages()
  {
    return this.httpClient.get<Message[]>(this.messageApiURL)
    .pipe(
      map(res => res),
       catchError( this.errorHandler)
      );
  }

  deleteMessage(id: number){
    return this.httpClient.delete(`http://localhost:4000/api/Communication/Message/${id}`);
  }

  sendComment (formData)
  {
    var reqHeader = new HttpHeaders({ 'Authorization':'Bearer '+this.authService.currentUserValue.token});
        reqHeader.append('Content-Type', 'application/json');
        //console.log(formData.get('testImage.jpg'));
        //console.log(formData);
        
    return this.httpClient.post(this.commentApiURL,formData)//,{ headers: reqHeader })
    .pipe(
      map(res => res),
       catchError( this.errorHandler)
      );
  }

  getAllComments()
  {
    return this.httpClient.get<Comment[]>(this.commentApiURL)
    .pipe(
      map(res => res),
       catchError( this.errorHandler)
      );
  }

  deleteComment(id: number){
    return this.httpClient.delete(`http://localhost:4000/api/Communication/Comments/${id}`);
  }

  updateComment(comment: Comment){
    return this.httpClient.put(this.commentApiURL,comment);
  }

  errorHandler(error: Response) {  
    console.log(error);  
    return throwError(error);  
  } 
}
