import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { InfoAssistenciaisPage } from './info-assistenciais.page';

const routes: Routes = [
  {
    path: '',
    component: InfoAssistenciaisPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class InfoAssistenciaisPageRoutingModule {}
