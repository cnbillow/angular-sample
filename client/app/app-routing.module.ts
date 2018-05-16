import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AppComponent } from './app.component';
import { HomeModule } from './home/home.module';
import { LoginComponent } from './login/containers/login.component';
import { AuthGuard } from './_guards/auth.guard';

export function loadModule(module) {
  return module;
}

const routes: Routes = [

  {
    path: 'login',
    component: LoginComponent,
  },
  {
    path: 'home',
    loadChildren: './home/home.module#HomeModule',
    canActivate: [AuthGuard]
  },
  {
    path: '**',
    redirectTo: 'login'
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
