import { Routes } from '@angular/router';
import { CartComponent } from './components/cart/cart.component';
import { HomeComponent } from './components/home/home.component';
import { ProductDetailsComponent } from './components/product-details/product-details.component';

export const routes: Routes = [
    { path: '', redirectTo: 'home', pathMatch: 'full' }, // Default route
    { path: 'home', component: HomeComponent },
    { path: 'cart', component: CartComponent },
    { path: 'product/:id', component: ProductDetailsComponent },
    { path: '**', redirectTo: 'home' } 
  ];