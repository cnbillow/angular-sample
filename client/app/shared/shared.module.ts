import { NgModule } from '@angular/core';

import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatDialogModule } from '@angular/material/dialog';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatInputModule } from '@angular/material/input';
import { MatMenuModule } from '@angular/material/menu';
import { MatIconModule } from '@angular/material/icon';

@NgModule({
    declarations: [],
    imports: [
    MatCardModule,
    MatMenuModule,
    MatGridListModule,
    MatSlideToggleModule,
    MatInputModule,
    MatDialogModule,
    MatButtonModule,
    MatIconModule,
 ],
    exports: [
        MatCardModule,
        MatMenuModule,
        MatGridListModule,
        MatSlideToggleModule,
        MatInputModule,
        MatDialogModule,
        MatButtonModule,
        MatIconModule,
    ],
    providers: [],
})
export class SharedModule {}
