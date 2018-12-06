import { Order } from './../models/order';
import { AuthService } from './../auth.service';
import { Subscription } from 'rxjs';
import { ShoppingCart } from './../models/shopping-cart';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { ShoppingCartService } from '../shopping-cart.service';
import { OrderService } from '../order.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-check-out',
  templateUrl: './check-out.component.html',
  styleUrls: ['./check-out.component.css']
})
export class CheckOutComponent implements OnInit,OnDestroy{

  shipping = {}
  cart: ShoppingCart;
  cartSubscription: Subscription;
  userId: string;
  userSubscription: Subscription;

  constructor(
    private router: Router,
    private authService: AuthService,
    private orderService: OrderService,
    private shoppingCartService: ShoppingCartService) {

  }

  async ngOnInit() {
    let cart$ = await this.shoppingCartService.getCart();
    this.cartSubscription = cart$.subscribe(cart => this.cart = cart);
    this.userSubscription = this.authService.user$.subscribe(user => this.userId = user.uid);
  }

  async placeOrder(f) {
    let order = new Order(this.userId, f, this.cart);
    let result = await this.orderService.placeOrder(<Order>order.getData());
    this.router.navigate(['/order-success', result.id]);
  }

  ngOnDestroy() {
    if(this.cartSubscription) {
      this.cartSubscription.unsubscribe();
    }
    if(this.userSubscription) {
      this.userSubscription.unsubscribe();
    }
    
  }

}
