import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { Project } from '../../project.service';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'app-project-edit',
  templateUrl: './project-edit.component.html',
  styleUrls: ['./project-edit.component.css']
})
export class ProjectEditComponent implements OnInit {
  form: FormGroup;
  constructor(
    private builder: FormBuilder,
    private dialogRef: MatDialogRef<ProjectEditComponent>,
    @Inject(MAT_DIALOG_DATA) private data: Project | null) {
    console.log(data);
  }

  ngOnInit(): void {
    this.form = this.builder.group( {
      id: [this.data.id],
      date_begin: [this.data.date_begin, [Validators.required]],
      date_end: [this.data.date_end, [Validators.required]],
      cost: [this.data.cost, [Validators.required, Validators.min(10000)]],
      comment: [this.data.comment]
    });
  }

  submit() {
  }
}
