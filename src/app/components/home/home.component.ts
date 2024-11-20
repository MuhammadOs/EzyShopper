import { Component, inject, OnInit } from '@angular/core';
import { Product } from '../../models/product';
import { ProductService } from '../../services/product.service';
import { RouterModule } from '@angular/router';
import { CommonModule, NgFor } from '@angular/common';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [RouterModule, CommonModule, NgFor],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit {
  featuredProducts: Product[] = [];
  allProducts: Product[] = [];
  selectedProduct: Product | null = null;
  categories: string[] = [];
  productsByCategory: Product[] = [];
  loadingFeatured = true;
  loadingAll = true;
  loadingCategories = true;
  loadingProductsByCategory = true;

  private productService = inject(ProductService);

  ngOnInit(): void {
    // Get all products
    this.productService.getAllProducts().subscribe(products => {
      this.allProducts = products;
      this.loadingAll = false;
    });

    // Get product by ID (Example: Fetching product with ID '1')
    this.productService.getProductById('1').subscribe(product => {
      this.selectedProduct = product;
    });

    // Get all categories
    this.productService.getAllCategories().subscribe(categories => {
      this.categories = categories;
      this.loadingCategories = false;
    });

    // Get products by category name (Example: Fetching products in 'electronics' category)
    this.productService.getProductsByCategoryName('electronics').subscribe(products => {
      this.productsByCategory = products;
      this.loadingProductsByCategory = false;
    });
  }
}
