import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { InfoAssistenciaisPageRoutingModule } from './info-assistenciais-routing.module';

import { InfoAssistenciaisPage } from './info-assistenciais.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    InfoAssistenciaisPageRoutingModule
  ],
  declarations: [InfoAssistenciaisPage]
})
export class InfoAssistenciaisPageModule {}
