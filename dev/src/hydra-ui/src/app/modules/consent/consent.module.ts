import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ConsentRoutingModule } from './consent-routing.module';
import { ConsentMaterialModule } from './consent-material.module';
import { ConsentChallengeComponent } from './components/consent-challenge/consent-challenge.component';


@NgModule({
  declarations: [ConsentChallengeComponent],
  imports: [
    CommonModule,
    ConsentRoutingModule,
    ConsentMaterialModule
  ]
})
export class ConsentModule { }
