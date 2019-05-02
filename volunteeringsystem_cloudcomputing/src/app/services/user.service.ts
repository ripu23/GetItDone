import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from 'angularfire2/firestore';
import { User } from '../Models/user';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private userCollection: AngularFirestoreCollection<User>;
  private userId: string;


  constructor(private db: AngularFirestore,
              private auth: AuthService) {
    this.userCollection = db.collection<User>('users');
    this.userId = this.auth.getUserId();
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
    return await this.userCollection.doc(userId).ref.get().then((snapShot) => snapShot.data());
  }

  updateUser(user: User) {
    return this.userCollection.doc(this.userId).update(user);
  }

}
