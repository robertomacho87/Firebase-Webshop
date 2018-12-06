import { Product } from './../../models/product';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { ProductService } from 'src/app/product.service';
import { map } from 'rxjs/operators'
import { Subscription } from 'rxjs';


@Component({
  selector: 'app-admin-products',
  templateUrl: './admin-products.component.html',
  styleUrls: ['./admin-products.component.css']
})
export class AdminProductsComponent implements OnInit, OnDestroy {

  products: Product[]
  
  subscription: Subscription;
  filteredProducts: Product[];
  itemCount: number;

  constructor(private productService: ProductService) { 
    this.subscription = this.productService.getAll()
    .snapshotChanges().pipe(
      map(products => products.map(p => {
        const data = p.payload.doc.data() as Product;
        const id = p.payload.doc.id;
        return {
          id, 
          ...data
        }
      }))
    ).subscribe(products => { 
      this.filteredProducts = this.products = products; 
      console.log("PRODUCTS",products);
      this.itemCount = this.products.length;
    });
    
  }

  
  log(x) {
    console.log(x);

  }

  filter(query: string) {
    console.log("Query: ", query);
    this.filteredProducts = (query) ?
      this.products.filter(p => p.title.toLowerCase().includes(query.toLowerCase())) :
      this.products;
  }

  ngOnInit() {
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

}
