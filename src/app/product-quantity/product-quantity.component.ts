import { Item } from './../models/item';
import { ShoppingCart } from './../models/shopping-cart';
import { Component, Input } from '@angular/core';
import { ShoppingCartService } from '../shopping-cart.service';
import { Product } from '../models/product';

@Component({
  selector: 'product-quantity',
  templateUrl: './product-quantity.component.html',
  styleUrls: ['./product-quantity.component.css']
})
export class ProductQuantityComponent {

  @Input('product') product: Product ;
  @Input('shopping-cart') shoppingCart: ShoppingCart
  quantity: number;

  constructor(private cartService: ShoppingCartService ) { 
    
    
  }
  removeFromCart() {
    this.cartService.removeFromCart(this.product);
  }

  addToCart() {
    this.cartService.addToCart(this.product);
  }

  isSame(item: Item) {
     return(item.product === this.product);
  }

  getQuantity() {
    if(!this.shoppingCart) return 0;
    this.shoppingCart.getQuantity(this.product);
   
    // this.shoppingCart.items.map(s => {
    //   if(s.product.id === this.product.id)
    //   this.quantity = s.quantity;
    // })
    // return this.quantity;
  }
}
