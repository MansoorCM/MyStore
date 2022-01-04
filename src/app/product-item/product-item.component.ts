import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Product } from '../models/product';
import { CartService } from '../services/cart.service';

@Component({
  selector: 'app-product-item',
  templateUrl: './product-item.component.html',
  styleUrls: ['./product-item.component.css'],
})
export class ProductItemComponent implements OnInit {
  @Input() product: Product;
  quantities = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
  @Output() addedItem: EventEmitter<Product> = new EventEmitter();

  constructor(private cartService: CartService) {
    this.product = {
      id: 1,
      name: '',
      price: 1,
      url: '',
      description: '',
      quantity: 1,
    };
  }

  ngOnInit(): void {
    this.product.quantity = this.cartService.getQuantityOfProduct(
      this.product.id
    );
  }

  selectQuantity(event: EventTarget | null) {
    if (event != null) {
      this.product.quantity = (event as HTMLInputElement)
        .value as unknown as number;
    }
  }

  addToCart() {
    this.addedItem.emit(this.product);
  }
}
