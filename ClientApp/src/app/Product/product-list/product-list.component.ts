import { Component, OnInit } from '@angular/core';
import { Product } from '../Models/product';
import { ProductService } from '../../_service/product.service';
import { AuthenticationService } from 'src/app/Auth/authetication.service';
import { Router } from '@angular/router';
import { Cart } from '../Models/cart';


@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {
  public _product : Product[];
  public userDetails = JSON.parse(localStorage.getItem('currentUser'));
  count : number;
  id: any;
  carts : Cart[];
  prdtIds : number[];
  ids : any;
  constructor(private service : ProductService,private _authService : AuthenticationService,private route : Router) { }

  ngOnInit() {
    debugger;
    this.userDetails;
    console.log(this.userDetails);
    this._getProduct(this._product);
    this._getcount(this.count);
  
  }
  _getcount(count){
    debugger;
    const  userDetails = JSON.parse(localStorage.getItem('currentUser'));
    this.ids = this.userDetails.id;
    this.service.GetCount(count,this.ids).subscribe((result : any)=>{
      this.count = result;
    })
  }

  _getProduct(_product){

    this.service.GetProductList(_product).subscribe((result : any)=> {
      this._product = result;
      console.log(this._product);
      this.prdtIds;
    });
 
  }
  onLogout(){
    this._authService.logout()
  }

  AddProduct(id,quantity,name,price): void {
    debugger;
    const  userDetails = JSON.parse(localStorage.getItem('currentUser'));

     let payload : any= {
       productId: id,
        productName:name,
      //  produtImg:image,
       quantity:quantity,
       price:price,
       userId : (userDetails && userDetails.id)? userDetails.id : null
     };
     
    //  if(checkQty>10){
      if (payload.userId) {
  
      this.service.AddCart(payload).subscribe((result : any)=>{
        this._product = result;
        this.ngOnInit();
        console.log(this._product);
      })}else{
        this.route.navigate(['/user/login'])
      }
    //  }else{ this.ngOnInit();}
 
    }
    _getCart(carts) {
      debugger;
      const  userDetails = JSON.parse(localStorage.getItem('currentUser'));
      if (userDetails) {
      this.id = this.userDetails.id;
      this.service.GetCart(carts,this.id).subscribe((data: any) => {
        this.carts = data;
   this.carts.forEach((e)=>{
  this.prdtIds.push(e.productId);
   })
      
        console.log(this.carts);
      });}else{
        this.route.navigate(['/user/login'])
      }
    }
}
