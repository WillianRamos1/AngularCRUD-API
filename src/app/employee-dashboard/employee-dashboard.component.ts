import { Component, Input, OnInit } from '@angular/core';
import { ApiService } from '../shared/api.service';
import { FormBuilder, FormGroup } from '@angular/forms'
import { Colaboradores } from './employee-dashboard.model';
@Component({
  selector: 'app-employee-dashboard',
  templateUrl: './employee-dashboard.component.html',
  styleUrls: ['./employee-dashboard.component.css']
})
export class EmployeeDashboardComponent implements OnInit {

  formValue !: FormGroup;
  employeeData !: any;
  employeeObj : Colaboradores = new Colaboradores();
  showAdd !: boolean;
  showUpdate !: boolean;
  @Input() receive !: string;
  @Input() mobileSpecification !: any;
  role:string =""
  constructor(private api: ApiService,
    private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.formValue = this.formBuilder.group({
      primeiroNome: [''],
      ultimoNome: [''],
      email: [''],
      telefone: [''],
      salario: ['']
    })
    this.getEmployeeDetails();
    this.role = localStorage.getItem('tipoUsuario')!
  }
  clickAddEmployee(){
    this.formValue.reset();
    this.showAdd = true;
    this.showUpdate = false;
  }
  postEmployeeDetails() {
    this.employeeObj.PrimeiroNome = this.formValue.value.primeiroNome;
     this.employeeObj.UltimoNome = this.formValue.value.ultimoNome;
     this.employeeObj.Email = this.formValue.value.email;
     this.employeeObj.Telefone = this.formValue.value.telefone;
     this.employeeObj.Salario = this.formValue.value.salario;
    this.api.PostEmployee(this.employeeObj)
      .subscribe(res => {
        console.log(res);
        let ref = document.getElementById('close');
      ref?.click();
      this.getEmployeeDetails();
      })
  }
  getEmployeeDetails() {
    this.api.GetEmployees()
    .subscribe(res=>{
      this.employeeData = res.detalhesColaborador;
      
    })
  }
  editEmployeeDetail(){
     this.employeeObj.PrimeiroNome = this.formValue.value.primeiroNome;
     this.employeeObj.UltimoNome = this.formValue.value.ultimoNome;
     this.employeeObj.Email = this.formValue.value.email;
     this.employeeObj.Telefone = this.formValue.value.telefone;
     this.employeeObj.Salario = this.formValue.value.salario;
    this.api.UpdateEmployee(this.employeeObj)
    .subscribe(res=>{
      alert("Updated Successfully")
      let ref = document.getElementById('close');
      ref?.click();
      this.getEmployeeDetails();
    })
  }
  onEdit(row : any){
    this.employeeObj.ID = row.id;
    this.formValue.controls['primeiroNome'].setValue(row.primeiroNome);
    this.formValue.controls['ultimoNome'].setValue(row.ultimoNome);
    this.formValue.controls['email'].setValue(row.email);
    this.formValue.controls['telefone'].setValue(row.telefone);
    this.formValue.controls['salario'].setValue(row.salario);
    this.showUpdate = true;
    this.showAdd = false;
  }

  deleteEmployeeDetail(row : any){
   let clickedYes = confirm("Are you sure want to delete");
   if(clickedYes){
    this.api.DeleteEmployee(row.id)
    .subscribe(res=>{
      alert("Deleted Successfully");
      this.getEmployeeDetails();
    })
   }
    
  }
}
