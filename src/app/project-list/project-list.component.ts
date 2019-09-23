import { SelectionModel } from '@angular/cdk/collections';
import { Component, OnInit } from '@angular/core';
import { MatDialog, PageEvent } from '@angular/material';
import { Project, ProjectService } from '../project.service';
import { ProjectEditComponent } from './project-edit/project-edit.component';

@Component({
  selector: 'app-project-list',
  templateUrl: './project-list.component.html',
  styleUrls: ['./project-list.component.css']
})
export class ProjectListComponent implements OnInit {
  isFetching: boolean;
  selection = new SelectionModel<Project>(true, []);
  displayedColumns: string[] = ['select', 'date_begin', 'date_end', 'cost', 'comment'];
  displayedProjects: Array<Project>;
  page = 0;
  pagination: number[] = [10, 25, 50];
  size: number = this.pagination[0];
  total = 0;

  constructor(private service: ProjectService, private dialog: MatDialog) { }

  ngOnInit(): void {
    this.refreshProjects();
  }

  checkboxLabel(row?: Project): string {
    if (!row) {
      return `${this.isAllSelected() ? 'select' : 'deselect'} all`;
    }
    return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row ${row.id + 1}`;
  }

  delete() {
    this.selection.selected.forEach(project => this.service.delete(project));
    // this.page = Math.min(this.page, Math.ceil((this.total - this.selection.selected.length) / this.size) - 1);
    this.refreshProjects();
  }

  editRow(element: Project | null = null) {
    this.dialog
      .open(ProjectEditComponent, {
        width: '400px',
        data: { }
      });
  }

  isAnySelected = () => this.displayedProjects.some(n => this.selection.selected.indexOf(n) > -1);

  isAllSelected = () => this.displayedProjects.every(n => this.selection.selected.indexOf(n) > -1);

  isOneSelected = () => this.displayedProjects.filter(n => this.selection.selected.indexOf(n) > -1).length === 1;

  masterToggle() {
    this.isAllSelected() ? this.selection.deselect(...this.displayedProjects) : this.selection.select(...this.displayedProjects);
  }

  pageChange(state: PageEvent) {
    this.page = state.pageIndex;
    this.size = state.pageSize;
    this.refreshProjects();
  }

  refreshProjects() {
    this.isFetching = true;
    this.service.getProjects(this.page, this.size).subscribe(
      projectResponse => {
        this.isFetching = false;
        this.total = projectResponse.total;
        this.page = projectResponse.page;
        this.size = projectResponse.size;
        this.displayedProjects = projectResponse.data;
        if (this.page && !this.displayedProjects.length) {
          this.page--;
          this.refreshProjects();
        }
      }
    );
  }
}
