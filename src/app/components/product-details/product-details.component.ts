import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CartService } from '../../services/cart.service';

@Component({
  selector: 'app-product-details',
  imports: [CommonModule],
  templateUrl: './product-details.component.html',
  styleUrl: './product-details.component.scss'
})
export class ProductDetailsComponent {
  product: any = {};
  relatedProducts: any[] = [];
  quantity: number = 1;

  constructor(private route: ActivatedRoute, private router: Router, private cartService: CartService) {}
  productList = [
    { 
      id: 1, 
      name: 'Cheese Burger', 
      price: 389, 
      image: 'assets/images/cheese-burger.jpg',
      description: 'A classic beef patty topped with melted cheese, fresh lettuce, tomatoes, and creamy mayo, served in a toasted bun.'
    },
    { 
      id: 2, 
      name: 'Chicken Burger', 
      price: 389, 
      image: 'assets/images/chicken-burger.jpg',
      description: 'A juicy, crispy chicken fillet layered with lettuce, tomatoes, and special sauce, served in a soft bun.'
    },
    { 
      id: 3, 
      name: 'Teriyaki Burger', 
      price: 389, 
      image: 'assets/images/burger.jpg',
      description: 'A savory beef patty glazed with rich teriyaki sauce, topped with grilled onions and lettuce, delivering an authentic Japanese flavor.'
    },
    { 
      id: 4, 
      name: 'Veggie Burger', 
      price: 389, 
      image: 'assets/images/chicken.jpg',
      description: 'A healthy plant-based patty made from fresh vegetables, served with crispy lettuce, tomatoes, and vegan mayo.'
    },
    { 
      id: 5, 
      name: 'Beef Burger', 
      price: 389, 
      image: 'assets/images/cheese-burger.jpg',
      description: 'A thick, grilled beef patty seasoned to perfection, topped with cheese, lettuce, and a smoky barbecue sauce.'
    },
    { 
      id: 6, 
      name: 'Turkey Burger', 
      price: 389, 
      image: 'assets/images/chicken-burger.jpg',
      description: 'A lean and flavorful turkey patty served with fresh veggies and tangy mustard on a whole-grain bun.'
    },
    { 
      id: 7, 
      name: 'Lamb Burger', 
      price: 389, 
      image: 'assets/images/burger.jpg',
      description: 'A juicy lamb patty infused with Mediterranean spices, topped with feta cheese and tzatziki sauce.'
    },
    { 
      id: 8, 
      name: 'Hamburger', 
      price: 389, 
      image: 'assets/images/chicken.jpg',
      description: 'A simple yet delicious beef patty served in a toasted bun with fresh lettuce, onions, and pickles.'
    }
  ];
  

  ngOnInit() {
    const productId = Number(this.route.snapshot.paramMap.get('id'));
    this.loadProductDetails(productId);
  }

  loadProductDetails(productId: number) {
    // Replace with actual API call or data retrieval logic
    this.product = this.productList.find(item => item.id === productId);

    this.relatedProducts = [
      {
        id: 7,
        name: 'Lamb Burger',
        price: 389,
        image: 'assets/images/burger.jpg',
        description: 'A juicy lamb patty infused with Mediterranean spices, topped with feta cheese and tzatziki sauce.'
      },
      {
        id: 4,
        name: 'Veggie Burger',
        price: 389,
        image: 'assets/images/chicken.jpg',
        description: 'A healthy plant-based patty made from fresh vegetables, served with crispy lettuce, tomatoes, and vegan mayo.'
      }
    ];
  }

  goBack() {
    this.router.navigate(['/home']);
  }

  increaseQuantity() {
    this.quantity++;
    this.cartService.updateQuantity(this.product.name, this.quantity);
  }

  decreaseQuantity() {
    if (this.quantity > 1) {
      this.quantity--;
      this.cartService.updateQuantity(this.product.name, this.quantity);
    }
  }
}
