import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {LoginService} from "../login.service";
import {first} from "rxjs";
import {CartService} from "../cart.service";
import {IAccount} from "../interfaces/IAccount";

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css']
})
export class NavBarComponent implements OnInit {

  @Output() inCart = new EventEmitter<boolean>();
  isLoggedIn: boolean = this.loginService.getLoginStatus();
  searchText: string = "";
  cartSize: number = 0;
  user: IAccount = this.loginService.getUser();

  constructor(private loginService: LoginService, private cartService: CartService) {
    this.loginService.$isLoggedIn.pipe(first()).subscribe((isLoggedIn) => {
      this.isLoggedIn = isLoggedIn
    });
    this.loginService.$user.pipe(first()).subscribe((user) => {
      this.user = user
    });
    this.cartService.$cartSize.pipe(first()).subscribe((size) => {
      this.cartSize = size
    });
  }

  ngOnInit(): void {
  }

  onSearchTextChange(){

  }

  goToCart(){
    this.inCart.emit(true);
  }

  goToProducts(){
    this.inCart.emit(false);
  }

  logout(){

  }
}
