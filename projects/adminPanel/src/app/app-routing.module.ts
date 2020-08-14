import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { RoutingGuardGuard } from './services/routing-guard.guard';

import { LoginComponent } from './login/login.component';
import { UsersListComponent } from './users-list/users-list.component';

const routes: Routes = [
	{ path: '', component: LoginComponent },
  { path: 'login', redirectTo: '', pathMatch: 'full' },
	{ path: 'usersList', component: UsersListComponent, canActivate: [RoutingGuardGuard] },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
