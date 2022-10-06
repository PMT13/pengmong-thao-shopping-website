import { Injectable } from '@angular/core';
import {IAccount} from "./interfaces/IAccount";
import {first, Subject} from "rxjs";
import {HttpService} from "./http.service";

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  private accountList: IAccount[] = [];
  private user!: IAccount;
  private isLoggedIn: boolean = false;
  $isLoggedIn: Subject<boolean> = new Subject<boolean>();
  $user: Subject<IAccount> = new Subject<IAccount>();

  constructor(private httpService: HttpService) {
      this.httpService.getAccounts().pipe(first()).subscribe({
      next: data => {
        this.accountList = data;
      },
      error: (err) => {
        console.error(err);
      }
    })
  }
  getAccountList(){
    return this.accountList;
  }
  getUser(){
    return this.user;
  }
  setUser(user:IAccount){
    this.user = user;
  }
  getLoginStatus(){
    return this.isLoggedIn;
  }
  setLoginStatus(bool:boolean){
    this.isLoggedIn = bool;
    this.$isLoggedIn.next(this.isLoggedIn);     // next notifies all things subscribed to the "this.$loggedIn" to update
    this.$user.next(this.user);
  }
}
