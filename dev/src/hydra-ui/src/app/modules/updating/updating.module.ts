import { NgModule, Optional, SkipSelf, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UpdatingComponent } from './components/updating/updating.component';
import { UpdatingMaterialModule } from './updating-material.module';
import { UpdatingRoutingModule } from './updating-routing.module';



@NgModule({
  declarations: [
    UpdatingComponent
  ],
  imports: [
    CommonModule,
    UpdatingMaterialModule,
    UpdatingRoutingModule
  ],
  exports: [
    UpdatingRoutingModule
  ]
})
export class UpdatingModule { 

  constructor(@Optional() @SkipSelf() module: UpdatingModule) {
    if (module) {
      throw new Error('Solo debe importarse dentro de AppModule');
    }
  }

  static forRoot(): ModuleWithProviders  {
    return {
      ngModule: UpdatingModule,
      providers: [ 
      ]
    }
  }

  static forChild(): ModuleWithProviders {
    return {
      ngModule: UpdatingModule
    }
  }  


}
