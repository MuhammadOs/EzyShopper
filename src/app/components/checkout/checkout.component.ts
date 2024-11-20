import { Component } from '@angular/core';
import { CartService } from '../../services/cart.service';
import { CommonModule } from '@angular/common';
import { FormsModule, NgForm } from '@angular/forms';

@Component({
  selector: 'app-checkout',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './checkout.component.html',
  styleUrl: './checkout.component.css'
})
export class CheckoutComponent {
  order = {
    name: '',
    address: '',
    paymentMethod: ''
  };

  constructor(private cartService: CartService) {}

  onSubmit(form: NgForm) {
    if (form.valid) {
      // Handle order submission logic here
      console.log('Order placed:', this.order);
      this.cartService.clearCart(); // Clear cart after order
    }
  }
}