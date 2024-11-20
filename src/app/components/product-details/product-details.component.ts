import { Component, OnInit } from '@angular/core';
import { Product } from '../../models/product';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { ProductService } from '../../services/product.service';
import { CartService } from '../../services/cart.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatTableModule } from '@angular/material/table';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatDialogModule } from '@angular/material/dialog';
import { MatNativeDateModule } from '@angular/material/core';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

@Component({
  selector: 'app-product-details',
  standalone: true,
  imports: [CommonModule, RouterModule, MatTableModule, MatInputModule, MatButtonModule, MatDatepickerModule, MatNativeDateModule, FormsModule, MatCheckboxModule, MatDialogModule,  MatProgressSpinnerModule],
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css']
})

export class ProductDetailsComponent implements OnInit {
  product!: Product;
  allProducts: Product[] = [];
  loadingProduct = true;
  loadingRelated = true;
  errorMessage = '';

  constructor(
    private route: ActivatedRoute,
    private productService: ProductService,
    private cartService: CartService
  ) {}

  ngOnInit(): void {
    this.loadProduct();
    this.loadRelatedProducts();
  }

  private loadProduct(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.productService.getProductById(id).subscribe({
        next: (product) => {
          this.product = product;
          this.loadingProduct = false;
        },
        error: () => {
          this.errorMessage = 'Error loading product details. Please try again later.';
          this.loadingProduct = false;
        }
      });
    }
  }

  private loadRelatedProducts(): void {
    this.productService.getAllProducts().subscribe({
      next: (products) => {
        this.allProducts = products.slice(1, 4);
        this.loadingRelated = false;
      },
      error: () => {
        this.errorMessage = 'Error loading related products. Please try again later.';
        this.loadingRelated = false;
      }
    });
  }

  addToCart(product: Product): void {
    if (!this.cartService.isInCart(product)) {
      this.cartService.addToCart(product);
    } else {
      alert('This product is already in your cart.');
    }
  }
}
