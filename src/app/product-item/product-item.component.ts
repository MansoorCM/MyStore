import { Component, Input, OnInit } from '@angular/core';
import { Product } from '../models/product';
import { CartService } from '../services/cart.service';

@Component({
  selector: 'app-product-item',
  templateUrl: './product-item.component.html',
  styleUrls: ['./product-item.component.css']
})
export class ProductItemComponent implements OnInit {

  @Input() product: Product
  quantities = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
  quantity = 1

  constructor(private cartService: CartService) { 
    this.product = {id:1, name: '', price: 1, url: '', description: '', quantity: 1}
  }

  ngOnInit(): void {
  }

  selectQuantity(event: EventTarget | null){
    if(event != null){
      this.quantity = (event as HTMLInputElement).value as unknown as number
    }
  }
  
  addToCart(){
    this.cartService.addProductToCart(this.product.id, this.quantity)
    alert('item added to cart');
  }

}
