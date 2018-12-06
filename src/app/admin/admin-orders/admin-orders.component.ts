import { UserService } from './../../user.service';
import { OrderService } from './../../order.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription} from 'rxjs';
import { Order } from 'src/app/models/order';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-admin-orders',
  templateUrl: './admin-orders.component.html',
  styleUrls: ['./admin-orders.component.css']
})
export class AdminOrdersComponent implements OnInit,OnDestroy {

  orders: any[];
  subscription: Subscription;
  filteredOrders: any[];
  itemCount: number;
  user$;

  constructor(private orderService: OrderService, private userService: UserService) { 
    
    this.subscription = this.orderService.getAll()
    .snapshotChanges().pipe(
      map(orders => orders.map(o => {
        const data = o.payload.doc.data() as Order;
        const id = o.payload.doc.id;
        return {
          id, 
          ...data
        }
      }))
    ).subscribe(orders => {
      this.filteredOrders = this.orders = orders; 
      this.itemCount = this.orders.length;
      this.filter();
    });
    
   }

   async getUser(userId) {
    this.user$ = await this.userService.get(userId);
    
   }

  ngOnInit() {
  }

  filter() {
    this.filteredOrders.filter(o => { this.getUser(o.userId) })
    // console.log("Query: ", query);
    // this.filteredOrders = (query) ?
    //   this.orders.filter(p => {console.log(p.shipping.name); p.shipping.name.toLowerCase().includes(query.toLowerCase())}) :
    //   this.orders;
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

}
