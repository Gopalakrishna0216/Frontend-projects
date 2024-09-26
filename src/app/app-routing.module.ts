import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LcFormComponent } from './lc-form/lc-form.component';

const routes: Routes = [
  {path:'lc_F_end',component:LcFormComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
