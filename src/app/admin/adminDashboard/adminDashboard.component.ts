import { Component, OnInit,Input } from '@angular/core';
import { first } from 'rxjs/operators';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { UserService,  AuthenticationService } from '../../_services';
import { Product } from '../../_models/Product.Model';
import { ProductService } from '../../_services/product.service';
import { OrderService } from '../../_services/order.service';
import { IAlert } from '../../_models/IAlert';
import { User } from '../../_models';
import { OrderDetail } from 'src/app/_models/OrderDetail.Model';

@Component({
  selector: 'app-adminDashboard',
  templateUrl: 'adminDashboard.component.html',
  styleUrls: ['./adminDashboard.component.scss']
})
export class AdminDashboardComponent implements OnInit {
  previewUrl: string = " ";
  fileToUpload: File = null;


  productForm: FormGroup;
  sellerName:string="";
  sellerId:number=0;
  orders: OrderDetail[];

  @Input()
  public alerts: Array<IAlert> = [];
  public globalResponse: any;
  public orderResponse: any;
  productImage:File=null;
  currentUser: User;
  user : User;

  constructor(private fb: FormBuilder,private authenticationService:AuthenticationService,private productService:ProductService, private userService: UserService, private orderService: OrderService) 
  { 
    this.currentUser = this.authenticationService.currentUserValue;
  }

  ngOnInit() {
    this.productForm = this.fb.group({
      Name:  ['', Validators.compose([Validators.required, Validators.minLength(3),Validators.maxLength(50)])],
      Description:['',Validators.compose([Validators.required, Validators.minLength(3),Validators.maxLength(50)])],
      Price:['',Validators.compose([Validators.required])],
      Category:['',Validators.required],
      Quantity:['',Validators.required],
      Address:['',Validators.required],
      image:['',Validators.required],
      Conditions:['',''],
    });
     this.GetSellerDetails();
     

     this.orderService.getAllOrders()
     .subscribe((result) => {
       this.orderResponse = result;             
     },
     error => { //This is error part
       console.log(error.message);
     },
     () => {
         //  This is Success part
         console.log("Orders fetched sucssesfully.");
         console.log(this.orderResponse);
         this.orders=this.orderResponse;
         }
     )

  }

  GetSellerDetails()
  {
    this.userService.getById(this.currentUser.id)
            .pipe(first())
            .subscribe(user => {this.user = user;
        });
  }
  formData = new FormData();
  handleFileInput(files) {
    //this.fileToUpload = files.item(0);
    for (let file of files){
      this.formData.append(file.name, file);
      console.log(this.formData.get(file.name));
    }
    //Show image preview
    var reader = new FileReader();
    reader.onload = (event:any) => {
      this.previewUrl = event.target.result;
    }
    reader.readAsDataURL(this.fileToUpload);
  }
  
  OnSaveProduct(productForm)
  {

    this.formData.append('Name', productForm.get('Name').value);
    this.formData.append('Description', productForm.get('Description').value);
    this.formData.append('UnitPrice', productForm.get('Price').value);
    this.formData.append('Category', productForm.get('Category').value);
    this.formData.append('Quantity', productForm.get('Quantity').value);
    this.formData.append('BillingAddress', productForm.get('Address').value);
    this.formData.append('TC', productForm.get('Conditions').value);
    this.formData.append('SellerId', this.user.id.toString());
    this.formData.append('SellerName', this.user.firstName);

    this.alerts=[];
    console.log(this.formData);
    //console.log(this.formData.get('testImage.jpg'));
    
    this.productService.saveProductInfo(this.formData)
        .subscribe((result) => {
          this.globalResponse = result; 
          this.previewUrl = "";             
        },
        error => { //This is error part
          console.log(error.message);
          this.alerts.push({
            id: 2,
            type: 'danger',
            message: 'Something went wrong while saving the product, Please try after sometime.'
          });
        },
        () => {
            //  This is Success part
            // console.log(this.globalResponse);
            this.alerts.push({
              id: 1,
              type: 'success',
              message: 'Product has been saved successfully. Now you can add more prodcut , if you wish to.',
            });
            
            }
          )
    }
    public closeAlert(alert: IAlert) {
        const index: number = this.alerts.indexOf(alert);
        this.alerts.splice(index, 1);
    }       
}

