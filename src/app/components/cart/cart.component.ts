import { Component } from '@angular/core';
import { CartItem, CartService } from '../../services/cart.service';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.scss'
})
export class CartComponent {
  cartItems: CartItem[] = [];
  subtotal: number = 0;
  discount: number = 0; // Dynamic discount
  total: number = 0;

  constructor(private cartService: CartService, private router: Router) {}

  ngOnInit(): void {
    this.cartService.cart$.subscribe(items => {
      this.cartItems = items;
      this.calculateTotals();
    });
  }

  increaseQuantity(item: CartItem): void {
    this.cartService.updateQuantity(item.name, item.quantity + 1);
  }

  decreaseQuantity(item: CartItem): void {
    if (item.quantity > 1) {
      this.cartService.updateQuantity(item.name, item.quantity - 1);
    }
  }

  removeItem(item: CartItem): void {
    this.cartService.removeItem(item.name);
  }

  calculateTotals(): void {
    this.subtotal = this.cartService.getTotal();

    // **Discount Logic:**
    if (this.subtotal >= 2000) {
      this.discount = this.subtotal * 0.10; // 10% discount for orders above 2000
    } else if (this.subtotal >= 1000) {
      this.discount = this.subtotal * 0.05; // 5% discount for orders above 1000
    } else {
      this.discount = 0; // No discount for orders below 1000
    }

    this.total = this.subtotal - this.discount;
  }

  checkout(): void {
    alert(`Order placed successfully! Total: ৳${this.total.toFixed(2)}`);
    this.cartItems.forEach(item => {
      console.log(`Item: ${item.name}, Quantity: ${item.quantity}`);
    });
  
    console.log("Subtotal:", this.subtotal);
    console.log("Discount:", this.discount);
    console.log("Total:", this.total);
    this.cartService.clearCart();
  }

  goBack(): void {
    this.router.navigate(['/home']);
  }
}
