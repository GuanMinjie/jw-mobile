import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  { path: 'home', loadChildren: './tabs/tabs.module#TabsPageModule' },
  { path: 'models', loadChildren: './page/model-detail/model-detail.module#ModelDetailPageModule' },
  { path: '', loadChildren: './page/login/login.module#LoginPageModule' },
  { path: 'register', loadChildren: './page/register/register.module#RegisterPageModule' },
  { path: 'ModifyPassword', loadChildren: './page/modify-password/modify-password.module#ModifyPasswordPageModule' },
  { path: 'model-info', loadChildren: './page/model-info/model-info.module#ModelInfoPageModule' },
  
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
