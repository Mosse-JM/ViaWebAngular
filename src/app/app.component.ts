import { Component } from '@angular/core';
import { ProductService } from './_services/product.service';
import { Product } from './_models/Product.Model';
import { SharedService } from './_services/shared.service';




@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'ViaWeb';
  cartItemCount: number ;
  productsAddedTocart:Product[];

  constructor(private productService:ProductService,private sharedService:SharedService) { }

  ngOnInit() {
    
    if(this.productsAddedTocart=this.productService.getProductFromCart())
    this.cartItemCount=this.productsAddedTocart.length;
    this.sharedService.updateCartCount(this.cartItemCount);
  }
}
