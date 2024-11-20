import { Component, OnInit } from '@angular/core';
import { CartService } from '../../services/cart.service';
import { CommonModule } from '@angular/common';
import { CartItem } from "../../models/cart"
@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.css'
})
export class CartComponent implements OnInit {
  cartItems : CartItem[] = [];
  total = 0;

  constructor(private cartService: CartService) {}

  ngOnInit(): void {
    this.cartItems = this.cartService.getCartItems();
    this.calculateTotal();
  }

  calculateTotal() {
    this.total = this.cartItems.reduce((sum, item) => sum + item.product.price * item.quantity, 0);
  }

  removeFromCart(item: CartItem) {
    this.cartService.removeFromCart(item);
    this.calculateTotal();
  }
}