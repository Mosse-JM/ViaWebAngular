import { Injectable } from '@angular/core';
import { HttpClient,HttpClientModule, HttpHeaders } from '@angular/common/http';
import { Observable, of, throwError, pipe} from "rxjs"
import { map, filter, catchError, mergeMap } from 'rxjs/operators';
import { AuthenticationService } from './authentication.service';
import { Product } from '../_models/Product.Model';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  public apiURL:string="http://localhost:4000/api/Product";
  constructor(private httpClient:HttpClient, private authService:AuthenticationService) { }

  saveProductInfo (formData)
  {
    var reqHeader = new HttpHeaders({ 'Authorization':'Bearer '+this.authService.currentUserValue.token});
        reqHeader.append('Content-Type', 'application/json');
        //console.log(formData.get('testImage.jpg'));
        //console.log(formData);
        
    return this.httpClient.post(this.apiURL,formData)//,{ headers: reqHeader })
    .pipe(
      map(res => res),
       catchError( this.errorHandler)
      );
  }
  getAllProducts ()
  {
    return this.httpClient.get(this.apiURL)
    .pipe(
      map(res => res),
       catchError( this.errorHandler)
      );
  }
  addProductToCart(prodcuts: any) {
    localStorage.setItem("product", JSON.stringify(prodcuts));
  }
  getProductFromCart() {
    //return localStorage.getItem("product");
    return JSON.parse(localStorage.getItem('product'));
  }
  removeAllProductFromCart() {
    return localStorage.removeItem("product");
  }
  errorHandler(error: Response) {  
    console.log(error);  
    return throwError(error);  
} 
}
