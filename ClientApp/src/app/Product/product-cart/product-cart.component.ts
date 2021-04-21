import { createDirective } from '@angular/compiler/src/core';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ProductService } from 'src/app/_service/product.service';
import { Cart } from '../Models/cart';

@Component({
  selector: 'app-product-cart',
  templateUrl: './product-cart.component.html',
  styleUrls: ['./product-cart.component.css']
})
export class ProductCartComponent implements OnInit {
  public carts : Cart[];
  model : any={}
  subtotal : number;
  myDate : any;
  status = "Pending";
  date = Date.now();
  userDetails = JSON.parse(localStorage.getItem('currentUser'));

 
  id: any;
  constructor(private service : ProductService,private route : Router) { }

  ngOnInit() {
    debugger;
    this._getCart(this.carts,this.subtotal);
    this.myDate = Date.now();
    this.userDetails;
   
  }

  _getCart(carts,subtotal) {
    debugger;
    const  userDetails = JSON.parse(localStorage.getItem('currentUser'));
    if (userDetails) {
    this.id = this.userDetails.id;
    this.service.GetCart(carts,this.id).subscribe((data: any) => {
      this.carts = data;
    this.service.GetTotal(subtotal,this.id).subscribe((data : any)=>{
      this.subtotal = data;})
    
      console.log(this.carts);
    });}else{
      this.route.navigate(['/user/login'])
    }
  }

  _emptyCart(id) {
    debugger;
    const ans = confirm('Do you want to remove?');
    if (ans) {
    this.service.DeleteCart(id).subscribe(() => {
      this._getCart(this.model,this.subtotal);
  
    });}
  }

  _increamentQTY(id,quantity,prt_id,prt_nme,prt_price,prt_tot,usrid,crtid) {
    debugger;
    const payload = {
    itemId: id,
    cartId:crtid,
    productId:prt_id,
    userId : usrid,
    productName:prt_nme,
    price:prt_price,
    quantity:++quantity,
    totalPrice:prt_tot,
       //createdDate : this.date,
      //cartStatus : this.status,
    };
    if(quantity > 10)
    {
      alert("Quantity Shouldn't be more than 10");
      this._getCart(this.model,this.subtotal);
      this.ngOnInit();
    }else
    {
      debugger;
      this.service.EditCart(payload).subscribe(() => {
      //this._getCart(this.model,this.subtotal);
   
      });
     this.ngOnInit();
     }

  }
// getTotal(subtotal : number){
//   debugger;
// this.service.GetTotal(subtotal,).subscribe((data : any)=>{
// this.subtotal = data;
// })
// }
  _decreamentQTY(id,quantity,prt_id,prt_nme,prt_price,prt_tot,usrid,crtid) {
    debugger;
    const payload = {
      itemId: id,
      cartId:crtid,
      productId:prt_id,
      userId : usrid,
     productName:prt_nme,
      price:prt_price,
      quantity:--quantity,
      //cartStatus : 'Pending',
       totalPrice:prt_tot,
      //createdDate : '',
  
    };
    if(quantity == 0)
    {
      debugger;
      const ans = confirm("Do you want to remove cart?")
      if(ans){this.service.DeleteCart(id).subscribe(() => {
         this._getCart(this.model,this.subtotal);
          });
          this.ngOnInit();
        }
      else{this._getCart(this.model,this.subtotal);}
    }else
    {
      debugger;
      this.service.EditCart(payload).subscribe(() => {
      //this._getCart(this.model,this.subtotal);
   
      });
     this.ngOnInit();
     }
  }
  // item.cart_id,item.product_Id,item.product_name,item.product_price ,subtotal,item.product_quantity,myDate
  OrderCart(value,subtotal) {
    debugger;
    const items : any={
     userId : value,
     orderedPrice :subtotal
  //   totalprice:sTot,
  //   date:dt
   };
    const ans = confirm("Do you want to Proceed?")
    debugger;
    console.log(value);
    if(ans){this.service.AddOrder(items).subscribe(() => {
   
        });
        this.route.navigate(['/orders'])
      }else
        { this.ngOnInit();}
        
  }
}
