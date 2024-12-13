import { Component, ViewChild } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { IonContent, IonHeader, IonButtons } from '@ionic/angular/standalone'
import { TranslateModule } from '@ngx-translate/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from 'src/app/components/header/header.component';
import { FooterComponent } from 'src/app/components/footer/footer.component';
import { QrWebScannerComponent } from 'src/app/components/qr-web-scanner/qr-web-scanner.component';
import { Capacitor } from '@capacitor/core';
import { ScannerService } from 'src/app/services/scanner.service';
import { WelcomeComponent } from 'src/app/components/welcome/welcome.component';
import { ForumComponent } from 'src/app/components/forum/forum.component';
import { MisdatosComponent } from "../../components/misdatos/misdatos.component";
import { MiClaseComponent } from "../../components/miclase/miclase.component";
import { MiClase } from 'src/app/model/miclase';
import { UsuariosComponent } from "../../components/usuarios/usuarios.component";

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  standalone: true,
  imports: [IonButtons, IonHeader,
    CommonModule, FormsModule, TranslateModule, IonContent,
    HeaderComponent, FooterComponent,
    WelcomeComponent, QrWebScannerComponent,
    ForumComponent,
    MisdatosComponent, MiClaseComponent,  UsuariosComponent]
})
export class HomePage {
  
  @ViewChild(FooterComponent) footer!: FooterComponent;
  selectedComponent = 'welcome';

  constructor(private auth: AuthService, private scanner: ScannerService) { }

  ionViewWillEnter() {
    this.changeComponent('welcome');
  }

  async headerClick(button: string) {

    if (button === 'testqr')
      this.showAsisComponent(MiClase.jsonMiClaseExample);

    if (button === 'scan' && Capacitor.getPlatform() === 'web')
      this.selectedComponent = 'qrwebscanner';

    if (button === 'scan' && Capacitor.getPlatform() !== 'web')
        this.showAsisComponent(await this.scanner.scan());
  }

  webQrScanned(qr: string) {

    this.showAsisComponent(qr);
  }

  webQrStopped() {
    this.changeComponent('welcome');
  }

  showAsisComponent(qr: string) {

    if (MiClase.isValidMiClaseQrCode(qr)) {
      this.auth.qrCodeData.next(qr);
      this.changeComponent('miclase');
      return;
    }
    
    this.changeComponent('welcome');
  }

  footerClick(button: string) {
    this.selectedComponent = button;
  }

  changeComponent(name: string) {
    this.selectedComponent = name;
    this.footer.selectedButton = name;
  }

}
