import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

export interface CartItem {
  name: string;
  price: number;
  quantity: number;
  image: string;
}

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private cartItems: CartItem[] = [];
  private cartSubject = new BehaviorSubject<CartItem[]>([]);
  cart$ = this.cartSubject.asObservable();

  addToCart(item: { name: string; price: number }, image:string, quantity: number = 1): void {
    const existingItem = this.cartItems.find(i => i.name === item.name);

    if (existingItem) {
      existingItem.quantity += quantity;
    } else {
      this.cartItems.push({ ...item, image,quantity });
    }

    this.cartSubject.next([...this.cartItems]);
  }

  updateQuantity(itemName: string, newQuantity: number): void {
    const item = this.cartItems.find(i => i.name === itemName);
    if (item) {
      item.quantity = newQuantity;
      this.cartSubject.next([...this.cartItems]);
    }
  }

  removeItem(itemName: string): void {
    this.cartItems = this.cartItems.filter(i => i.name !== itemName);
    this.cartSubject.next([...this.cartItems]);
  }

  getTotal(): number {
    return this.cartItems.reduce((total, item) => total + (item.price * item.quantity), 0);
  }

  clearCart(): void {
    this.cartItems = [];
    this.cartSubject.next([]);
  }

  getCartItems(): CartItem[] {
    return [...this.cartItems];
  }
}