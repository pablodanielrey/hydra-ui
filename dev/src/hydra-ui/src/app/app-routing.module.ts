import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { UpdatingRoutingModule } from './modules/updating/updating-routing.module';


const routes: Routes = [
  { path: '**', redirectTo: '/updating' }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes),
    UpdatingRoutingModule
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
