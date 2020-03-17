import { Component, EventEmitter, Output,OnInit } from '@angular/core';
import { ProductDisplay } from '../../_models/ProductDisplay.Model';

import { ProductService } from '../../_services/product.service';
import { Product } from '../../_models/Product.Model';
import { IAlert } from '../../_models/IAlert';
import { SharedService } from '../../_services/shared.service';

@Component({
  selector: 'app-productdisplay',
  templateUrl: './productdisplay.component.html',
  styleUrls: ['./productdisplay.component.scss'],
  providers:[ProductService]
})
export class ProductdisplayComponent implements OnInit {

  public alerts: Array<IAlert> = [];
  cartItemCount: number = 0;
  @Output() cartEvent = new EventEmitter<number>();
  public globalResponse: any;
  yourByteArray:any;
  allProducts: ProductDisplay[];
  productsAddedTocart:Product[];
  constructor(private productService:ProductService,private sharedService:SharedService) { }

  ngOnInit() {
    this.productService.getAllProducts()
            .subscribe((result) => {
              this.globalResponse = result;             
            },
            error => { //This is error part
              console.log(error.message);
            },
            () => {
                //  This is Success part
                console.log("Product fetched sucssesfully.");
                console.log(this.globalResponse);
                this.allProducts=this.globalResponse;
                }
            )
  }
  OnAddCart(product:Product)
  {
    console.log(product);
    
    this.productsAddedTocart=this.productService.getProductFromCart();
    if(this.productsAddedTocart==null)
    {
      this.productsAddedTocart=[];
      this.productsAddedTocart.push(product);
      this.productService.addProductToCart(this.productsAddedTocart);
      this.alerts.push({
        id: 1,
        type: 'success',
        message: 'Product added to cart.'
      });
      setTimeout(()=>{   
        this.closeAlert(this.alerts);
      }, 3000);
    }
    else
    {
      let tempProduct=this.productsAddedTocart.find(p=>p.id==product.id);
      if(tempProduct == null)
      {
        this.productsAddedTocart.push(product);
        this.productService.addProductToCart(this.productsAddedTocart);
        this.alerts.push({
          id: 1,
          type: 'success',
          message: 'Product added to cart.'
        });
        //setTimeout(function(){ }, 2000);
        setTimeout(()=>{   
          this.closeAlert(this.alerts);
      }, 4000);
      }
      else
      {
        this.alerts.push({
          id: 2,
          type: 'warning',
          message: 'Product already exist in cart. to add to the number of you can go to cart '
        });
        setTimeout(()=>{   
          this.closeAlert(this.alerts);
      }, 4000);
      }
      
    }
    //console.log(this.cartItemCount);
    this.cartItemCount=this.productsAddedTocart.length;
    //this.cartEvent.emit(this.cartItemCount);
    this.sharedService.updateCartCount(this.cartItemCount);
  }
  public closeAlert(alert:any) {
    const index: number = this.alerts.indexOf(alert);
    this.alerts.splice(index, 1);
  }   
}


