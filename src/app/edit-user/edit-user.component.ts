import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { FormGroup, FormBuilder } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { lastValueFrom } from 'rxjs';

@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.component.html',
  styleUrls: ['./edit-user.component.scss']
})
export class EditUserComponent implements OnInit {
  formUser: FormGroup;
  idSelected: any = null;
  constructor(private formBuilder: FormBuilder,
    public angularFirestore: AngularFirestore,
    private _activatedRoute: ActivatedRoute,
    private router: Router) { }

  ngOnInit(): void {
    this.formUser = this.createForm();
    this._activatedRoute.params.subscribe((params: Params) => {
      if (params['id']) {
        this.idSelected = params['id'];
        this.loadInfoForEdit(this.idSelected);
      }
    });
  }
  createForm() {
    return this.formBuilder.group({
      nombre: [''],
      role: [''],
      correo: [''],
      telefono: [''],
    });
  }
  async loadInfoForEdit(id?: any) {
    let q = this.angularFirestore.collection('lista-usuarios').doc(id);
    const observableResultados$ = q.get()
    let resultadosFinales = await lastValueFrom(observableResultados$) //el last value es el nuevo equivalente a toPromise()
    .then((docs) => {
      //iteramos el resultado y lo vamos empujando al array de resultados:
      var objectMapReports: any = docs.data();
      this.formUser.get('nombre').setValue(objectMapReports.nombre)
      this.formUser.get('role').setValue(objectMapReports.role)
      this.formUser.get('correo').setValue(objectMapReports.correo)
      this.formUser.get('telefono').setValue(objectMapReports.telefono)
    }).then(() => {
      //console.log(this.arraydeposts)
    }).catch((err) => {
      alert("Error: " + err)
    })
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
      this.angularFirestore.collection('lista-usuarios').doc(this.idSelected).update(body).then(() => {
        //this.notificationsService.showSuccess("Formulario creado exitosamente!");
        alert('Usuario actualizado con éxito');
        this.router.navigate(['/lista-usuarios']);
        resolve("OK")
      })
        .catch((err) => {
          //this.notificationsService.showError("Error al actualizar el reporte", + err)
          reject(err)
        })
    });
  }
}
