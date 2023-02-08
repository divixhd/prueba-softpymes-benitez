import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { GeneralService } from '../general.service';
declare var window: any;

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  formLogin: FormGroup;
  formModal: any;
  constructor(private formBuilder: FormBuilder,
    private service: GeneralService,
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
    if (this.formLogin.valid) {
      this.Login();
    }
  }
  private Login() {
    var user = {
      email: this.formLogin.value.emailField,
      password: this.formLogin.value.passwordField,
    };
    this.service.logininfo(user).subscribe((response: any) => {
      if(response.token!=''){
        this.router.navigate(['/lista-usuarios']);
      }
      else{
        this.openFormModal();
      }
    });
  }
  openFormModal() {
    this.formModal.show();
  }
  saveSomeThing() {
    // confirm or save something
    this.formModal.hide();
  }
}
