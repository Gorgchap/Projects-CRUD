import { Component, Inject, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import * as moment from 'moment';
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
      name: [this.data.name, [Validators.required, Validators.maxLength(50)]],
      date_begin: [this.data.date_begin || new Date(), [Validators.required, this.dateValidator]],
      date_end: [this.data.date_end || new Date(), [Validators.required, this.dateValidator]],
      cost: [this.data.cost || 1000, [Validators.required, Validators.min(1000)]],
      comment: [this.data.comment, [Validators.maxLength(512)]]
    });
    this.subscription.add(
      this.form.get('date_begin').valueChanges.subscribe(() => this.form.get('date_end').updateValueAndValidity({ emitEvent: false }))
    ).add(
      this.form.get('date_end').valueChanges.subscribe(() => this.form.get('date_begin').updateValueAndValidity({ emitEvent: false }))
    );
  }

  dateValidator(control: AbstractControl): {[key: string]: any} | null {
    if (control.parent && moment(control.parent.get('date_begin').value).isAfter(control.parent.get('date_end').value)) {
      return { dateError: true };
    }
    return null;
  }

  submit() {
    this.dialogRef.close(this.form.value);
  }
}
