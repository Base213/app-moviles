import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule, ToastController } from '@ionic/angular';
import { User } from 'src/app/model/user';
import { ActivatedRoute, NavigationExtras, Router } from '@angular/router';

@Component({
  selector: 'app-pregunta',
  templateUrl: './pregunta.page.html',
  styleUrls: ['./pregunta.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule]
})
export class PreguntaPage implements AfterViewInit {
  @ViewChild('itemNombre', { read: ElementRef }) itemNombre!: ElementRef;
  @ViewChild('itemApellido', { read: ElementRef }) itemApellido!: ElementRef;

  public user: User; // Cambié `Usuario` por `User`.

  public respuestaUsuario: string = '';

  constructor(
    private activeroute: ActivatedRoute, 
    private router: Router, 
    private toastController: ToastController
  ) { 
    this.user = new User(); // Cambié `Usuario` por `User`.
        
    this.activeroute.queryParams.subscribe(params => { 
      const nav = this.router.getCurrentNavigation();
      if (nav && nav.extras.state) {
        this.user = nav.extras.state['usuario']; // Cambié `usuario` por `user`.
        return;
      }
      this.router.navigate(['/login']);
    });
  }

  ngAfterViewInit(): void {
    throw new Error('Method not implemented.');
  }

  public Responder(): void {
    if (this.user.secretAnswer.trim().toLowerCase() === this.respuestaUsuario.trim().toLowerCase()) {
      const navigationExtras: NavigationExtras = {
        state: { usuario: this.user }
      };
      this.router.navigate(['/correcto'], navigationExtras);
    } else {
      this.router.navigate(['/incorrecto']);
    }
  }
  
  public ingreso() {
    this.router.navigate(['/login'])
  }
}
