import { Injectable } from '@angular/core';
import {HttpService} from "./http.service";
import {first, Subject} from "rxjs";
import {ICart} from "./interfaces/ICart";
import {LoginService} from "./login.service";

@Injectable({
  providedIn: 'root'
})
export class CartService {

  private cart!: ICart;
  $cart: Subject<ICart> = new Subject<ICart>();
  private cartSize: number = 0;
  $cartSize: Subject<number> = new Subject<number>();
  isLoggedIn: boolean = false;

  constructor(private httpService: HttpService, private loginService: LoginService) {
    this.loginService.$isLoggedIn.subscribe((isLoggedIn) => {
      this.isLoggedIn = isLoggedIn;
      if(this.isLoggedIn === true) {
        const user = this.loginService.getUser();
        this.httpService.getCart(user.id).pipe(first()).subscribe({
          next: data => {
            this.cart = data;
            for (let item of this.cart.productList) {
              this.cartSize += item.count;
            }
            this.$cart.next(this.cart);
            this.$cartSize.next(this.cartSize);
          },
          error: (err) => {
            console.error(err);
          }
        })
      }
    });
  }

  getCart() {
    return this.cart;
  }
  getCartSize(){
    return this.cartSize;
  }
}
