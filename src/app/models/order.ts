import { ShoppingCart } from './shopping-cart';
import { getLocaleDateFormat } from '@angular/common';
import { _getViewData } from '@angular/core/src/render3/instructions';

export class Order {
    datePlaced: number;
    items: any[]

    constructor(public userId: string, public shipping: any, shoppingCart: ShoppingCart) {
        this.datePlaced = new Date().getTime();

        this.items = shoppingCart.items.map(i => {
            return {
              product: {
                title: i.product.title,
                imageUrl: i.product.imageUrl,
                price: i.product.price
              },
              quantity: i.quantity,
              totalPrice: i.totalPrice
            }
          })
          
    }
    getData(): Object {
        const result = {}
        Object.keys(this).map(key => result[key] = this[key]);
        return result;
    }
}