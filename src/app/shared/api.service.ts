import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { pipe } from 'rxjs';
import {map} from 'rxjs/operators'
@Injectable({
  providedIn: 'root'
})
export class ApiService{

  public loginAPIUrl : string = "https://localhost:44356/api/Login/";
  public colaboradoresAPIUrl : string = "https://localhost:44356/api/Colaboradores/";
  constructor(private _http : HttpClient) { }

  PostEmployee(data : any){
    return this._http.post<any>(`${this.colaboradoresAPIUrl}Adicionar_Colaborador`,data)
    .pipe(map((res:any)=>{
      return res;
    }))
  }
  DeleteEmployee(id : number){
    return this._http.delete<any>(`${this.colaboradoresAPIUrl}Apagar_Colaborador`+id)
    .pipe(map((res:any)=>{
      return res;
    }))
  }
  UpdateEmployee(data : any){
    return this._http.put<any>(`${this.colaboradoresAPIUrl}Alterar_Colaborador`,data)
    .pipe(map((res:any)=>{
      return res;
    }))
  }
  GetEmployees(){
    return this._http.get<any>(`${this.colaboradoresAPIUrl}Todos_Colaboradores`)
    .pipe(map((res:any)=>{
      return res;
    }))
  }
  signUp(empObj : any){
    return this._http.post<any>(`${this.loginAPIUrl}Registro`,empObj)
  }
  login(empObj:any){
    return this._http.post<any>(`${this.loginAPIUrl}Login`,empObj)
  }
}
