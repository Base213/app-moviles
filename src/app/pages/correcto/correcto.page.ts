import { User } from './../../model/user';
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-correcto',
  templateUrl: './correcto.page.html',
  styleUrls: ['./correcto.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule]
})
export class CorrectoPage {
  public user: User;

  constructor(private activeroute: ActivatedRoute, private router: Router) { 
    this.user = new User()

    this.activeroute.queryParams.subscribe(params => { 

      const nav = this.router.getCurrentNavigation();
      if (nav) {
        if (nav.extras.state) {
          this.user = nav.extras.state['usuario'];
          return;
        }
      }
    });
    
  }

  public iniciarSesion(): void{
    this.router.navigate(['/login'])
  }

}
