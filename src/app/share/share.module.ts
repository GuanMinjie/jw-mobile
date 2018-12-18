import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AccountInputComponent } from '../component/account-input/account-input.component';
import { IonicModule } from '../../../node_modules/@ionic/angular';
import { FormsModule } from '../../../node_modules/@angular/forms';
import { RouterModule } from '../../../node_modules/@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { ChangePasswordComponent } from '../component/change-password/change-password.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule,
    ReactiveFormsModule
  ],
  declarations: [AccountInputComponent,ChangePasswordComponent],
  exports: [AccountInputComponent, ChangePasswordComponent]
})
export class ShareModule { }
