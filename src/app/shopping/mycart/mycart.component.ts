import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { Product } from '../../_models/Product.Model';
import { ProductService } from '../../_services/product.service';
import { IAlert } from '../../_models/IAlert';
import { OrderDetail } from '../../_models/OrderDetail.Model';
import { User } from '../../_models/user';
import { AuthenticationService } from '../../_services/authentication.service';
import { OrderService } from '../../_services/order.service';
import { OrderItem } from '../../_models/OrderItem.Model';

@Component({
  selector: 'app-mycart',
  templateUrl: './mycart.component.html',
  styleUrls: ['./mycart.component.scss']
})
export class MycartComponent implements OnInit {
  dafualtQuantity:number=1;
  productAddedTocart:Product[];
  allTotal:number;
  currentUser: User;
  orderDetail:OrderDetail;
  orderItem:OrderItem[];

  public globalResponse: any;
  public alerts: Array<IAlert> = [];

  deliveryForm:FormGroup;


  constructor(private productService:ProductService,private fb: FormBuilder,private authenticationService: AuthenticationService, private orderService:OrderService) 
  {
    
  }

  ngOnInit() {
    this.productAddedTocart=this.productService.getProductFromCart();
    for (let i in this.productAddedTocart) {
      this.productAddedTocart[i].orderedQuantity=1;
    }
    this.productService.removeAllProductFromCart();
    this.productService.addProductToCart(this.productAddedTocart);
    this.GetLoggedinUserDetails();
    this.calculteAllTotal(this.productAddedTocart);
    
    this.deliveryForm = this.fb.group({
    Name:  ['', [Validators.required]],
    DeliveryAddress:['',[Validators.required]],
    Phone:['',[Validators.required]],
    Email:['',[Validators.required]],
    Message:['',[]],
    Amount:['',[Validators.required]],
    });
    this.deliveryForm.controls['Amount'].setValue(this.allTotal);
  }

  calculteAllTotal(allItems:Product[])
  {
    let total=0;
    for (let i in allItems) {
      total= total+(allItems[i].orderedQuantity *allItems[i].unitPrice);
    }
    this.allTotal=total;
  }


  onAddQuantity(product:Product)
  {
    //Get Product
    this.productAddedTocart=this.productService.getProductFromCart();
    this.productAddedTocart.find(p=>p.id==product.id).orderedQuantity = product.orderedQuantity+1;
    this.productService.removeAllProductFromCart();
    this.productService.addProductToCart(this.productAddedTocart);
    this.calculteAllTotal(this.productAddedTocart);
    this.deliveryForm.controls['Amount'].setValue(this.allTotal);
   
  }
  onRemoveQuantity(product:Product)
  {
    this.productAddedTocart=this.productService.getProductFromCart();
    this.productAddedTocart.find(p=>p.id==product.id).orderedQuantity = product.orderedQuantity-1;
    this.productService.removeAllProductFromCart();
    this.productService.addProductToCart(this.productAddedTocart);
    this.calculteAllTotal(this.productAddedTocart);
    this.deliveryForm.controls['Amount'].setValue(this.allTotal);

  }


  GetLoggedinUserDetails()
  {
    //this.currentUser=this.authService.getRole();
    this.currentUser = this.authenticationService.currentUserValue;
            
  }
  
  
  mapOrderItem(){  
    this.orderItem = [];
    for (let i in this.productAddedTocart) {
      this.orderItem.push({
        productId:this.productAddedTocart[i].id,
        sellerId:this.productAddedTocart[i].sellerId,
        productName:this.productAddedTocart[i].name,
        orderedQuantity:this.productAddedTocart[i].orderedQuantity,
        perUnitPrice:this.productAddedTocart[i].unitPrice,
      });
    }
  }
  

  ContinueToPay()
  { console.log("continue clicked");
    const date: Date = new Date();
    var day = date.getDate();
    var monthIndex = date.getMonth();
    var year = date.getFullYear();
    var minutes = date.getMinutes();
    var hours = date.getHours();
    var seconds = date.getSeconds();
    var dateTimeStamp=day.toString()+monthIndex.toString()+year.toString()+minutes.toString()+hours.toString()+seconds.toString();
    
    
    //Assigning the ordered item details
    this.mapOrderItem();
    //So now compelte object of order is
    let orderDetail:any={};  
    orderDetail.orderItems=this.orderItem;

    //Orderdetail is object which hold all the value, which needs to be saved into database

    orderDetail.CustomerName = this.deliveryForm.get('Name').value;
    orderDetail.DeliveryAddress = this.deliveryForm.controls['DeliveryAddress'].value;
    orderDetail.Phone = this.deliveryForm.controls['Phone'].value;
    orderDetail.Email = this.deliveryForm.controls['Email'].value;
    orderDetail.Message = this.deliveryForm.controls['Message'].value;
    orderDetail.PaymentRefrenceId=this.orderItem+"-"+"orderId"+"-"+orderDetail.CustomerName+"-"+dateTimeStamp;
    orderDetail.orderPayMethod = "ByCard"
    console.log(orderDetail);
    this.orderService.PlaceOrder(orderDetail)
            .subscribe((result) => {
              this.globalResponse = result;              
            },
            error => { //This is error part
              console.log(error.message);
              this.alerts.push({
                id: 2,
                type: 'danger',
                message: 'Something went wrong while placing the order, Please try after sometime.'
              });
            },
            () => {
                //  This is Success part
                //console.log(this.globalResponse);
                this.alerts.push({
                  id: 1,
                  type: 'success',
                  message: 'Order has been placed succesfully.',
                });
                }
            )
    this.productService.removeAllProductFromCart();

  }
  public closeAlert(alert: IAlert) {
    const index: number = this.alerts.indexOf(alert);
    this.alerts.splice(index, 1);
  } 
}
