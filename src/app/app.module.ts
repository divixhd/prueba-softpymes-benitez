import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { environment } from '../environments/environment';
import { provideAuth, getAuth } from '@angular/fire/auth';
import { provideFirestore, getFirestore } from '@angular/fire/firestore';
import { provideStorage, getStorage } from '@angular/fire/storage';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ListaUsuariosComponent } from './lista-usuarios/lista-usuarios.component';
import { LoginComponent } from './login/login.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CreateUserComponent } from './create-user/create-user.component';
import { EditUserComponent } from './edit-user/edit-user.component';

//firebase con Angular fire
// 1. Import the libs you need
//SI SE DESCONECTA LA LIBRERIA DE ANGULAR FIRE AL INSTALAR CUALQUIER OTRA COSA,
import * as firebase from 'firebase/app';
// TOCA VOLVER A INSTALARLA CON: ng add @angular/fire
import { AngularFireModule } from "@angular/fire/compat";
import { AngularFireAuthModule } from "@angular/fire/compat/auth";
import { AngularFireStorageModule } from '@angular/fire/compat/storage';
import { AngularFirestoreModule } from '@angular/fire/compat/firestore';
import { AuthGuard } from './shared/guards/auth.guards';
import { RegistrarComponent } from './registrar/registrar.component';


const firebaseConfig = {
  apiKey: "AIzaSyB0zAFYpKTjTnSJDZeRRqhZ2hVrWJ-BJWY",
  authDomain: "proyectoprueba-9558c.firebaseapp.com",
  databaseURL: "https://proyectoprueba-9558c-default-rtdb.firebaseio.com",
  projectId: "proyectoprueba-9558c",
  storageBucket: "proyectoprueba-9558c.appspot.com",
  messagingSenderId: "267075848130",
  appId: "1:267075848130:web:1aebaf1474e4c7b7ddb85b",
  measurementId: "G-YGGQ6NF8HB"
};

firebase.initializeApp(firebaseConfig);


@NgModule({
  declarations: [
    AppComponent,
    ListaUsuariosComponent,
    LoginComponent,
    CreateUserComponent,
    EditUserComponent,
    RegistrarComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    provideFirebaseApp(() => initializeApp(environment.firebase)),
    provideAuth(() => getAuth()),
    provideFirestore(() => getFirestore()),
    provideStorage(() => getStorage()),
    AppRoutingModule,
    HttpClientModule,
    AngularFireModule.initializeApp(firebaseConfig),
    AngularFirestoreModule, // firestore
    AngularFireAuthModule, // auth
    AngularFireStorageModule, // storage
  ],
  providers: [AuthGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }
