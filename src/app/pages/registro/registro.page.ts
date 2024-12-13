import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule, ToastController, AlertController } from '@ionic/angular';
import { Router } from '@angular/router';
import { EducationalLevel } from 'src/app/model/educational-level';
import { User } from 'src/app/model/user';
import { AuthService } from 'src/app/services/auth.service';
import { DatePickerComponent } from 'src/app/components/date-picker/date-picker.component';

@Component({
  selector: 'app-registrarme',
  templateUrl: './registro.page.html',
  styleUrls: ['./registro.page.scss'],
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
  ]
})
export class RegistrarmePage {
  usuario: User = new User(); // Inicializamos un objeto de tipo 'User'
  public listaNivelesEducacionales = EducationalLevel.getLevels(); // Lista de niveles educacionales

  constructor(
    private authService: AuthService,
    private router: Router,
    private toastController: ToastController,
    private alertController: AlertController
  ) {}

  // Función que se llama al presionar el botón "Crear Cuenta"
  async crearCuenta() {
    const password = this.usuario.password.trim();
    const confirmPassword = this.usuario.confirmPassword.trim();
    const isRegistered = await this.authService.register(this.usuario);
      if (isRegistered) {
        this.presentToast('Cuenta creada con éxito');
        this.router.navigate(['/login']);
      } else {
        this.presentAlert('Error', 'El correo electrónico ya está registrado');
      }
    // Verifica si las contraseñas coinciden
    if (password !== confirmPassword) {
      this.presentAlert('Error', 'Las contraseñas no coinciden');
      return;
    }

    // Validación de campos vacíos
    if (this.usuario.userName.trim() === '' || this.usuario.email.trim() === '') {
      this.presentAlert('Error', 'Por favor, complete todos los campos requeridos.');
      return;
    }

    // Validación de correo electrónico
    if (!this.isValidEmail(this.usuario.email)) {
      this.presentAlert('Error', 'Por favor ingrese un correo electrónico válido.');
      return;
    }
  }

  // Función para validar el correo electrónico
  isValidEmail(email: string): boolean {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  }

  // Función para mostrar un mensaje emergente (alerta)
  async presentAlert(titulo: string, mensaje: string) {
    const alert = await this.alertController.create({
      header: titulo,
      message: mensaje,
      buttons: ['OK']
    });
    await alert.present();
  }

  // Función para mostrar un mensaje emergente (toast)
  async presentToast(mensaje: string) {
    const toast = await this.toastController.create({
      message: mensaje,
      duration: 2000,
      position: 'top'
    });
    toast.present();
  }

  public ingreso() {
    this.router.navigate(['/login'])
  }
}
