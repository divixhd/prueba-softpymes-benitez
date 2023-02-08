import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { GeneralService } from '../general.service';
import { LoginServiceService } from '../login-service.service';
declare var window: any;

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  formLogin: FormGroup;
  formModal: any;
  email
  password
  constructor(private formBuilder: FormBuilder,
    public loginService:LoginServiceService,
    private router: Router) { }

  ngOnInit(): void {
    this.formLogin = this.buildForm();
    this.formModal = new window.bootstrap.Modal(
      document.getElementById('myModal')
    );
  }
  private buildForm() {
    return this.formBuilder.group({
      emailField: ['', [
        Validators.required,
        Validators.maxLength(50),
        Validators.minLength(4),
        Validators.email,
        Validators.pattern(/^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/)
      ]],
      passwordField: ['', [Validators.required]],
    });
  }
  login(event: Event) {
    event.preventDefault();
    /*
    if (this.formLogin.valid) {
      this.Login();
    }
    */
    this.Login();
  }
  Login(){
    // this.abreModalGenerico("Autenticando...","un momento por favor...")
    this.loginService.login(this.email,this.password)

  }
  createUser(){
    this.router.navigate(['/registrar']);
  }
  openFormModal() {
    this.formModal.show();
  }
  saveSomeThing() {
    // confirm or save something
    this.formModal.hide();
  }
}
