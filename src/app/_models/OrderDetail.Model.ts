
import { OrderItem } from "./OrderItem.Model";

export interface OrderDetail
{
     orderId :number;
     customerId :number;
     customerName:string;
     deliveryAddress:string;
     phone:string;
     orderPayMethod :string;
     paymentRefrenceId :string;
     email:string;
     message:Text;
     orderItems:OrderItem[];
}