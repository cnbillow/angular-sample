import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './containers/home.component';
import { HomeRoutingModule } from './home-routing.module';
import { MatTabsModule } from '@angular/material/tabs';
import { RouterModule } from '@angular/router';

@NgModule({
    declarations: [ HomeComponent ],
    imports: [
        CommonModule,
        RouterModule,
        HomeRoutingModule,
        MatTabsModule,
    ],
    exports: [],
    providers: [],
})
export class HomeModule {}
