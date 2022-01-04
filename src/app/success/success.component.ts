import { Component, OnInit } from '@angular/core';
import { CartService } from '../services/cart.service';

@Component({
  selector: 'app-success',
  templateUrl: './success.component.html',
  styleUrls: ['./success.component.css']
})
export class SuccessComponent implements OnInit {
  name: string = ''
  cost: number = 0

  constructor( private cartService: CartService) { }

  ngOnInit(): void {
    this.name = this.cartService.name
    this.cost = this.cartService.cost
    this.resetCartData()
  }

  //once checkout is performed, the cart data is cleared.
  resetCartData(){
    this.cartService.products = []
    this.cartService.name = ''
    this.cartService.address = ''
    this.cartService.cost = 0
    this.cartService.card = 0
  }

}
