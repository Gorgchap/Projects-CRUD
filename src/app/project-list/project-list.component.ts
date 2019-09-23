import { SelectionModel } from '@angular/cdk/collections';
import { Component, OnInit } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { Project, ProjectService } from '../project.service';

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

  constructor(private service: ProjectService) { }

  ngOnInit(): void {
    this.refreshProjects();
  }

  checkboxLabel(row?: Project): string {
    if (!row) {
      return `${this.isAllSelected() ? 'select' : 'deselect'} all`;
    }
    return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row ${row.id + 1}`;
  }

  isAnySelected = () => this.displayedProjects.some(n => this.selection.selected.indexOf(n) > -1);

  isAllSelected = () => this.displayedProjects.every(n => this.selection.selected.indexOf(n) > -1);

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
      }
    );
  }
}
