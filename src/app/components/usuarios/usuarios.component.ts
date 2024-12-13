import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import {  } from '@ionic/angular';

import { IonInput, IonRow, IonGrid, IonCardTitle, IonCard, IonLabel, IonButton, IonIcon, IonContent, IonList, IonItem, IonAvatar, IonCardHeader, IonCardContent, IonCol, IonHeader, IonToolbar } from "@ionic/angular/standalone";
import { addIcons } from 'ionicons';
import { trash, add } from 'ionicons/icons';
import { User } from 'src/app/model/user';
import { DatabaseService } from 'src/app/services/database.service';

@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styleUrls: ['./usuarios.component.scss'],
  standalone: true,
  imports: [IonToolbar, IonHeader, IonCol, IonCardContent, IonCardHeader, 
    IonContent, IonRow,
    IonButton, IonIcon, IonCol, IonGrid,
    CommonModule, IonCard, IonCardTitle] 
})
export class UsuariosComponent  implements OnInit {
  usuarios : User[] = [];

  constructor(private databaseService: DatabaseService) { 
    addIcons({add,trash});
  }

  async ngOnInit() {
    try {
      this.usuarios = await this.databaseService.getAllUsers();
    } catch (error) {
      console.error('Error loading users:', error);
    }
  }

  async deleteUser(userName: string) {
    try {
      const confirmation = confirm('¿Esta seguro de eliminar al usuario?');
      if (confirmation) {
        await this.databaseService.deleteUser(userName);
        this.ngOnInit(); 
      }
    } catch (error) {
      console.error('Ha ocurrido un error al eliminar el usuairo:', error);
    }
  }

}
