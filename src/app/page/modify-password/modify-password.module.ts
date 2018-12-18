import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { ModifyPasswordPage } from './modify-password.page';
import { ShareModule } from '../../share/share.module';

const routes: Routes = [
  {
    path: '',
    component: ModifyPasswordPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes),
    ShareModule
  ],
  declarations: [ModifyPasswordPage]
})
export class ModifyPasswordPageModule {}
