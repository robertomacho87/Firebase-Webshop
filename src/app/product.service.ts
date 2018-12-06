import { AngularFirestore } from '@angular/fire/firestore';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private db: AngularFirestore) { }

  create(product) {
    return this.db.collection('/products').add(product);
  }

  getAll() {
    return this.db.collection('/products');
  }

  get(productId) {
    return this.db.doc('/products/' + productId).valueChanges()
  }

  update(productId, product) {
    return this.db.doc('/products/' + productId).update(product);
  }

  delete(productId) {
    return this.db.doc('/products/' + productId).delete()
  }
}
