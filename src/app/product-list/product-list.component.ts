import { Component, OnInit } from '@angular/core';
import { Product } from '../models/product';
import { ProductsService } from '../services/products.service';
import { CartService } from '../services/cart.service';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css'],
})
export class ProductListComponent implements OnInit {
  productlist: Product[] = [];

  constructor(
    private productService: ProductsService,
    private cartService: CartService
  ) {}

  ngOnInit(): void {
    this.productService
      .readProducts()
      .subscribe((data) => (this.productlist = data));
  }

  addToCart(product: Product) {
    this.cartService.addProductToCart(product.id, product.quantity);
    alert('item added to cart');
  }
}
