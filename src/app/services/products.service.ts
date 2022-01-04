import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Product } from '../models/product';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ProductsService {
  products: Product[] = [];

  constructor(private httpClient: HttpClient) {
    this.readProducts().subscribe((data) => (this.products = data));
  }

  readProducts(): Observable<Product[]> {
    return this.httpClient.get('assets/data.json') as Observable<Product[]>;
  }

  getProductById(id: number): Product {
    // here all the ids are in order, so the following code is used. A better way would be to use a hashtable with id as key and
    // product as value inorder to return a product of given id.
    return this.products[id - 1];
  }
}
