import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { UsuariosModel } from 'src/app/models/usuarios.model';
import { AuthService } from 'src/app/services/auth.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  usuarios:UsuariosModel | any;
  rememberme:boolean = false;
  constructor(private auth:AuthService, private router:Router) { }

  ngOnInit() {this.usuarios = new UsuariosModel();
    if(localStorage.getItem('email')){
      this.usuarios.email= localStorage.getItem('email');
      this.rememberme=true;
    }
  }
  onSubmit( form:NgForm){
    if(form.invalid) {return;}
    Swal.fire({
      allowOutsideClick:false,
      icon:'info',
      text:'Espere porfavor',
    });
    Swal.showLoading();
    this.auth.logIn(this.usuarios).subscribe(path=>{
      Swal.close();
      if(this.rememberme){
        localStorage.setItem('email', this.usuarios.email);
      }
      this.router.navigateByUrl('/home');
      console.log(path);
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
