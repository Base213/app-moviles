import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule, ToastController } from '@ionic/angular';
import { NavigationExtras, Router } from '@angular/router';
import { DatabaseService } from 'src/app/services/database.service';
import { User } from 'src/app/model/user';

@Component({
  selector: 'app-correo',
  templateUrl: './correo.page.html',
  styleUrls: ['./correo.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule]
})
export class CorreoPage {

  constructor(private router: Router, private toastController: ToastController, private bd: DatabaseService) { 
    this.usuario = new User()
  }
  public usuario: User;

  public correo: string = '';

  public IrPregunta() : void {
    const usu = new User();
    const usuarioValidado= usu.email;

    if (!usuarioValidado) {
      this.router.navigate(['/incorrecto']);
    } else {
      const navigationExtras: NavigationExtras = {
        state: {
          usuario: usuarioValidado
        }
      };
      this.router.navigate(['/pregunta'], navigationExtras);
    }
    
  }

  public async SiguientePaso() {
    var respuesta  = await this.bd.findUserByEmail(this.usuario.email);

    if (respuesta) {
      const navigationExtras: NavigationExtras = {
        state: {
          usuario: respuesta
        }
      };
      this.router.navigate(['/pregunta'], navigationExtras);
    } else {
      this.router.navigate(['/incorrecto']);
    }
  }

  async mostrarMensaje(mensaje: string, duracion?: number) {
    const toast = await this.toastController.create({
        message: mensaje,
        duration: duracion? duracion: 2000
      });
    toast.present();
  }

  public ingreso() {
    this.router.navigate(['/login'])
  }

}