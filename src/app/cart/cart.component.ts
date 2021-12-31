import { Component, OnInit } from '@angular/core';
import { Product } from '../models/product';
import { CartService } from '../services/cart.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {

  cartItems: Product[] = []
  name: string = ''
  address: string = ''
  card: number | undefined
  

  constructor(private cartService: CartService) { }

  ngOnInit(): void {
    this.cartService.getCartItems().subscribe(data => this.cartItems = data)
  }

  checkout(){
    this.cartService.name = this.name
    this.cartService.address = this.address
    this.cartService.card = this.card as number
  }

  //checks if input is of type number (without using type = number in html). type any is used for event 
  //as 'Event' type was not working 
  numberOnly(event: any): boolean {
    const charCode = (event.which) ? event.which : event.keyCode;
    if (charCode > 31 && (charCode < 48 || charCode > 57)) {
      return false;
    }
    return true;

  }

}
