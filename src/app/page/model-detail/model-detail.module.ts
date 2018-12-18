import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { ModelDetailPage } from './model-detail.page';
import { ModelDetailComponent } from '../../component/model-detail/model-detail.component';
import { ThreeComponent } from '../../component/threeJS/three.component';

const routes: Routes = [
  {
    path: '',
    component: ModelDetailPage

  },
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [ModelDetailPage, ModelDetailComponent,ThreeComponent]
})
export class ModelDetailPageModule {}
