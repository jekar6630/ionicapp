import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Storage } from '@ionic/storage';
import { environment } from 'src/environments/environment';
import { Usuario } from '../interfaces/interfaces';
import { NavController } from '@ionic/angular';

const URL = environment.url;

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  token: string = null;
  private usuario: Usuario = {};
  constructor( private http: HttpClient,
               private storage: Storage,
               private navCtrl: NavController) { }

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

  async cargarToken() {
      this.token = await this.storage.get('token') || null;
  }

  async validaToken(): Promise<boolean> {

    await this.cargarToken();

    if ( !this.token ) {
      this.navCtrl.navigateRoot('/login');
      return Promise.resolve(false);
    }

    return new Promise<boolean>(resolve => {
      const headers = new HttpHeaders({
        'x-token': this.token
      });
      this.http.get(`${ URL }/user/`, { headers }).subscribe( resp => {
        if( resp['ok'] ) {
          this.usuario = resp['usuario'];
          resolve(true);
        } else {
          this.navCtrl.navigateRoot('/login');
          resolve(false);
        }
      });
    });
  }

  getUsuario() {

    if ( !this.usuario._id ) {
      this.validaToken();
    }

    return { ...this.usuario };
  }

  actualizarUsuario( usuario: Usuario) {
    console.log('Actualizar usuario: ' + usuario.avatar);
    const headers = new HttpHeaders({
      'x-token': this.token
    });

    return new Promise( resolve => {
      this.http.post(`${ URL }/user/update`, usuario, { headers }).subscribe( resp => {
        console.log(resp);
        if ( resp['ok'] ) {
          this.guardarToken( resp['token'] );
          resolve(true);
        } else {
          resolve(false);
        }
      });
    });
  }

}
