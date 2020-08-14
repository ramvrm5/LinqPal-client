import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { UserInfoComponent } from './user-info/user-info.component';
const routes: Routes = [
	{ path: '', component: UserInfoComponent },
	{ path: 'userInfo', redirectTo: '', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
