import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LoginRoutingModule } from './login-routing.module';
import { VerificarChallengeComponent } from './components/verificar-challenge/verificar-challenge.component';
import { LoginMaterialModule } from './login-material.module';
import { IngresarCredencialesComponent } from './components/ingresar-credenciales/ingresar-credenciales.component';

@NgModule({
  declarations: [
    VerificarChallengeComponent,
    IngresarCredencialesComponent,  
  ],
  imports: [
    CommonModule,
    LoginRoutingModule,
    LoginMaterialModule
  ]
})
export class LoginModule { }
