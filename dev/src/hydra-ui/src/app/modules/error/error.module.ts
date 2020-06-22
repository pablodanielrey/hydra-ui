import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ErrorRoutingModule } from './error-routing.module';
import { ErrorComponent } from './components/error/error.component';
import { ErrorMaterialModule } from './error-material.module';


@NgModule({
  declarations: [ErrorComponent],
  imports: [
    CommonModule,
    ErrorRoutingModule,
    ErrorMaterialModule
  ]
})
export class ErrorModule { }
