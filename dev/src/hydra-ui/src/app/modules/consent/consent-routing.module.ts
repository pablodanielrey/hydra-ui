import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ConsentChallengeComponent } from './components/consent-challenge/consent-challenge.component';
import { ConsentComponent } from './consent.component';


const routes: Routes = [
  {
    path: 'consent',
    component: ConsentComponent,
    children : [
      { path: 'verify/:challenge', component: ConsentChallengeComponent }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ConsentRoutingModule { }
