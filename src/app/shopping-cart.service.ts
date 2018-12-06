import { AngularFirestore } from '@angular/fire/firestore';
import { Injectable } from '@angular/core';
import { Product } from './models/product';
import 'rxjs/add/operator/take';
import { ShoppingCart } from './models/shopping-cart';
import { map } from 'rxjs/operators'
import { Item } from './models/item';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class ShoppingCartService {

  constructor(private db: AngularFirestore) { }

  async removeFromCart(product: Product) {
    this.updateItemQuantity(product, -1)
   }
 
   async addToCart(product: Product) {
     this.updateItemQuantity(product, 1);
   }



   async clearCart() {
    
    let cartId = await this.getOrCreateCartId()
    let items$ = await this.getItems(cartId);
    items$.take(1).subscribe(items => items.map(item => this.deleteItem(cartId,item.product.id)));
   }

  async getCart(): Promise<Observable<ShoppingCart>> {
    let cartId = await this.getOrCreateCartId()
    let shop = this.db.doc('/shopping-carts/'+ cartId);
    return shop.collection<Item>('items').valueChanges()
      .map(x => new ShoppingCart(x));
  }

  private create() {
    console.log("creating");
    return this.db.collection('/shopping-carts').add({
      dateCreated: new Date().getTime()
    })
  }

  private async getOrCreateCartId(): Promise<string> {
    let cartId = localStorage.getItem('cartId');
    console.log("ID: ", cartId);
    if(cartId) return cartId;

    let result = await this.create();
    localStorage.setItem('cartId', result.id);
    return result.id;
  }

  private getItems(cartId: string): Observable<Item[]> {
    return this.db.collection<Item>('/shopping-carts/' + cartId + '/items').valueChanges();
  }

  private getItem(cartId: string, productId: string): Observable<Item>{
    return this.db.doc<Item>('/shopping-carts/' + cartId + '/items/' + productId).valueChanges();
  }

  private deleteItem(cartId: string, productId: string) {
    this.db.doc('/shopping-carts/' + cartId + '/items/' + productId).delete();
  }

  private async updateItemQuantity(product: Product, change: number) {
    let cartId = await this.getOrCreateCartId()
    let item$ = this.getItem(cartId,product.id);
    item$.take(1).subscribe(item => {
      
      let quantity = (!item ? 0  :  item.quantity) + change;
      
      if(quantity === 0) this.deleteItem(cartId,product.id);
      // if(item.quantity === 0 && change === -1) { return }
      else
      try {
        this.db.doc('/shopping-carts/' + cartId + '/items/' + product.id).update({
          product: product, quantity: item.quantity + change
        })
      }
      catch {
        this.db.doc('/shopping-carts/' + cartId + '/items/' + product.id).set({
          product: product, quantity:  1
        })
      }
    })
  }

}
