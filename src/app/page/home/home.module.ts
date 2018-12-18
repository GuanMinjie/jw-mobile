import { IonicModule } from '@ionic/angular';
import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HomePage } from './home.page';
import { ModelListComponent } from '../../component/model-list/model-list.component';
import { HighlightDirective } from '../../directive/highlight.directive';

@NgModule({

  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    RouterModule.forChild([
      { path: '', component: HomePage },
   ])
  ],
  declarations: [
    HomePage,
    HighlightDirective,
    ModelListComponent
  ]
})
export class HomePageModule {}
