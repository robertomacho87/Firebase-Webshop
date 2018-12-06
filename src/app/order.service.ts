import { ShoppingCartService } from './shopping-cart.service';
import { Order } from './models/order';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  private ordersCollection: AngularFirestoreCollection<Order>;

  constructor(private db: AngularFirestore, private shoppingCartService: ShoppingCartService) {
    this.ordersCollection = db.collection<Order>('orders');
   }

  async placeOrder(order: Order) {
    let result = await this.ordersCollection.add(order);
    this.shoppingCartService.clearCart();
    return result;
  }

  getAll(): AngularFirestoreCollection<Order> {
    return this.ordersCollection;
  }

  get(orderId) {
    this.db.doc('/orders/' + orderId).valueChanges().subscribe(u => console.log(u));
  }



}
