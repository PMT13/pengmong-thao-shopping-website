import { Component, OnInit } from '@angular/core';
import {LoginService} from "../login.service";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  username!: string;
  password!: string;

  constructor(private loginService: LoginService) { }

  ngOnInit(): void {
  }

  login(){
    const foundAccount = this.loginService.getAccountList().find((account) => {
      return account.username === this.username &&
        account.password === this.password
    });
    if( foundAccount === undefined){
      alert("Invalid Login");
      return;
    }else{
      this.loginService.setUser(foundAccount);
      this.loginService.setLoginStatus(true);
    }
  }
  register(){
    // const accountExist = this.data.getAccountList().find((account) => {return account.username === this.username});
    // if( accountExist !== undefined){
    //   alert("Username already exists.");
    //   return;
    // }
    // if(this.username === undefined || this.password === undefined){
    //   alert("Please fill in all input fields");
    //   return;
    // }
    // if(this.username.replace(/\s/g, '') === "" || this.password.replace(/\s/g, '') === ""){
    //   alert("Please fill in all input fields");
    //   return;
    // }
    // this.data.addAccount({username:this.username,password:this.password});
    // this.data.setLoginStatus(true);
    // this.data.setUsername(this.username);
  }
}
