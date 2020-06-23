import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { LoginRoutingModule } from './login-routing.module';
import { VerificarChallengeComponent } from './components/verificar-challenge/verificar-challenge.component';
import { LoginMaterialModule } from './login-material.module';
import { IngresarCredencialesComponent } from './components/ingresar-credenciales/ingresar-credenciales.component';
import { LoginComponent } from './login.component';

@NgModule({
  declarations: [
    VerificarChallengeComponent,
    IngresarCredencialesComponent,
    LoginComponent,  
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    LoginRoutingModule,
    LoginMaterialModule
  ]
})
export class LoginModule { }
