import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AddComentarioPage } from './add-comentario.page';

const routes: Routes = [
  {
    path: '',
    component: AddComentarioPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AddComentarioPageRoutingModule {}
