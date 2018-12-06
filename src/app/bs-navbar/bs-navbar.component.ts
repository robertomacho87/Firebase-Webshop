import { Item } from './../models/item';
import { AppUser } from './../models/app-user';
import { AuthService } from './../auth.service';
import { Component, OnInit } from '@angular/core';
import { ShoppingCartService } from '../shopping-cart.service';
import { Observable } from 'rxjs';
import { ShoppingCart } from '../models/shopping-cart';


@Component({
  selector: 'bs-navbar',
  templateUrl: './bs-navbar.component.html',
  styleUrls: ['./bs-navbar.component.css']
})
export class BsNavbarComponent implements OnInit {

  appUser: AppUser;
  shoppingCartItemCount: number;
  cart$: Observable<ShoppingCart>
  item$: Observable<Item[]>

  constructor(private auth: AuthService, private shoppingCartService: ShoppingCartService) { 
    
    
  }

  logout() {
    this.auth.logout();
  }

  async ngOnInit() {
    this.auth.appUser$.subscribe(appUser => this.appUser = appUser);

    this.cart$ = await this.shoppingCartService.getCart();
    // item$.subscribe(item => {
    //   this.shoppingCartItemCount = 0;
    //   for(let productId in item) 
    //     this.shoppingCartItemCount += item[productId].quantity;
    // })
  }


}
