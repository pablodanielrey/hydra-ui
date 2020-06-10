import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-registrar-dispositivo',
  templateUrl: './registrar-dispositivo.component.html',
  styleUrls: ['./registrar-dispositivo.component.scss']
})
export class RegistrarDispositivoComponent implements OnInit {

  private key = 'login_device';

  constructor(private router: Router) { 
  }

  ngOnInit() {
    let device = localStorage.getItem(this.key);
    if (device != null) {
      // dispositivo ya registrado
      this.router.navigate(['/login/bienvenido']);
    }
  }

  registrar() {
    let s = 'dsfdsfdsef234f4334g344g3';
    localStorage.setItem(this.key, s);
    this.continuar();
  }

  continuar() {
    this.router.navigate(['/login/bienvenido']);
  }

}
