import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders  } from '@angular/common/http';
import { Observable } from 'rxjs';

const httpOptions = {
  headers: new HttpHeaders ({
    'Content-Type' : 'application/json'
  })
}

@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor(private http: HttpClient) { }

  getUsers(){
    return this.http.get('https://jsonplaceholder.typicode.com/users') 
  }

  getUser(userId){
    return this.http.get('https://jsonplaceholder.typicode.com/users/'+userId) 
  }

  getPosts(){
    return this.http.get('https://jsonplaceholder.typicode.com/posts?_limit=5') 
  }

}

