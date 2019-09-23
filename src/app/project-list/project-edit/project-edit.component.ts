import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { Project } from '../../project.service';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-project-edit',
  templateUrl: './project-edit.component.html'
})
export class ProjectEditComponent {
  form: FormGroup;
  constructor(
    private builder: FormBuilder,
    private dialogRef: MatDialogRef<ProjectEditComponent>,
    @Inject(MAT_DIALOG_DATA) private data: Project | null) {
      this.form = this.builder.group( {

    });
  }
}
