import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AddInfoAssistenciaisPage } from './add-info-assistenciais.page';

const routes: Routes = [
  {
    path: '',
    component: AddInfoAssistenciaisPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AddInfoAssistenciaisPageRoutingModule {}
