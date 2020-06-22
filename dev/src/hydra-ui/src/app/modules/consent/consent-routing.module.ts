import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ConsentChallengeComponent } from './components/consent-challenge/consent-challenge.component';


const routes: Routes = [
  { path: 'verify/:challenge', component: ConsentChallengeComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ConsentRoutingModule { }
