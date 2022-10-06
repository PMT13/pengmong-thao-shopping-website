import {Component, Input, OnInit} from '@angular/core';
import {IProduct} from "../interfaces/IProduct";

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit {

  @Input() product!: IProduct;
  @Input() inCart!: boolean;
  cartCount = 0;

  constructor() { }

  ngOnInit(): void {
  }

}
