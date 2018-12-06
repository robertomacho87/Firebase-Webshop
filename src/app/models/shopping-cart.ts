import { Product } from './product';
import { Item } from "./item";

export class ShoppingCart

{
    items: Item[] = [];

    constructor(private itemsMap: Item[]) {
        for (let productId in itemsMap) {
            let item = itemsMap[productId]
            this.items.push(new Item(item.product, item.quantity));
        }
    }

    getQuantity(product: Product) {
        let quantity;
        this.itemsMap.map(s => {
          if(s.product.id === product.id)
          quantity = s.quantity;
        })
        return quantity;
    }

    get totalItemsCount() {
    let count = 0;
      for(let productId in this.itemsMap) 
       count += this.itemsMap[productId].quantity;
    return count;
    }

    get totalPrice() {
        let sum = 0;
        for (let productId in this.items)
            sum += this.items[productId].totalPrice;
        return sum;
    }
    
}

