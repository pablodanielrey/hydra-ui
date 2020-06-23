import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ConsentRoutingModule } from './consent-routing.module';
import { ConsentMaterialModule } from './consent-material.module';
import { ConsentChallengeComponent } from './components/consent-challenge/consent-challenge.component';
import { ConsentComponent } from './consent.component';


@NgModule({
  declarations: [ConsentChallengeComponent, ConsentComponent],
  imports: [
    CommonModule,
    ConsentRoutingModule,
    ConsentMaterialModule
  ]
})
export class ConsentModule { }
