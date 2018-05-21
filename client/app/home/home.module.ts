import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './containers/home.component';
import { HomeRoutingModule } from './home-routing.module';
import { RouterModule } from '@angular/router';
import { NavBarModule } from '../nav-bar/nav-bar.module';

@NgModule({
    declarations: [HomeComponent],
    imports: [
        NavBarModule,
        CommonModule,
        RouterModule,
        HomeRoutingModule,
    ],
    exports: [],
    providers: [],
})
export class HomeModule { }
