import { Component, OnInit } from '@angular/core';
import {IProduct} from "../interfaces/IProduct";
import {ProductService} from "../product.service";
import {first} from "rxjs";

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {

  productList: IProduct[] = this.productService.getProductList();

  constructor(private productService: ProductService) {this.productService.$productList.pipe(first()).subscribe((list) => {
      this.productList = list;
    });
  }

  ngOnInit(): void {
  }
}
