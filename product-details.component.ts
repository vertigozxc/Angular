import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductService } from './product.service';

@Component({
  selector: 'app-product-details',
  template: `
    <h2>{{ product.name }}</h2>
    <p>{{ product.description }}</p>
    <p>Price: {{ product.price }}</p>
    <button (click)="addToCart()">Add to Cart</button>
  `
})
export class ProductDetailsComponent implements OnInit {
  product: Product;

  constructor(private route: ActivatedRoute, private productService: ProductService) {}

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    this.productService.getProductById(id).subscribe((product) => {
      this.product = product;
    });
  }

  addToCart() {
    // Implement cart logic here
  }
}

@Component({
  selector: 'app-product-list',
  template: `
    <h2>Product List</h2>
    <ul>
      <li *ngFor="let product of products">
        <a [routerLink]="['/products', product.id]">{{ product.name }}</a>
      </li>
    </ul>
  `
})
export class ProductListComponent implements OnInit {
  products: Product[];

  constructor(private productService: ProductService) {}

  ngOnInit() {
    this.productService.getProducts().subscribe((products) => {
      this.products = products;
    });
  }
}

interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
}

class ProductService {
  private apiBaseUrl = 'https://api.example.com/products';

  constructor(private http: HttpClient) {}

  getProducts() {
    return this.http.get<Product[]>(this.apiBaseUrl);
  }

  getProductById(id: string) {
    const url = `${this.apiBaseUrl}/${id}`;
    return this.http.get<Product>(url);
  }
}
