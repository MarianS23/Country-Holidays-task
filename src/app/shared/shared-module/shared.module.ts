import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatButtonToggleModule } from '@angular/material/button-toggle';

const MATERIAL = [
  MatInputModule,
  MatTableModule,
  MatFormFieldModule,
  MatButtonModule,
  MatCardModule,
  MatDialogModule,
  MatIconModule,
  MatPaginatorModule,
  MatAutocompleteModule,
  MatButtonToggleModule
]

const FORM = [
  ReactiveFormsModule,
  FormsModule
]

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    ...MATERIAL,
    ...FORM
  ],
  exports: [
    ...MATERIAL,
    ...FORM
  ]
})
export class SharedModule { }
