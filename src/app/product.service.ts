import { Injectable } from '@angular/core';
import {HttpService} from "./http.service";
import {first, Subject} from "rxjs";
import {IProduct} from "./interfaces/IProduct";

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  private productList: IProduct[] = [];
  $productList: Subject<IProduct[]> = new Subject<IProduct[]>();

  constructor(private httpService: HttpService) {
    this.httpService.getProducts().pipe(first()).subscribe({
      next: data => {
        this.productList = data;
        this.$productList.next(this.productList);
      },
      error: (err) => {
        console.error(err);
      }
    })
  }

  getProductList(){
    return this.productList;
  }
}
