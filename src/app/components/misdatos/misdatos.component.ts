import { Component, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonGrid, IonRow, IonCol, IonCard, IonCardHeader, IonCardTitle, IonCardContent, IonHeader, IonToolbar, IonTitle, IonButtons, IonItem, IonLabel, IonButton } from '@ionic/angular/standalone';
import { Subscription } from 'rxjs';
import { EducationalLevel } from 'src/app/model/educational-level';
import { User } from 'src/app/model/user';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router'; // Asegúrate de importar Router
import { AlertController, IonicModule, ToastController } from '@ionic/angular'; // Asegúrate de importar estos servicios de Ionic

@Component({
  selector: 'app-misdatos',
  templateUrl: './misdatos.component.html',
  styleUrls: ['./misdatos.component.scss'],
  standalone: true,
  imports: [IonicModule ,IonButton, IonLabel, IonItem, IonButtons, IonTitle, IonToolbar, IonHeader, IonCardContent, IonCardTitle, IonCardHeader, IonCard, IonContent, IonGrid, IonRow, IonCol, CommonModule, FormsModule]
  
})
export class MisdatosComponent implements OnDestroy {

  misdatos: any = null;
  private subscription: Subscription;
  usuario: User = new User();  // Inicializar 'usuario' como una instancia de la clase User
  estadoActualizado: boolean = false;

  constructor(
    private authService: AuthService,
    private router: Router,  // Inyectamos el Router
    private alertController: AlertController,  // Inyectamos AlertController
    private toastController: ToastController  // Inyectamos ToastController
  ) {
    this.subscription = this.authService.qrCodeData.subscribe((qr) => {
      this.misdatos = qr ? JSON.parse(qr) : null;
      if (this.misdatos) {
        this.usuario = Object.assign(new User(), this.misdatos);  // Asignamos los datos del QR al usuario
      }
    });
  }

  public listaNivelesEducacionales = EducationalLevel.getLevels();


  public actualizarNivelEducacional(event: any) {
    this.usuario.educationalLevel = EducationalLevel.findLevel(event.detail.value)!;  // Actualizamos el nivel educativo del usuario
  }

  limpiarPagina() {
    console.log('Limpiando campos');
    this.usuario = new User();  // Limpiamos todos los campos del usuario
  }

  public mostrarDatosPersona(): void {
    console.log('Botón "Mis Datos" presionado');

    // Si el usuario no ingresa la cuenta, se mostrará un error
    if (this.usuario.userName.trim() === '') {
      this.presentAlert('Datos personales', 'Para mostrar los datos de la persona, debe ingresar su cuenta.');
      return;
    }

    // Si el usuario no ingresa al menos el nombre o el apellido, se mostrará un error
    if (this.usuario.firstName.trim() === '' && this.usuario.lastName.trim() === '') {
      this.presentAlert('Datos personales', 'Para mostrar los datos de la persona, al menos debe tener un valor para el nombre o el apellido.');
      return;
    }

    // Mostrar un mensaje emergente con los datos de la persona
    let mensaje = `
      <small>
        <br>Cuenta: ${this.usuario.userName}
        <br>Usuario: ${this.usuario.email}
        <br>Nombre: ${this.usuario.firstName}
        <br>Apellido: ${this.usuario.lastName}
        <br>Educación: ${this.usuario.educationalLevel.getEducation()}
        <br>Nacimiento: ${this.formatDateDDMMYYYY(this.usuario.dateOfBirth)}
        <br>Dirección: ${this.usuario.address}
      </small>
    `;
    this.presentAlert('Datos personales', mensaje);
  }

  public async presentAlert(titulo: string, mensaje: string) {
    const alert = await this.alertController.create({
      header: titulo,
      message: mensaje,
      buttons: ['OK']
    });
    await alert.present();
  }

  public formatDateDDMMYYYY(date: Date | undefined): string {
    if (!date) return 'No asignada';
    const day = date.getDate().toString().padStart(2, '0');
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
  }

  navegar(pagina: string) {
    this.router.navigate([pagina]);
  }

  async actualizar() {
    console.log('Botón Actualizar presionado');
    this.estadoActualizado = !this.estadoActualizado;
    const toast = await this.toastController.create({
      message: this.estadoActualizado ? 'Datos actualizados correctamente.' : 'Datos revertidos.',
      duration: 2000,
      position: 'top'
    });

    toast.present();
  }

  ngOnDestroy() {
    // Limpiar la suscripción cuando el componente se destruya
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }
}
