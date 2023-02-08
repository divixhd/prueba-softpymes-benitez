import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Router } from '@angular/router';
import { lastValueFrom } from 'rxjs';
import { GeneralService } from '../general.service';
import { LoginServiceService } from '../login-service.service';

@Component({
  selector: 'app-lista-usuarios',
  templateUrl: './lista-usuarios.component.html',
  styleUrls: ['./lista-usuarios.component.scss']
})
export class ListaUsuariosComponent implements OnInit {
  listaUsusario  = [];
  constructor(public angularFirestore: AngularFirestore,
    public loginService: LoginServiceService,
    private router: Router) { }

  ngOnInit(): void {
    this.loadInfoForTable();
  }
  async loadInfoForTable() {
    let q = this.angularFirestore.collection('lista-usuarios');
    const observableResultados$ = q.get()
    let resultadosFinales = await lastValueFrom(observableResultados$) //el last value es el nuevo equivalente a toPromise()
      .then((docs) => {
        //iteramos el resultado y lo vamos empujando al array de resultados:
        docs.forEach((doc) => {
          this.listaUsusario.push(doc)
        });

      }).then(() => {
        //console.log(this.arraydeposts)
      }).catch((err) => {
        alert("Error: " + err)
      })
  }
  createUser(){
    this.router.navigate(['/crear-usuario']);
  }
  editUser(id:any){
    this.router.navigate(['/editar-usuario',id]);
  }
  deleteUser(id:any){
    return new Promise((resolve, reject) => {
      this.angularFirestore.collection('lista-usuarios').doc(id).delete() //en delete no necesitamos enviar objeto
        .then(() => {
          alert('Usuario eliminado con éxito');
          resolve("OK")

          //después de eliminar el documento, leemos toda la coleccion (opcional)
          this.listaUsusario = [];
          this.loadInfoForTable();

        })
        .catch((err) => {
          reject(err)
          alert("Error: " + err)
        })
    })
  }
  logout(){

  }
}
