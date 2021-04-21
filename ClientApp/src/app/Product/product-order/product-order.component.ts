import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ProductService } from 'src/app/_service/product.service';
import { Order } from '../Models/order';

@Component({
  selector: 'app-product-order',
  templateUrl: './product-order.component.html',
  styleUrls: ['./product-order.component.css']
})
export class ProductOrderComponent implements OnInit {
  userDetails = JSON.parse(localStorage.getItem('currentUser'));
  id: any;
  public orders : Order[];

  constructor(private service : ProductService,private route : Router) { }

  ngOnInit() {
    this._getOrder(this.orders);
  }
  _getOrder(model) {
    debugger;
    const  userDetails = JSON.parse(localStorage.getItem('currentUser'));
    if (userDetails) {
    this.id = this.userDetails.id;
    this.service.OrderedList(model,this.id).subscribe((data: any) => {
      this.orders = data;
      console.log(this.orders);
      this.orders.forEach((item) => {
         for(let i of (item as any).cartModel) {
          console.log(2,i)
        }
      })
    });}else{
      this.route.navigate(['/user/login'])
    }
  }
}
