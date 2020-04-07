import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Storage } from '@ionic/storage';
import { environment } from 'src/environments/environment';
import { Usuario } from '../interfaces/interfaces';

const URL = environment.url;

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  token: string = null;
  constructor( private http: HttpClient,
               private storage: Storage) { }

  login(email, password) {
    const data = { email, password };

    return new Promise( resolve => {
      this.http.post(`${ URL }/user/login`, data ).subscribe( resp => {
        console.log('viene del servicio');
        if ( resp['ok'] ) {
          this.guardarToken( resp['token'] );
          resolve(true);
        } else {
          this.token = null;
          this.storage.clear();
          resolve(false);
        }
      });
    });
  }

  async guardarToken( token: string) {
    console.log('ya entro a guardar el token');
    this.token = token;
    await this.storage.set('token', token);
  }

  registro( usuario: Usuario) {
    return new Promise( resolve => {
      this.http.post(`${ URL }/user/create`, usuario ).subscribe( resp => {
        console.log('regreso del servicio create:');
        console.log(resp);
        if ( resp['ok'] ) {
          this.guardarToken( resp['token'] );
          resolve(true);
        } else {
          this.token = null;
          this.storage.clear();
          resolve(false);
        }
      });
    });
  }
}
