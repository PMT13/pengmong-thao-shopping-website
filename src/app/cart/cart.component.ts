import { Component, OnInit } from '@angular/core';
import {IProduct} from "../interfaces/IProduct";
import {ICart} from "../interfaces/ICart";
import {CartService} from "../cart.service";
import {first} from "rxjs";

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {

  cartInfo: ICart = this.cartService.getCart();
  cartProducts: IProduct[] = [];

  constructor(private cartService: CartService) {
    this.cartService.$cart.pipe(first()).subscribe((cart) => {
      this.cartInfo = cart;
      this.updateCartProducts()
    });
    this.updateCartProducts()
  }

  ngOnInit(): void {
  }

  updateCartProducts(){
    for(let item of this.cartInfo.productList){
      this.cartProducts.push(item.product);
    }
  }
}
