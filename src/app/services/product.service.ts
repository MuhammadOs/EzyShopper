import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Product } from '../models/product';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private apiUrl = 'https://fakestoreapi.com/products';

  constructor(private http: HttpClient) {}

  getAllProducts(): Observable<Product[]> {
    return this.http.get<Product[]>(this.apiUrl);
  }

  getProductById(id: string): Observable<Product> {
    return this.http.get<Product>(`${this.apiUrl}/${id}`);
  }

  getAllCategories(): Observable<any>{
    return this.http.get<String[]>(`${this.apiUrl}/categories`)
  }

  getProductsByCategoryName(categoryName: String): Observable<Product[]> {
    return this.http.get<Product[]>(`${this.apiUrl}/category/${categoryName}`);
  }
}
