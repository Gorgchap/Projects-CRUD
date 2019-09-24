import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { Subscription } from 'rxjs';
import { Project } from '../../project.service';

@Component({
  selector: 'app-project-edit',
  templateUrl: './project-edit.component.html',
  styleUrls: ['./project-edit.component.css']
})
export class ProjectEditComponent implements OnInit {
  form: FormGroup;
  private subscription: Subscription = new Subscription();

  constructor(
    private builder: FormBuilder,
    private dialogRef: MatDialogRef<ProjectEditComponent>,
    @Inject(MAT_DIALOG_DATA) private data: Project | null) { }

  ngOnInit(): void {
    this.form = this.builder.group( {
      id: [this.data.id],
      date_begin: [this.data.date_begin || new Date(), [Validators.required]],
      date_end: [this.data.date_end || new Date(), [Validators.required]],
      cost: [this.data.cost || 10000, [Validators.required, Validators.min(10000)]],
      comment: [this.data.comment]
    });
  }

  submit() {
  }
}
