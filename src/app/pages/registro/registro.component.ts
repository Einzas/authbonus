import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { UsuariosModel } from 'src/app/models/usuarios.model';
import { AuthService } from 'src/app/services/auth.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.css']
})
export class RegistroComponent implements OnInit {

  usuarios!:UsuariosModel;
  rememberme:boolean=false;
  constructor(private auth:AuthService, private router:Router) { }

  ngOnInit() { 
    this.usuarios = new UsuariosModel();
  }
  onSubmit( form:NgForm){
    if(form.invalid) {return;}
    Swal.fire({
      allowOutsideClick:false,
      icon:'info',
      text:'Espere porfavor',
    });
    Swal.showLoading();
    this.auth.newUser(this.usuarios).subscribe(path=>{
      console.log(path);
      Swal.close();
      if(this.rememberme){
        localStorage.setItem('email', this.usuarios.email);
      }
      this.router.navigateByUrl('/home');
    },(err)=>{
      Swal.fire({
        title: 'Error al auntenticar',
        icon:'error',
        text: err.error.error.message,
      });
      console.log(err.error.error.message);
    });
  }

}
