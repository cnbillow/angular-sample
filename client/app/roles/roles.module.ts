import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RolesComponent } from './containers';
import { RolesRoutingModule } from './roles-routing.module';
import { NavBarModule } from '../../nav-bar/nav-bar.module';

@NgModule({
    declarations: [RolesComponent],
    imports: [ CommonModule, NavBarModule,
    RolesRoutingModule ],
})
export class RolesModule {}
