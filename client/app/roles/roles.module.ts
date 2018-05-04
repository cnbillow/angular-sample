import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RolesComponent } from './containers';
import { RolesRoutingModule } from './roles-routing.module';

@NgModule({
    declarations: [RolesComponent],
    imports: [ CommonModule,
    RolesRoutingModule ],
})
export class RolesModule {}
