import { Product } from './product';


export class Item 

{
    
    constructor(public product: Product, public quantity: number) {

    }

    get totalPrice() { 
        return this.product.price * this.quantity;
    }
}