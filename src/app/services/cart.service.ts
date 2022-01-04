import { Injectable } from '@angular/core';
import { Product } from '../models/product';
import { ProductsService } from './products.service';
import { of } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  products: Product[] = [];
  name: string = '';
  address: string = '';
  card: number = 0;
  cost: number = 0;

  constructor(private productService: ProductsService) {}

  addProductToCart(id: number, quantity: number) {
    if (quantity == 0) {
      this.products = this.products.filter((item) => item.id != id);
    } else {
      let index = -1;
      for (let i = 0; i < this.products.length; i++) {
        let item = this.products[i];
        if (item.id == id) {
          index = i;
          break;
        }
      }
      if (index == -1) {
        const product = this.productService.getProductById(id);
        index = this.products.length;
        this.products.push(product);
      }
      //the item with given id will always be present in the map
      this.products[index].quantity = quantity;
    }
    this.calculateTotalCost();
  }

  getCartItems() {
    return of(this.products);
  }
  getCost() {
    return of(this.cost);
  }

  getQuantityOfProduct(id: number): number {
    for (let i = 0; i < this.products.length; i++) {
      if (this.products[i].id == id) {
        return this.products[i].quantity;
      }
    }
    return 1;
  }

  calculateTotalCost() {
    this.cost = 0;
    for (let i = 0; i < this.products.length; i++) {
      this.cost += this.products[i].price * this.products[i].quantity;
    }
    this.cost = Math.round((this.cost + Number.EPSILON) * 100) / 100;
  }
}
