import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AddInfoAssistenciaisPageRoutingModule } from './add-info-assistenciais-routing.module';

import { AddInfoAssistenciaisPage } from './add-info-assistenciais.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ReactiveFormsModule,
    AddInfoAssistenciaisPageRoutingModule
  ],
  declarations: [AddInfoAssistenciaisPage]
})
export class AddInfoAssistenciaisPageModule {}
