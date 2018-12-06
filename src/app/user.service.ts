import { AppUser } from './models/app-user';
import { Observable } from 'rxjs/Observable';
import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import * as firebase from 'firebase'

@Injectable({
  providedIn: 'root'
})
export class UserService {


  private usersCollection: AngularFirestoreCollection <firebase.User>;
  private users: Observable<firebase.User[]>;

  constructor(private afs: AngularFirestore) {
    this.usersCollection = afs.collection<firebase.User>('users');
    this.users = this.usersCollection.valueChanges();
  }

  save(user: firebase.User) {
    try {
      this.afs.doc<AppUser>('users/' + user.uid).update({
        name: user.displayName,
        email: user.email,
      })
    }
    catch {
      this.afs.doc<AppUser>('users/' + user.uid).set({
        name: user.displayName,
        email: user.email,
        isAdmin: false
      })
    }
    
  }

  get(uid: string): Observable<AppUser> {
    return this.afs.doc<AppUser>('users/' + uid).valueChanges();
  }

  // add(user: firebase.User) {
  //   this.afs.collection('users').add({
  //     name: user.displayName,
  //     email: user.email
  //   })
  // }
  
    
  
  
}
