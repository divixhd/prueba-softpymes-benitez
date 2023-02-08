import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Router } from '@angular/router';

@Component({
  selector: 'app-registrar',
  templateUrl: './registrar.component.html',
  styleUrls: ['./registrar.component.scss']
})
export class RegistrarComponent implements OnInit {
  email
  password

  constructor(
    public angularFireAuth: AngularFireAuth,
    private router: Router
  ) { }

  ngOnInit(): void {
  }
  Registrar(){
    this.SignUp(this.email,this.password)
  }
  SignUp(email, password) {
    return this.angularFireAuth
      .createUserWithEmailAndPassword(email, password)
      .then((result) => {
        window.alert('You have been successfully registered!');
        console.log(result.user);
        this.router.navigate(['']);
      })
      .catch((error) => {
        window.alert(error.message);
      });
  }
}
