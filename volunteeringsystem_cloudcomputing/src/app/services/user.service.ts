import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from 'angularfire2/firestore';
import { User } from '../Models/user';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private userCollection: AngularFirestoreCollection<User>;


  constructor(private db: AngularFirestore) {
    this.userCollection = db.collection<User>('users');
  }

  createUser(user: User) {
    return this.userCollection.doc(user.userId).set({
      firstName: user.firstName,
      lastName: user.lastName,
      address: user.address,
      zip: user.zip,
      email: user.email,
      phone: user.phone
    });
  } 
   async getUser(userId) {
    let user = await this.userCollection.doc(userId).ref.get().then((snapShot) => {return snapShot.data();});
    return user;
    
  } 
}
