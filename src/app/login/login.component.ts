import { HttpClient } from '@angular/common/http';
import { Component, OnInit, } from '@angular/core';
import {FormGroup,FormBuilder, Validators} from '@angular/forms'
import { Router } from '@angular/router';
import { ApiService } from '../shared/api.service';
import { Usuarios } from '../shared/model/user.model';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  public loginForm !: FormGroup;
  public Login = new Usuarios();
  constructor(private fb :FormBuilder, private http : HttpClient,private router : Router,private api : ApiService) { }


  ngOnInit(): void {
    this.loginForm = this.fb.group({
      usuarioNome:["",Validators.compose([Validators.required,Validators.email])],
      senha:["",Validators.required]
    });
   localStorage.clear();
  }
  login(){
  //   this.http.get<any>("http://localhost:3000/signupUsers")
  //   .subscribe(res=>{
  //     const user = res.find((a:any)=>{
  //       return a.email === this.loginForm.value.email && a.password === this.loginForm.value.password
  //     });
  //     if(user){
  //       alert("Login Success!!");
  //       this.router.navigate(['dashboard']);
  //         this.loginForm.reset();
  //     }
  //   },err=>{
  //     alert("Something went wrong!!")
  //   })
  this.Login.UsuarioNome = this.loginForm.value.usuarioNome;
  this.Login.Senha = this.loginForm.value.senha;
  this.api.login(this.Login)
  .subscribe(res=>{
    alert(res.message);
    this.router.navigate(['dashboard']);
    localStorage.setItem('token',res.token);
    localStorage.setItem('tipoUsuario',res.tipoUsuario);
  },err=>{
    alert("Algo deu Errado")
  })
   }

}
