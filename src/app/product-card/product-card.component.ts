import { ShoppingCart } from './../models/shopping-cart';
import { ShoppingCartService } from './../shopping-cart.service';
import { Product } from './../models/product';
import { Component, OnInit, Input } from '@angular/core';
import { Item } from '../models/item';

@Component({
  selector: 'product-card',
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.css']
})
export class ProductCardComponent {

  @Input('product') product: Product;
  @Input('show-actions') showActions = true;
  @Input('shopping-cart') shoppingCart: ShoppingCart;
  quantity: number;

  constructor(private cartService: ShoppingCartService) { 
   
  }


  addToCart() {
    this.cartService.addToCart(this.product);
  }

  isSame(item: Item) {
     return(item.product === this.product);
  }

  
    
    
    
    // if(!this.shoppingCart) return 0;
    // this.filteredProducts = this.shoppingCart.filter(i => {
    //   i.product.id === this.product.id;
    // })
    // console.log("BAD",this.filteredProducts);
    // 
    // console.log("Hier",this.shoppingCart)
    // console.log(test);
    // let item;
    // this.shoppingCart.includes(item)
    // 
    // this.shoppingCart
    // return item ? item.quantity : 0;
  }


