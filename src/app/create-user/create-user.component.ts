import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { getFunctions, httpsCallable } from "firebase/functions";
import { GeneralService } from '../general.service';

@Component({
  selector: 'app-create-user',
  templateUrl: './create-user.component.html',
  styleUrls: ['./create-user.component.scss']
})
export class CreateUserComponent implements OnInit {
  formUser: FormGroup;
  constructor(private formBuilder: FormBuilder,
    public angularFirestore: AngularFirestore,
    private router: Router) { }

  ngOnInit(): void {
    this.formUser = this.createForm();
  }
  createForm() {
    return this.formBuilder.group({
      nombre: [''],
      role: [''],
      correo: [''],
      telefono: [''],
    });
  }
  create() {
    let dto = {};
    dto['nombre'] = this.formUser.controls['nombre'].value;
    dto['correo'] = this.formUser.controls['correo'].value;
    dto['telefono'] = this.formUser.controls['telefono'].value;
    dto['role'] = this.formUser.controls['role'].value;
    const body = JSON.parse(JSON.stringify(dto));
    this.createUsers(body)
  }

  createUsers(body) {
    return new Promise((resolve, reject) => {
      this.angularFirestore.collection('lista-usuarios').add(body).then(() => {
        //this.notificationsService.showSuccess("Formulario creado exitosamente!");
        this.router.navigate(['/lista-usuarios']);
        resolve("OK")
      }).catch((err) => {
        //this.notificationsService.showError("Error al crear el reporte", + err)
        reject(err)
      })
    });
  }
}
