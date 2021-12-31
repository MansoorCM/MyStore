import { Component, OnInit, Input } from '@angular/core';
import { Product } from '../models/product';
import { CartService } from '../services/cart.service';

@Component({
  selector: 'app-cart-item',
  templateUrl: './cart-item.component.html',
  styleUrls: ['./cart-item.component.css']
})
export class CartItemComponent implements OnInit {

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
    this.cartService.addProductToCart(this.product.id, this.quantity)
  }
  
}
