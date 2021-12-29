import { Injectable } from '@angular/core';
import { Product } from '../models/product';
import { ProductsService } from './products.service';
import { of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  products: Product[] = []

  constructor(private productService: ProductsService) { }

  addProductToCart(id: number, quantity: number){
    let index = -1
    for (let i = 0; i < this.products.length; i++){
      let item = this.products[i]
      if (item.id == id){
        index = i
        break
      }
    }
    if ( index == -1 ){
      const product = this.productService.getProductById(id)
      index = this.products.length
      this.products.push(product)
    }
    //the item with given id will always be present in the map
    this.products[index].quantity = quantity
  }

  getCartItems(){
    return of(this.products)
  }
}
