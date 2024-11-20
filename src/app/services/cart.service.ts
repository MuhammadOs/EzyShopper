import { Product } from './../models/product';
import { Injectable } from '@angular/core';

interface CartItem {
  product: Product;
  quantity: number;
}

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private cartItems: CartItem[] = []; // Explicitly define the type here

  addToCart(product: Product) {
    const existingItem = this.cartItems.find(item => item.product.id === product.id);
    if (existingItem) {
      existingItem.quantity++;
    } else {
      this.cartItems.push({ product, quantity: 1 });
    }
  }

  getCartItems(): CartItem[] { // Specify return type
    return this.cartItems;
  }

  removeFromCart(item: CartItem) {
    this.cartItems = this.cartItems.filter(cartItem => cartItem.product.id !== item.product.id);
  }

  clearCart() {
    this.cartItems = [];
  }

  isInCart(product: Product): Boolean{
    return true;
  }
}
