import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { IngresarCredencialesComponent } from './components/ingresar-credenciales/ingresar-credenciales.component';
import { VerificarChallengeComponent } from './components/verificar-challenge/verificar-challenge.component';
import { LoginComponent } from './login.component';


const routes: Routes = [
  {
    path: 'login',
    component: LoginComponent,
    children : [
      { path: 'verificar/:challenge', component: VerificarChallengeComponent },
      { path: 'login/:challenge', component: IngresarCredencialesComponent }
    ]
  }
  
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LoginRoutingModule { }
