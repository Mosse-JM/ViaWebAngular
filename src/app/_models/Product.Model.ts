import { Image } from "./image";
export interface Product
{
    id:number;
    name:string;
    description:string;
    billingAddress:string;
    unitPrice:number;
    category:string;
    quantity:number;
    imageFilePath: string;
    tc:string;
    sellerId:number;
    sellerName:string;
    orderedQuantity :number;
}