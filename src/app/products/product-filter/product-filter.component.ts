import { CategoryService } from './../../category.service';
import { Category } from './../../models/category';
import { Component, OnInit, Input } from '@angular/core';
import { map } from 'rxjs/operators'

@Component({
  selector: 'product-filter',
  templateUrl: './product-filter.component.html',
  styleUrls: ['./product-filter.component.css']
})
export class ProductFilterComponent implements OnInit {
  categories$;
  @Input('category') category;
  
  constructor(categoryService:CategoryService) {
    this.categories$ = categoryService.getAll()
    .snapshotChanges().pipe(
      map(categories => categories.map(c => {
        const data = c.payload.doc.data() as Category;
        const id = c.payload.doc.id;
        return {
          id, 
          ...data
        }
      })))
   }

  ngOnInit() {
    
  }

  

}
