import { Component, Input } from '@angular/core';
import { CartService } from '../../services/cart.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MatFormField, MatFormFieldModule, MatLabel } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  imports: [FormsModule, CommonModule, MatIconModule, MatFormFieldModule, MatInputModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent {
  @Input() name: string = '';
  @Input() price: number = 0;
  @Input() description: string = '';
  @Input() image: string = '';
  @Input() showQuantity: boolean = false;

  quantity: number = 1;
  notificationCount: number = 1;
  // Sample data for Popular Items


  popularItems = [
    { id: 1, name: 'Cheese Burger', price: 343, image: 'assets/images/cheese-burger.jpg' },
    { id: 2, name: 'Chicken Burger', price: 389, image: 'assets/images/chicken-burger.jpg' },
    {
      id: 8,
      name: 'Hamburger',
      price: 321,
      image: 'assets/images/chicken.jpg',
      description: 'A simple yet delicious beef patty served in a toasted bun with fresh lettuce, onions, and pickles.'
    },
    {
      id: 7,
      name: 'Lamb Burger',
      price: 450,
      image: 'assets/images/burger.jpg',
      description: 'A juicy lamb patty infused with Mediterranean spices, topped with feta cheese and tzatziki sauce.'
    },
    {
      id: 4,
      name: 'Veggie Burger',
      price: 300,
      image: 'assets/images/chicken.jpg',
      description: 'A healthy plant-based patty made from fresh vegetables, served with crispy lettuce, tomatoes, and vegan mayo.'
    },
    {
      id: 5,
      name: 'Beef Burger',
      price: 399,
      image: 'assets/images/cheese-burger.jpg',
      description: 'A thick, grilled beef patty seasoned to perfection, topped with cheese, lettuce, and a smoky barbecue sauce.'
    },
  ];

  // Sample data for Special Offers
  specialOffers = [
    { id: 3, name: 'Cheese Burger', price: 299, image: 'assets/images/burger.jpg' },
    { id: 4, name: 'Chicken Burger', price: 321, image: 'assets/images/chicken.jpg' },
    {
      id: 8,
      name: 'Hamburger',
      price: 300,
      image: 'assets/images/chicken.jpg',
      description: 'A simple yet delicious beef patty served in a toasted bun with fresh lettuce, onions, and pickles.'
    },
  ];

  newArrivals = [
    {
      id: 3,
      name: 'Teriyaki Burger',
      price: 455,
      image: 'assets/images/burger.jpg',
      description: 'A savory beef patty glazed with rich teriyaki sauce, topped with grilled onions and lettuce, delivering an authentic Japanese flavor.'
    },
    {
      id: 6,
      name: 'Turkey Burger',
      price: 480,
      image: 'assets/images/chicken-burger.jpg',
      description: 'A lean and flavorful turkey patty served with fresh veggies and tangy mustard on a whole-grain bun.'
    }
  ]

  
  searchQuery: string = '';
  constructor(private cartService: CartService, private router: Router) { }

  toggleMenu() {
    console.log("Menu clicked");
  }

  addToCart(): void {
    this.cartService.addToCart({ name: this.name, price: this.price },this.image,this.quantity);
  }

  originalPopularItems = [...this.popularItems];
  originalSpecialOffers = [...this.specialOffers];
  originalNewArrivals = [...this.newArrivals];

  onSearchChange() {
    if (!this.searchQuery) {
      // Reset to original lists when search is cleared
      this.popularItems = [...this.originalPopularItems];
      this.specialOffers = [...this.originalSpecialOffers];
      this.newArrivals = [...this.originalNewArrivals];
    } else {
      const filteredItems = this.getFilteredItems();
      this.popularItems = filteredItems.popular;
      this.specialOffers = filteredItems.special;
      this.newArrivals = filteredItems.newArrivals;
    }
  }

  getFilteredItems() {
    const query = this.searchQuery.toLowerCase();
    return {
      popular: this.originalPopularItems.filter(item => item.name.toLowerCase().includes(query)),
      special: this.originalSpecialOffers.filter(item => item.name.toLowerCase().includes(query)),
      newArrivals: this.originalNewArrivals.filter(item => item.name.toLowerCase().includes(query))
    };
  }

  viewProduct(item: any) {
    this.cartService.addToCart(item,item.image)
    this.router.navigate(['/product', item?.id]);
  }


}
