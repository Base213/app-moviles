import { AlertController, IonicModule } from '@ionic/angular';
import { Component, OnInit } from '@angular/core';
import { Router , ActivatedRoute} from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-miclase',
  templateUrl: './miclase.component.html',
  styleUrls: ['./miclase.component.scss'],
  standalone: true,
  imports:[  CommonModule,
              FormsModule,
              IonicModule,
              TranslateModule, 
              MiClaseComponent]
})
export class MiClaseComponent implements OnInit {
  
  clase: any;
  private subscription: Subscription;

  constructor(private authService: AuthService) { 
    this.subscription = this.authService.qrCodeData.subscribe((qr) => {
      this.clase = qr? JSON.parse(qr): null;
      console.log('Datos recibidos del QR:', this.clase);
    })
  }
  ngOnInit(): void {
    throw new Error('Method not implemented.');
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
  
}
