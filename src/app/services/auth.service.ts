import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { UsuariosModel } from '../models/usuarios.model';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private url ='https://identitytoolkit.googleapis.com/v1/accounts:';
  private apikey ='AIzaSyATgxIuEBxuHqNZP8aIHZ3yfMMw9gdQrhE';
  private authToken:any;
  constructor(private http:HttpClient) { 
    this.readToken();
  }
  logIn(User:UsuariosModel){
    const authData={
      ...User,
      returnSecureToken: true
    }
    return this.http.post(`${this.url}signInWithPassword?key=${this.apikey}`,authData)
                .pipe(map((resp:any)=>{
                  console.log('En el mapa');
                  this.saveToken(resp['idToken'] );
                  return resp;
                }));;

  }
  logOut(){
    localStorage.removeItem('token');
  }
  newUser(User:UsuariosModel){
    const authData={
      ...User,
      returnSecureToken: true
    }
    return this.http.post(`${this.url}signUp?key=${this.apikey}`,authData)
               .pipe(map((resp:any)=>{
                 console.log('En el mapa');
                 this.saveToken(resp['idToken'] );
                 return resp;
               }));
  }
   saveToken(idToken:string){
    this.authToken = idToken;
    localStorage.setItem('token',idToken);
    let hoy = new Date();
    hoy.setSeconds(3600);
    let actual = hoy.getTime().toString();
    localStorage.setItem('expira', actual);

  }
   readToken(){
    if(localStorage.getItem('token')){
      this.authToken = localStorage.getItem('token');
    }else{
      this.authToken='';
    }
  }
  isAuth(): boolean{
    if(this.authToken.length <2 ){
      return false;
    }
    const expira = Number(localStorage.getItem('expira'))
    const expiraDate = new Date();
    expiraDate.setTime(expira);
    
    if(expiraDate > new Date()){
      return true;
    }else{
      return false;
    }
  }
  //https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=[API_KEY]
  //https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=[API_KEY]

}
