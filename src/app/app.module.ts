import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import {
  MatButtonModule,
  MatCheckboxModule,
  MatIconModule,
  MatPaginatorModule,
  MatProgressSpinnerModule,
  MatTableModule,
  MatDialogModule
} from '@angular/material';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { ProjectListComponent } from './project-list/project-list.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ProjectEditComponent } from './project-list/project-edit/project-edit.component';


@NgModule({
  declarations: [ AppComponent, ProjectListComponent, ProjectEditComponent ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    MatCheckboxModule,
    MatTableModule,
    MatProgressSpinnerModule,
    MatPaginatorModule,
    MatIconModule,
    MatButtonModule,
    MatDialogModule
  ],
  providers: [],
  bootstrap: [AppComponent],
  entryComponents: [ProjectEditComponent]
})
export class AppModule { }
