import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { LoginPage } from './login.page';
import { AccountInputComponent } from '../../component/account-input/account-input.component';
import { ShareModule } from '../../share/share.module';

const routes: Routes = [
  {
    path: '',
    component: LoginPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes),
    ShareModule,
  ],
  // exports: [AccountInputComponent],
  declarations: [LoginPage],
 
})
export class LoginPageModule {}
