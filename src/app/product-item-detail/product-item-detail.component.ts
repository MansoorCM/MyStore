import { Component, OnInit } from '@angular/core';
import { Product } from '../models/product';
import { ActivatedRoute } from '@angular/router';
import { ProductsService } from '../services/products.service';
import { CartService } from '../services/cart.service';

@Component({
  selector: 'app-product-item-detail',
  templateUrl: './product-item-detail.component.html',
  styleUrls: ['./product-item-detail.component.css']
})
export class ProductItemDetailComponent implements OnInit {

  item: Product = {id:1, name: '', price: 1, description: '', url:'', quantity: 1}
  quantities = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
  id: number = 1

  constructor( private route: ActivatedRoute, private productService: ProductsService, private cartService: CartService) { 
  }
  
  ngOnInit(): void {
    this.id = this.route.snapshot.params?.['id']
    this.item = this.productService.getProductById(this.id)
    this.item.quantity = this.cartService.getQuantityOfProduct(this.id)
  }

  selectQuantity(event: EventTarget | null){
    if(event != null){
      this.item.quantity = (event as HTMLInputElement).value as unknown as number
    }
  }
  
  addToCart(){
    this.cartService.addProductToCart(this.id, this.item.quantity)
    alert('item added to cart');
  }

}
