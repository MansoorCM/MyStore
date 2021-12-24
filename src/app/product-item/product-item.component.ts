import { Component, Input, OnInit } from '@angular/core';
import { Product } from '../models/product';

@Component({
  selector: 'app-product-item',
  templateUrl: './product-item.component.html',
  styleUrls: ['./product-item.component.css']
})
export class ProductItemComponent implements OnInit {

  @Input() product: Product
  quantities = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
  quantity = 1

  constructor() { 
    this.product = {id:1, name: '', price: 1, url: '', description: ''}
  }

  ngOnInit(): void {
  }

  selectQuantity(quantity: number){
    this.quantity = quantity
  }

}
