import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { UpdatingComponent } from './components/updating/updating.component';

const routes: Routes = [
    { path: 'updating', component: UpdatingComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UpdatingRoutingModule { 
    
}

