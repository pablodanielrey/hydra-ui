import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ConsentRoutingModule } from './modules/consent/consent-routing.module';
import { ErrorRoutingModule } from './modules/error/error-routing.module';
import { LoginRoutingModule } from './modules/login/login-routing.module';


const routes: Routes = [ ];

@NgModule({
  imports: [
    RouterModule.forRoot(routes),
    ConsentRoutingModule,
    ErrorRoutingModule,
    LoginRoutingModule
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
