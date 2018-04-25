import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AppComponent } from './app.component';
import { HomeModule } from './home/home.module';
import { UsersModule } from './users/users.module';

const routes: Routes = [
  {
    path: '',
    // temporary until The bug is fixed on Angular
    //loadChildren: './home/home.module#HomeModule',
    loadChildren: () => HomeModule,
  },
  {
    path: 'users',
    //loadChildren: './users/users.module#UsersModule',
    loadChildren: () => UsersModule,

  },
  {
    path: '**',
    redirectTo: ''
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
