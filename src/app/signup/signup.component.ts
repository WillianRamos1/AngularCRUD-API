import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import {FormGroup,FormBuilder, Validators} from '@angular/forms'
import { Router } from '@angular/router';
import { ApiService } from '../shared/api.service';
import { Usuarios} from '../shared/model/user.model';
@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  public RegistroForm !: FormGroup;
  public Registro = new Usuarios();
  constructor(private fb :FormBuilder, private http : HttpClient,private router : Router, private api: ApiService) { }

  ngOnInit(): void {
    this.RegistroForm = this.fb.group({
      nomecompleto:["", Validators.required],
      telefone:["",Validators.required],
      usuarionome:["",Validators.compose([Validators.required,Validators.email])],
      senha:["",Validators.required],
      tipousuario:["",Validators.required]
    })
  }

  signUp(){
  //   this.http.post<any>("http://localhost:3000/signupUser", this.signUpForm.value)
  //   .subscribe(res=>{
  //     alert("Signup Successfull");
  //     this.signUpForm.reset();
  //     this.router.navigate(['login'])
  //   },err=>{
  //     alert("Something went wrong");
  //   })
  // }
  this.Registro.NomeCompleto = this.RegistroForm.value.nomecompleto;
  this.Registro.UsuarioNome = this.RegistroForm.value.usuarionome;
  this.Registro.Senha = this.RegistroForm.value.senha;
  this.Registro.TipoUsuario = this.RegistroForm.value.tipoUsuario;
  this.Registro.Telefone = this.RegistroForm.value.telefone
  this.api.signUp(this.Registro)
  .subscribe(res=>{
    alert(res.message);
    this.RegistroForm.reset();
    this.router.navigate(['login'])
  })
}
}
