import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GeneralService {

  constructor(private http: HttpClient) { }

  public logininfo(formData: any) {
    return this.http.post<any[]>(`https://reqres.in/api/login`, formData);
  }

  public listUsers() {
    return this.http.get<any[]>(`https://reqres.in/api/users?page=2`);
  }

  public createUser(formData: any) {
    return this.http.post<any[]>(`https://reqres.in/api/users`, formData);
  }

  public viewUserInfo(id:any) {
    return this.http.get<any[]>(`https://reqres.in/api/users/${id}`);
  }

  public editUser(formData: any,id:any) {
    return this.http.put<any[]>(`https://reqres.in/api/users/${id}`, formData);
  }

  public deleteUser(id: any) {
    return this.http.delete<any[]>(`https://reqres.in/api/users/${id}`);
  }
}
