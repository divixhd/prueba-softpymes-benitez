import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore } from '@angular/fire/compat/firestore'
import { Observable, Subject } from 'rxjs';
import { Router } from '@angular/router';
import { LocalDataService } from './shared/services/local-data.service';

@Injectable({
  providedIn: 'root'
})
export class LoginServiceService {

  authChange = new Subject<boolean>();
  useremail = ''


  userData: Observable<firebase.default.User>;

  constructor(public angularFireAuth: AngularFireAuth, public angularFirestore: AngularFirestore, private router: Router,
    private localDataService: LocalDataService,

  ) {
    this.userData = angularFireAuth.authState;
  }


  login(email, password) {
    this.angularFireAuth.signInWithEmailAndPassword(email, password).then((result) => {
      this.useremail = result.user.email
      localStorage.setItem('uid', result.user.uid);
      localStorage.setItem('userEmail', result.user.email);
      this.authSuccessfully()
    }).catch((err) => {
      alert('Usuario o contraseña no valida');
    })

  }

  isAuth() {
    return this.localDataService.getItem('isAuthenticated');
  }

  authSuccessfully() {
    this.localDataService.setItem('isAuthenticated', true);
    this.authChange.next(true);
    // this.router.navigate(['/formulario'])

    this.router.navigate(['lista-usuarios']);
    //this.router.navigate(['/welcome'])
  }


  logout() {
    this.localDataService.removeItem("userEmail")
    this.localDataService.removeItem("userRole")
    this.localDataService.removeItem("username")
    this.angularFireAuth.signOut()
    this.authChange.next(false);
    this.router.navigate(['/login']);
    this.localDataService.setItem('isAuthenticated', false);
  }





}
