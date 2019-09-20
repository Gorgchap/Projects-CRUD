import { Component, OnInit } from '@angular/core';
import { Project, ProjectService } from '../project.service';

@Component({
  selector: 'app-project-list',
  templateUrl: './project-list.component.html',
  styleUrls: ['./project-list.component.css']
})
export class ProjectListComponent implements OnInit {
  isFetching: boolean;
  projects: Array<Project>;

  constructor(private service: ProjectService) {
    this.isFetching = true;
  }

  ngOnInit(): void {
    this.service.getAll(0, 0).subscribe(
      projects => {
        this.isFetching = false;
        this.projects = projects;
      }
    );
  }
}
