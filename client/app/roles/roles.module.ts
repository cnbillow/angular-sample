import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RolesComponent } from './roles.component';
import { RolesRoutingModule } from './roles-routing.module';

@NgModule({
    declarations: [RolesComponent],
    imports: [ CommonModule,
    RolesRoutingModule ],
})
export class RolesModule {}
