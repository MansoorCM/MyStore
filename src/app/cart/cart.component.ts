import { Component, OnInit } from '@angular/core';
import { Product } from '../models/product';
import { CartService } from '../services/cart.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css'],
})
export class CartComponent implements OnInit {
  cartItems: Product[] = [];
  name: string = '';
  address: string = '';
  card: number | undefined;
  cost = 0;

  // the cost maintained in this component is not getting updated immediately when the cost in the 'cart service' changes, so as a
  // result I have made the cartService public inorder to access it in the html( this seems to be the wrong way, but I didn't found
  //a way to make it work with the cartService as private. )
  constructor(public cartService: CartService, private router: Router) {
    this.cost = this.cartService.cost;
  }

  ngOnInit(): void {
    this.cartService.getCartItems().subscribe((data) => {
      this.cartItems = data;
      this.cost = this.cartService.cost;
    });
    this.cartService.getCost().subscribe((data) => {
      this.cost = data;
    });
  }

  checkout() {
    this.cartService.name = this.name;
    this.cartService.address = this.address;
    this.cartService.card = this.card as number;
    if(this.cartService.products.length == 0){
      alert('shopping cart is empty. Add products to perform checkout')
    }else{
      this.router.navigateByUrl('/cart/success');
    }
  }

  //checks if input is of type number (without using type = number in html). type any is used for event
  //as 'Event' type was not working
  // the following function is no longer used, for credit card number, the validation was done in the css.
  allowNumbersOnly(event: any): boolean {
    const charCode = event.which ? event.which : event.keyCode;
    if (charCode > 31 && (charCode < 48 || charCode > 57)) {
      return false;
    }
    return true;
  }
}
