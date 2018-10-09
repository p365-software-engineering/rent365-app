import { Injectable } from '@angular/core';
import { IUser, IUserData } from '../../models/user_model';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { AngularFireAuth } from '@angular/fire/auth';
import { Router } from '@angular/router';
import { auth } from 'firebase/app';
import { first, switchMap} from 'rxjs/operators';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';
@Injectable({
  providedIn: 'root'
})

export class AuthXService {

  public currentUserState: Observable<firebase.User>;
  public _currentUser: firebase.User;
  public userRegister: Observable<String>;

  constructor(private http: HttpClient, private firebaseAuth: AngularFireAuth,
    private router: Router,
    private afs: AngularFirestore) {
      this._currentUser = null;
      this.currentUserState = firebaseAuth.authState;
      this.currentUserState.subscribe((user: firebase.User) => {
        this._currentUser = user;
        // console.log('authState$ changed', this._currentUser);
      });
   }

   get authenticated(): boolean {
    return this._currentUser !== null;
  }
  get currentUserObservable(): any {
    return this.firebaseAuth.authState.pipe(first());
  }

  public updateUserData(user: any) {
    const userRef: AngularFirestoreDocument<IUserData> = this.afs.doc('User/' + user.uid);
    const data: IUserData = {
      uid: user.uid,
      email: user.email,
      first_name: user.displayName || user.first_name,
      last_name: user.displayName || user.last_name,
      middle_name: user.displayName || user.middle_name || 'na',
      password: 'na',
      role: user.role || 'client'
    };
    userRef.set(data);
  }

  public register(formData: IUserData): any {
    return this.firebaseAuth.auth.createUserWithEmailAndPassword(formData.email.toString(), formData.password.toString())
    .then((user) => {
      if (user && user.user.emailVerified === false) {
        user.user.sendEmailVerification();
          const data: IUserData = {
            uid: user.user.uid,
            email: user.user.email,
            first_name: formData.first_name,
            last_name: formData.last_name,
            middle_name: formData.last_name || 'na',
            password: 'na',
            role: 'client'
          };
          // console.log("success")
          this.updateUserData(data);
          this.logout();
          return 'success';
        }
    })
    .catch((error) => {
          // Handle Errors here.
          const errorCode = error.code;
          if (errorCode === 'auth/weak-password') {
            return 'Weak Password';
          } else if (errorCode === 'auth/invalid-email') {
            return 'Invalid Email';
          } else if (errorCode === 'auth/email-already-in-use') {
            return 'Email address already in use';
          } else {
            return'Unable to Register User';
          }
    });
  }

  public loginGoogle() {
    this.firebaseAuth.auth.signInWithPopup(new auth.GoogleAuthProvider()).then((credential) => {
      this.updateUserData(credential.user);
      this.router.navigate(['/']);
    }).catch((error) => {
      console.log(error);
    });
  }

  public loginFacebook() {
    this.firebaseAuth.auth.signInWithPopup(new auth.FacebookAuthProvider()).then((credential) => {
      this.updateUserData(credential.user);
      this.router.navigate(['/']);
    }).catch((error) => {
      console.log(error);
    });
  }

  public login(formData: IUser): any {
   return this.firebaseAuth.auth.signInWithEmailAndPassword(formData['email'], formData['password'])
    .then((user) => {
      if (!user.user.emailVerified) {
        this.logout();
        console.log('Verify your email');
        return 'verify';
      } else {
        this.router.navigate(['/']);
        return 'success';
      }
    }).catch((error) => {
          return error.code;
    });
  }


  public isLoggedIn(): boolean {
    return this._currentUser !== null;
  }

  public logout(): void {
    this.firebaseAuth.auth.signOut().then(() => {
      this.router.navigate(['/login']);
    }).catch(function(error) {
      console.log('Unable to sign Out' + error);
    });
  }
}
