import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { getFunctions, httpsCallable } from "firebase/functions";
import { GeneralService } from '../general.service';
import { LoginServiceService } from '../login-service.service';

@Component({
  selector: 'app-create-user',
  templateUrl: './create-user.component.html',
  styleUrls: ['./create-user.component.scss']
})
export class CreateUserComponent implements OnInit {
  formUser: FormGroup;
  roles: any = [{ label: 'Administrador', id: 'admin' }, { label: 'Hombre de compañía', id: 'company_man'}]
  constructor(
    private router: Router,
    public loginService: LoginServiceService,
    private fb: FormBuilder,
    public angularFireAuth: AngularFireAuth,
    public angularFirestore: AngularFirestore,) { }

  ngOnInit(): void {
    this.createForm();
  }

  createForm() {
    this.formUser = this.fb.group({
      nombre: [''],
      role: [''],
      correo: [''],
      telefono: [''],
    });
  }

  finishForm() {
    let dto = {};
    dto['nombre'] = this.formUser.controls['nombre'].value;
    dto['correo'] = this.formUser.controls['correo'].value;
    dto['telefono'] = this.formUser.controls['telefono'].value;
    dto['role'] = this.formUser.controls['role'].value;
    const body = JSON.parse(JSON.stringify(dto));
    this.crear(body)
  }

  crear(body) {
    this.createUsers(body);
  }

  createUsers(body) {
    return new Promise((resolve, reject) => {
      this.angularFirestore.collection('lista-usuarios').add(body).then((result) => {
        alert('Usuario creado con éxito');
        this.router.navigate(['/lista-usuarios']);
        resolve("OK")
      }).catch((err) => {
        reject(err)
      })
    });
  }
}
