import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { IonSlides, NavController } from '@ionic/angular';
import { UsuarioService } from '../../services/usuario.service';
import { UIServiceService } from '../../services/uiservice.service';
import { Usuario } from '../../interfaces/interfaces';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  @ViewChild( 'slidePrincipal', { static: true }) slides: IonSlides;

  loginUser = {
    email: 'test1@test.com',
    password: '123456'
  };

  registroUsuario: Usuario = {
    email: 'test',
    password: '123456',
    nombre: 'Test',
    avatar: 'av-1.png'
  };

  constructor(private usuarioService: UsuarioService,
              private navCtrl: NavController,
              private uiService: UIServiceService ) { }

  ngOnInit() {
    this.slides.lockSwipes( true );
  }

  async login( fLogin: NgForm ) {
    if ( fLogin.invalid ) {
      return;
    }
    const valido = await this.usuarioService.login(this.loginUser.email, this.loginUser.password);

    if ( valido ) {
      this.navCtrl.navigateRoot( '/main/tabs/tab1', { animated: true } );
    } else {
      this.uiService.alertaInformativa('Usuario / contraseña invalidos');
    }
  }

  async registro( fRegistro: NgForm ) {
    if ( fRegistro.invalid ) {
      return;
    }
    const valido = await this.usuarioService.registro( this.registroUsuario );

    if ( valido ) {
      this.navCtrl.navigateRoot( '/main/tabs/tab1', { animated: true } );
    } else {
      this.uiService.alertaInformativa('El correo electronico ya esta registrado');
    }
  }

  mostrarRegistro( ) {
    this.slides.lockSwipes(false);
    this.slides.slideTo(0);
    this.slides.lockSwipes(true);
  }

  mostrarLogin() {
    this.slides.lockSwipes(false);
    this.slides.slideTo(1);
    this.slides.lockSwipes(true);
  }

}
