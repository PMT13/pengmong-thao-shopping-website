import { Component } from '@angular/core';
import {first} from "rxjs";
import {LoginService} from "./login.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'shopping-website';

  private isLoggedIn: boolean = false;
  inCart: boolean = false;

  constructor(private loginService: LoginService) {this.loginService.$isLoggedIn.pipe(first()).subscribe((isLoggedIn) => {
      this.isLoggedIn = isLoggedIn
    });
  }

  getLoginStatus(){
    return this.isLoggedIn;
  }

  onCartPage(event: boolean){
    this.inCart = event;
  }
}
