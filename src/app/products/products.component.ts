import { Item } from './../models/item';
import { ShoppingCart } from './../models/shopping-cart';
import { ShoppingCartService } from './../shopping-cart.service';
import { Product } from './../models/product';
import { ActivatedRoute } from '@angular/router';
import { ProductService } from 'src/app/product.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { map } from 'rxjs/operators'
import { Subscription, Observable } from 'rxjs';
import 'rxjs/add/operator/switchMap';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent {

  products: Product[] = [];
  filteredProducts: Product[] = [];
  cart$: Observable<ShoppingCart>;
  category: string;

  constructor(
    private productService: ProductService, 
    private shoppingCartService: ShoppingCartService,
    private route: ActivatedRoute
    ) { }

  async ngOnInit() {
    this.cart$ = await this.shoppingCartService.getCart();
    this.populateProducts();
  }

  private applyFilter() {
    this.filteredProducts = (this.category) ?
    this.products.filter(p =>  p.category === this.category) : 
    this.products;
  }
    
  private populateProducts() {
    this.productService.getAll()
    .snapshotChanges()
    .pipe(
      map(products => products.map(p => {
        const data = p.payload.doc.data() as Product;
        const id = p.payload.doc.id;
        return {
          id, 
          ...data
        }
      })))
    .switchMap(products => {
      this.products = products;
      return this.route.queryParamMap;
    })
    .subscribe(params => {
      this.category = params.get('category');
      this.applyFilter();
    }) 
  }
   
  // }

  // ngOnDestroy() {
  //   this.subscription.unsubscribe();
  // }

  
}
